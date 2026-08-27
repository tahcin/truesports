/**
 * True Sport enquiry webhook.
 *
 * Bound to the enquiries spreadsheet. Receives a JSON POST from the
 * website's /api/enquiry route and appends one row per enquiry.
 * Deploy steps are in README.md next to this file.
 */

var SHEET_NAME = 'Enquiries';

function doPost(e) {
  var data = JSON.parse(e.postData.contents);

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'Program', 'Message']);
    sheet.setFrozenRows(1);
  }

  // Phone numbers arrive as "+91 …"; a leading "+" entering a non-text cell
  // is parsed as a formula and shows #ERROR. Text-format the column on every
  // write (cheap, idempotent) so the value is stored literally, including on
  // sheets whose tab existed before this script did.
  sheet.getRange('C:C').setNumberFormat('@');
  // Keep the timestamp showing date AND time (setValues-written dates can
  // otherwise display date-only).
  sheet.getRange('A:A').setNumberFormat('dd/mm/yyyy hh:mm:ss');

  // setValues (unlike appendRow) stores strings literally instead of
  // parsing them like user input.
  sheet
    .getRange(sheet.getLastRow() + 1, 1, 1, 6)
    .setValues([
      [
        new Date(),
        data.name || '',
        data.phone || '',
        data.email || '',
        data.program || '',
        data.message || '',
      ],
    ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON
  );
}
