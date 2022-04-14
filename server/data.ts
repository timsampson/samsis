// https://docs.google.com/spreadsheets/d/1TfVQt6D5iyNqW2jDGl7DZCNl_bIODs1qI0yIxDqfbes/edit#gid=0
const schoolSpreadsheet = SpreadsheetApp.openById("1TfVQt6D5iyNqW2jDGl7DZCNl_bIODs1qI0yIxDqfbes");
let studentSheet = schoolSpreadsheet.getSheetByName("students");
let studentValues = studentSheet.getDataRange().getValues();