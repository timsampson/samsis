// https://docs.google.com/spreadsheets/d/1pNZJdnNie-JRvRXuvFJDP299Br5Rr1K1yTMSvXSKZok/edit#gid=0
const schoolSpreadsheet = SpreadsheetApp.openById("1pNZJdnNie-JRvRXuvFJDP299Br5Rr1K1yTMSvXSKZok");
let studentSheet = schoolSpreadsheet.getSheetByName("students");
let studentValues = studentSheet.getDataRange().getValues();