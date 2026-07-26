/**
 * Young Scholars' Conclave 2026 — Registration & Abstract Submission backend.
 *
 * Deploy this as a Google Apps Script Web App bound to a Google Sheet.
 * See google-apps-script/DEPLOYMENT.md in this repo for step-by-step setup.
 *
 * Handles two form types, routed by the `formType` field in the JSON body:
 *   - "registration"  -> appends to the "Registrations" sheet
 *   - "abstract"      -> appends to the "Abstract Submissions" sheet
 *
 * Both sheets are created automatically (with headers) on first submission
 * if they don't already exist.
 */

var REGISTRATION_HEADERS = [
  "Timestamp",
  "Full Name",
  "Email",
  "Phone",
  "Institution/Affiliation",
  "Category",
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

function doPost(e) {
  var response;
  try {
    var data = JSON.parse(e.postData.contents);
    var formType = data.formType;

    if (formType === "registration") {
      response = handleRegistration(data);
    } else if (formType === "abstract") {
      response = handleAbstractSubmission(data);
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
  var required = ["fullName", "email", "institution", "category"];
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
    data.country || "",
    data.dietaryRequirements || "",
  ]);

  return { success: true, message: "Registration received." };
}

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

  sheet.appendRow([
    new Date(),
    data.paperTitle,
    data.authorNames,
    data.email,
    data.institution,
    data.theme,
    data.abstract,
  ]);

  return { success: true, message: "Abstract submitted." };
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
