/**
 * Google Apps Script: Split Final round submissions to Final judges
 *
 * What it does:
 *   1. Reads all submissions from the "Form Response for Finals" tab
 *   2. Reads Final judge names from column B of the "Judge" tab (row 1 is the "Final" header, skip it)
 *   3. Assigns exactly 2 judges to every submission using round-robin
 *   4. For each judge: creates a Drive folder named after them (inside a shared parent folder),
 *      then creates a Google Sheet inside that folder with a "Submissions" tab containing:
 *        - All original form headers
 *        - Two extra columns: "Feedback" and "Marks out of 100%"
 *        - Only the submissions assigned to that judge
 *
 * How to use:
 *   1. Open your Google Sheet → Extensions → Apps Script
 *   2. Paste this file, save, then run createFinalJudgeFolders()
 *   3. Grant Drive + Sheets permissions when prompted
 *   4. A dialog will confirm completion and show the parent folder link
 */

function createFinalJudgeFolders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();

  // ── 1. Read "Form Response for Finals" ────────────────────────────────────
  var responseSheet = ss.getSheetByName("Form Response for Finals");
  if (!responseSheet) {
    ui.alert('Error: Sheet "Form Response for Finals" not found. Check the tab name and try again.');
    return;
  }

  var allData = responseSheet.getDataRange().getValues();
  if (allData.length < 2) {
    ui.alert('Error: "Form Response for Finals" has no submission rows.');
    return;
  }

  var formHeaders = allData[0];
  var submissions = allData.slice(1).filter(function(r) {
    return r.some(function(cell) { return cell !== ""; });
  });

  // ── 2. Read Final judges from "Judge" tab column B ────────────────────────
  var judgeSheet = ss.getSheetByName("Judge");
  if (!judgeSheet) {
    ui.alert('Error: Sheet "Judge" not found. Check the tab name and try again.');
    return;
  }

  var judgeData  = judgeSheet.getDataRange().getValues();
  var finalJudges = [];
  // Row 0 = ["Prelim", "Final"] — skip it; collect non-empty names from col B (index 1)
  for (var i = 1; i < judgeData.length; i++) {
    var name = judgeData[i][1] ? judgeData[i][1].toString().trim() : "";
    if (name) finalJudges.push(name);
  }

  if (finalJudges.length === 0) {
    ui.alert('Error: No Final judges found in column B of the "Judge" tab.');
    return;
  }

  // ── 3. Assign 2 judges per submission (round-robin pairs) ─────────────────
  //
  //  For submission index s:
  //    judge 1 = finalJudges[s % n]
  //    judge 2 = finalJudges[(s + 1) % n]

  var numJudges        = finalJudges.length;
  var judgeSubmissions = {};
  finalJudges.forEach(function(name) { judgeSubmissions[name] = []; });

  for (var s = 0; s < submissions.length; s++) {
    var j1 = finalJudges[s % numJudges];
    var j2 = finalJudges[(s + 1) % numJudges];
    judgeSubmissions[j1].push(submissions[s]);
    if (j2 !== j1) judgeSubmissions[j2].push(submissions[s]);
  }

  // ── 4. Locate parent folder (same Drive folder as the source spreadsheet) ──
  var ssFile     = DriveApp.getFileById(ss.getId());
  var parents    = ssFile.getParents();
  var parentDir  = parents.hasNext() ? parents.next() : DriveApp.getRootFolder();
  var rootFolder = parentDir.createFolder("MyHack 2025 – Final Judge Folders");

  // ── 5. Build the new header row (original + 2 extra columns) ──────────────
  var extraHeaders = ["Feedback", "Marks out of 100%"];
  var newHeaders   = formHeaders.concat(extraHeaders);
  var numCols      = newHeaders.length;
  var numOrigCols  = formHeaders.length;

  // ── 6. Create one folder + spreadsheet per Final judge ────────────────────
  var summary = [];

  for (var k = 0; k < finalJudges.length; k++) {
    var judgeName = finalJudges[k];
    var judgeRows = judgeSubmissions[judgeName];

    // Drive folder
    var judgeFolder = rootFolder.createFolder(judgeName);

    // New Google Spreadsheet
    var judgeSpreadsheet = SpreadsheetApp.create(judgeName + " – Final Submissions");
    DriveApp.getFileById(judgeSpreadsheet.getId()).moveTo(judgeFolder);

    // Rename default sheet → "Submissions"
    var sheet = judgeSpreadsheet.getSheets()[0];
    sheet.setName("Submissions");

    // Write headers
    sheet.getRange(1, 1, 1, numCols).setValues([newHeaders]);

    // Write submission rows (pad to original header width, then append 2 blank extra cols)
    if (judgeRows.length > 0) {
      var paddedRows = judgeRows.map(function(row) {
        var padded = row.slice(0, numOrigCols);
        while (padded.length < numOrigCols) padded.push("");
        return padded.concat(["", ""]);
      });
      sheet.getRange(2, 1, paddedRows.length, numCols).setValues(paddedRows);
    }

    // ── Formatting ────────────────────────────────────────────────────────
    sheet.setFrozenRows(1);

    // Header row: green background (Finals = green to distinguish from Prelim blue)
    sheet.getRange(1, 1, 1, numCols)
      .setBackground("#188038")
      .setFontColor("#ffffff")
      .setFontWeight("bold");

    // Highlight the two extra judge columns in amber
    sheet.getRange(1, numOrigCols + 1, 1, 2)
      .setBackground("#fbbc04")
      .setFontColor("#000000")
      .setFontWeight("bold");

    // Data validation: Marks must be 0-100
    if (judgeRows.length > 0) {
      var marksCol   = numOrigCols + 2;
      var marksRange = sheet.getRange(2, marksCol, judgeRows.length, 1);
      var rule = SpreadsheetApp.newDataValidation()
        .requireNumberBetween(0, 100)
        .setAllowInvalid(false)
        .setHelpText("Enter a score between 0 and 100.")
        .build();
      marksRange.setDataValidation(rule);
    }

    sheet.autoResizeColumns(1, numCols);
    sheet.getRange("A1").setNote("Final Judge: " + judgeName + " | " + judgeRows.length + " submissions assigned");

    summary.push("  • " + judgeName + ": " + judgeRows.length + " submissions");
  }

  // ── 7. Done ────────────────────────────────────────────────────────────────
  Logger.log("Final judge folders created:\n" + summary.join("\n"));
  Logger.log("Parent folder: " + rootFolder.getUrl());

  ui.alert(
    "Done! ✓\n\n" +
    "Final submissions split across " + finalJudges.length + " judges:\n" +
    summary.join("\n") + "\n\n" +
    "Parent folder in Drive:\n" + rootFolder.getUrl()
  );
}
