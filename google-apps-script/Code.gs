/**
 * Young Scholars' Conclave 2026 — Registration, Abstract & Full Paper
 * Submission backend.
 *
 * Deploy this as a Google Apps Script Web App bound to a Google Sheet.
 * See google-apps-script/DEPLOYMENT.md in this repo for step-by-step setup.
 *
 * Handles three form types, routed by the `formType` field in the JSON body:
 *   - "registration"  -> appends to the "Registrations" sheet
 *   - "abstract"      -> appends to the "Abstract Submissions" sheet
 *   - "paper"         -> uploads the manuscript to Drive and appends to the
 *                        "Paper Submissions" sheet
 *
 * All sheets are created automatically (with headers) on first submission
 * if they don't already exist. The paper flow also creates a Drive folder
 * ("YSC 2026 — Paper Submissions") on first use.
 */

var REGISTRATION_HEADERS = [
  "Timestamp",
  "Full Name",
  "Email",
  "Phone",
  "Institution/Affiliation",
  "Category",
  "Gender",
  "Country",
  "Dietary Requirements",
];

var ABSTRACT_HEADERS = [
  "Timestamp",
  "Paper Title",
  "Author Name(s)",
  "Corresponding Email",
  "Institution/Affiliation",
  "Theme",
  "Abstract",
];

var PAPER_HEADERS = [
  "Timestamp",
  "Paper Title",
  "Corresponding Author",
  "Co-Author(s)",
  "Institution/Affiliation",
  "Department",
  "Email",
  "Phone",
  "Research Domain",
  "Keywords",
  "Paper File Link",
  "Additional Remarks",
  "Declaration Accepted",
];

var PAPER_DRIVE_FOLDER_NAME = "YSC 2026 — Paper Submissions";
var PAPER_MAX_FILE_BYTES = 3 * 1024 * 1024; // 3MB, matches the website's client/server checks

function doPost(e) {
  var response;
  try {
    var data = JSON.parse(e.postData.contents);
    var formType = data.formType;

    if (formType === "registration") {
      response = handleRegistration(data);
    } else if (formType === "abstract") {
      response = handleAbstractSubmission(data);
    } else if (formType === "paper") {
      response = handlePaperSubmission(data);
    } else {
      response = { success: false, message: "Unknown form type: " + formType };
    }
  } catch (err) {
    response = { success: false, message: "Server error: " + err.message };
  }

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function handleRegistration(data) {
  var required = ["fullName", "email", "institution", "category", "gender"];
  var missing = findMissingFields(data, required);
  if (missing.length > 0) {
    return { success: false, message: "Missing required field(s): " + missing.join(", ") };
  }
  if (!isValidEmail(data.email)) {
    return { success: false, message: "Invalid email address." };
  }

  var sheet = getOrCreateSheet("Registrations", REGISTRATION_HEADERS);

  if (isDuplicateSubmission(sheet, 2 /* Email column index, 0-based */, data.email)) {
    return {
      success: false,
      message: "This email address has already been registered.",
    };
  }

  sheet.appendRow([
    new Date(),
    data.fullName,
    data.email,
    data.phone || "",
    data.institution,
    data.category,
    data.gender,
    data.country || "",
    data.dietaryRequirements || "",
  ]);

  return { success: true, message: "Registration received." };
}

var ABSTRACT_PREVIEW_LENGTH = 150;

function handleAbstractSubmission(data) {
  var required = ["paperTitle", "authorNames", "email", "institution", "theme", "abstract"];
  var missing = findMissingFields(data, required);
  if (missing.length > 0) {
    return { success: false, message: "Missing required field(s): " + missing.join(", ") };
  }
  if (!isValidEmail(data.email)) {
    return { success: false, message: "Invalid email address." };
  }

  var sheet = getOrCreateSheet("Abstract Submissions", ABSTRACT_HEADERS);

  var fullAbstract = data.abstract;
  var preview =
    fullAbstract.length > ABSTRACT_PREVIEW_LENGTH
      ? fullAbstract.slice(0, ABSTRACT_PREVIEW_LENGTH) + "…"
      : fullAbstract;

  sheet.appendRow([
    new Date(),
    data.paperTitle,
    data.authorNames,
    data.email,
    data.institution,
    data.theme,
    preview,
  ]);

  // Keeps the row height normal regardless of abstract length - the full
  // text is still there in full, just as a hover note on the cell instead
  // of the visible value, since abstracts run 50+ words and would
  // otherwise blow out the row.
  var abstractColumn = ABSTRACT_HEADERS.indexOf("Abstract") + 1;
  sheet.getRange(sheet.getLastRow(), abstractColumn).setNote(fullAbstract);

  return { success: true, message: "Abstract submitted." };
}

function handlePaperSubmission(data) {
  var required = [
    "paperTitle",
    "correspondingAuthor",
    "institution",
    "department",
    "email",
    "phone",
    "researchDomain",
    "keywords",
    "declaration",
    "fileName",
    "fileMimeType",
    "fileBase64",
  ];
  var missing = findMissingFields(data, required);
  if (missing.length > 0) {
    return { success: false, message: "Missing required field(s): " + missing.join(", ") };
  }
  if (!isValidEmail(data.email)) {
    return { success: false, message: "Invalid email address." };
  }
  if (String(data.declaration).toLowerCase() !== "true") {
    return { success: false, message: "The declaration/consent must be accepted." };
  }

  var fileUrl;
  try {
    fileUrl = savePaperFile(data.fileName, data.fileMimeType, data.fileBase64);
  } catch (err) {
    return { success: false, message: "Couldn't save the uploaded file: " + err.message };
  }

  var sheet = getOrCreateSheet("Paper Submissions", PAPER_HEADERS);

  sheet.appendRow([
    new Date(),
    data.paperTitle,
    data.correspondingAuthor,
    data.coAuthors || "",
    data.institution,
    data.department,
    data.email,
    data.phone,
    data.researchDomain,
    data.keywords,
    fileUrl,
    data.additionalRemarks || "",
    "Yes",
  ]);

  return { success: true, message: "Full paper submitted." };
}

/**
 * Decodes the base64 manuscript, saves it into the shared Drive folder
 * (created on first use), and returns a shareable link. Throws if the
 * decoded file exceeds PAPER_MAX_FILE_BYTES - the website already checks
 * this client- and server-side, but Apps Script re-checks since it's the
 * last line of defense before writing to Drive.
 */
function savePaperFile(fileName, mimeType, fileBase64) {
  var decoded = Utilities.base64Decode(fileBase64);
  if (decoded.length > PAPER_MAX_FILE_BYTES) {
    throw new Error("File exceeds the 3MB limit.");
  }

  var blob = Utilities.newBlob(decoded, mimeType, fileName);
  var folder = getOrCreateFolder(PAPER_DRIVE_FOLDER_NAME);
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function getOrCreateFolder(name) {
  var folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(name);
}

function getOrCreateSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sheet;
}

function findMissingFields(data, required) {
  var missing = [];
  for (var i = 0; i < required.length; i++) {
    var key = required[i];
    if (!data[key] || String(data[key]).trim() === "") {
      missing.push(key);
    }
  }
  return missing;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Prevents the same email from registering twice. `emailColumnIndex` is
 * 0-based against the header row (Email is column C -> index 2).
 */
function isDuplicateSubmission(sheet, emailColumnIndex, email) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  var values = sheet.getRange(2, emailColumnIndex + 1, lastRow - 1, 1).getValues();
  var normalized = String(email).trim().toLowerCase();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]).trim().toLowerCase() === normalized) {
      return true;
    }
  }
  return false;
}
