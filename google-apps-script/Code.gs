/**
 * Young Scholars' Conclave 2026 — Registration, Abstract & Full Paper
 * Submission backend.
 *
 * Deploy this as a Google Apps Script Web App bound to a Google Sheet.
 * See google-apps-script/DEPLOYMENT.md in this repo for step-by-step setup.
 *
 * Handles three form types, routed by the `formType` field in the JSON body:
 *   - "registration"  -> appends to the "Registrations" sheet
 *   - "abstract"      -> uploads the author's CV to Drive and appends to
 *                        the "Abstract Submissions" sheet
 *   - "paper"         -> uploads the manuscript to Drive and appends to the
 *                        "Paper Submissions" sheet
 *
 * All sheets are created automatically (with headers) on first submission
 * if they don't already exist. The abstract flow also creates a Drive
 * folder tree ("YSC 2026 — Abstract Submissions/CV Files") and the paper
 * flow a Drive folder ("YSC 2026 — Paper Submissions") on first use.
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
  "CV File Name",
  "CV File ID",
  "CV Google Drive URL",
  "CV Upload Timestamp",
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

// Abstract flow — CV uploads are PDF-only, capped at 5MB, and stored in a
// dedicated Drive folder tree. Matches the website's client/server checks.
var CV_DRIVE_FOLDER_NAME = "YSC 2026 — Abstract Submissions";
var CV_DRIVE_SUBFOLDER_NAME = "CV Files";
var CV_MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB
var PDF_MIME_TYPE = "application/pdf";

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
  var required = [
    "paperTitle",
    "authorNames",
    "email",
    "institution",
    "theme",
    "abstract",
    "cvFileName",
    "cvFileMimeType",
    "cvFileBase64",
  ];
  var missing = findMissingFields(data, required);
  if (missing.length > 0) {
    return { success: false, message: "Missing required field(s): " + missing.join(", ") };
  }
  if (!isValidEmail(data.email)) {
    return { success: false, message: "Invalid email address." };
  }

  var sheet = getOrCreateSheet("Abstract Submissions", ABSTRACT_HEADERS);

  // Same paper from the same email twice is almost certainly a double
  // submission (and would otherwise leave a duplicate CV in Drive).
  if (isDuplicateAbstract(sheet, data.email, data.paperTitle)) {
    return {
      success: false,
      message:
        "An abstract with this title has already been submitted from this email address.",
    };
  }

  var cvInfo;
  try {
    cvInfo = saveCvFile(data.cvFileName, data.cvFileMimeType, data.cvFileBase64);
  } catch (err) {
    return { success: false, message: "Couldn't save the CV: " + err.message };
  }

  // Add the CV columns to a pre-existing "Abstract Submissions" sheet if it
  // predates the CV upload feature. Existing columns are left untouched.
  ensureColumns(sheet, ABSTRACT_HEADERS);

  var fullAbstract = data.abstract;
  var preview =
    fullAbstract.length > ABSTRACT_PREVIEW_LENGTH
      ? fullAbstract.slice(0, ABSTRACT_PREVIEW_LENGTH) + "…"
      : fullAbstract;

  try {
    sheet.appendRow([
      new Date(),
      data.paperTitle,
      data.authorNames,
      data.email,
      data.institution,
      data.theme,
      preview,
      cvInfo.name,
      cvInfo.id,
      cvInfo.url,
      new Date(),
    ]);
  } catch (err) {
    // Avoid leaving an orphaned CV file in Drive when the sheet write fails.
    try {
      DriveApp.getFileById(cvInfo.id).setTrashed(true);
    } catch (cleanupErr) {
      // Best-effort cleanup only — the error below is the one the user sees.
    }
    return { success: false, message: "Couldn't record the submission: " + err.message };
  }

  // Keeps the row height normal regardless of abstract length - the full
  // text is still there in full, just as a hover note on the cell instead
  // of the visible value, since abstracts run 50+ words and would
  // otherwise blow out the row.
  var abstractColumn = ABSTRACT_HEADERS.indexOf("Abstract") + 1;
  sheet.getRange(sheet.getLastRow(), abstractColumn).setNote(fullAbstract);

  return { success: true, message: "Abstract and CV submitted." };
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

/**
 * Decodes and validates the uploaded CV (PDF-only, <= 5MB, `%PDF-` magic
 * bytes), stores it in the "YSC 2026 — Abstract Submissions/CV Files" Drive
 * folder (created on first use), and returns its shareable URL, Drive file
 * ID, and sanitized name. Throws with a user-facing message on any failure.
 */
function saveCvFile(fileName, mimeType, fileBase64) {
  var safeName = sanitizeFileName(fileName);

  if (String(fileName).toLowerCase().slice(-4) !== ".pdf") {
    throw new Error("Only PDF files are accepted.");
  }
  if (mimeType !== PDF_MIME_TYPE) {
    throw new Error("Only PDF files are accepted.");
  }

  var decoded = Utilities.base64Decode(fileBase64);
  if (!decoded || decoded.length === 0) {
    throw new Error("The uploaded file appears to be empty.");
  }
  if (decoded.length > CV_MAX_FILE_BYTES) {
    throw new Error("The CV must be 5MB or smaller.");
  }
  // `%PDF-` header (0x25 0x50 0x44 0x46 0x2D) — rejects renamed executables,
  // HTML/XSS files, and truncated or corrupt uploads.
  if (
    decoded[0] !== 0x25 ||
    decoded[1] !== 0x50 ||
    decoded[2] !== 0x44 ||
    decoded[3] !== 0x46 ||
    decoded[4] !== 0x2d
  ) {
    throw new Error("The uploaded file does not appear to be a valid PDF.");
  }

  var blob = Utilities.newBlob(decoded, PDF_MIME_TYPE, safeName);
  var folder = getOrCreateCvFolder();
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return {
    url: file.getUrl(),
    id: file.getId(),
    name: file.getName(),
  };
}

function getOrCreateCvFolder() {
  var root = getOrCreateFolder(CV_DRIVE_FOLDER_NAME);
  var subfolders = root.getFoldersByName(CV_DRIVE_SUBFOLDER_NAME);
  if (subfolders.hasNext()) {
    return subfolders.next();
  }
  return root.createFolder(CV_DRIVE_SUBFOLDER_NAME);
}

/** Strips path separators and characters Drive disallows in file names. */
function sanitizeFileName(name) {
  return String(name || "curriculum-vitae")
    .replace(/[\\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

/**
 * Adds any headers missing from an existing sheet, at the end of the header
 * row, in the order given. Existing columns are left untouched so sheets
 * created before a schema change stay backward compatible.
 */
function ensureColumns(sheet, headers) {
  var lastColumn = Math.max(sheet.getLastColumn(), 1);
  var headerRow = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  var seen = {};
  for (var i = 0; i < headerRow.length; i++) {
    seen[String(headerRow[i] || "")] = true;
  }
  var toAdd = [];
  for (var h = 0; h < headers.length; h++) {
    if (!seen[String(headers[h])]) {
      toAdd.push(headers[h]);
    }
  }
  if (toAdd.length > 0) {
    var range = sheet.getRange(1, lastColumn + 1, 1, toAdd.length);
    range.setValues([toAdd]);
    range.setFontWeight("bold");
  }
}

/** True when a row already exists with the same email and paper title. */
function isDuplicateAbstract(sheet, email, paperTitle) {
  var headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var emailColumn = headerRow.indexOf("Corresponding Email") + 1;
  var titleColumn = headerRow.indexOf("Paper Title") + 1;
  if (emailColumn < 1 || titleColumn < 1) return false;

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  var emails = sheet.getRange(2, emailColumn, lastRow - 1, 1).getValues();
  var titles = sheet.getRange(2, titleColumn, lastRow - 1, 1).getValues();
  var normalizedEmail = String(email).trim().toLowerCase();
  var normalizedTitle = String(paperTitle).trim().toLowerCase();

  for (var i = 0; i < emails.length; i++) {
    if (
      String(emails[i][0]).trim().toLowerCase() === normalizedEmail &&
      String(titles[i][0]).trim().toLowerCase() === normalizedTitle
    ) {
      return true;
    }
  }
  return false;
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
