// https://docs.google.com/spreadsheets/d/1pNZJdnNie-JRvRXuvFJDP299Br5Rr1K1yTMSvXSKZok/edit#gid=0
let schoolSpreadsheet = SpreadsheetApp.openById("1pNZJdnNie-JRvRXuvFJDP299Br5Rr1K1yTMSvXSKZok");
let studentSheet = schoolSpreadsheet.getSheetByName("students");
let studentValues = studentSheet.getDataRange().getValues();
let studentValuesAsObjArray = ValuesToArrayOfObjects(studentValues);

let clubsSheet = schoolSpreadsheet.getSheetByName("clubs");
let clubsValues = clubsSheet.getDataRange().getValues();
let clubsValuesAsObjArray = ValuesToArrayOfObjects(clubsValues);

let clubEnrollmentSheet = schoolSpreadsheet.getSheetByName("club_enrollment");

function ValuesToArrayOfObjects(sheetValues: any[][] | [any, ...any[]]) {
    // Use the spread operator to split the 2d array into headers and values
    const [headers, ...records] = sheetValues;

    //Loop through the values list
    const arrayOfObjects = records.map(records => {
        let objRecord = {};
        //Since each element in values list is a list again
        //loop through the list and add them to the `obj` object
        records.forEach((record: any, colIndex: string | number) => {
            objRecord[headers[colIndex]] = record
        });
        //return the object
        return objRecord;
    });
    return arrayOfObjects;
}
function applicationId(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    let lastRecordRow = sheet.getLastRow() + 1;
    let formApplicationDate = new Date();
    let year = formApplicationDate.getFullYear();
    let day = formApplicationDate.getDate();
    let recordId = "id" + year + day + lastRecordRow + Math.floor(Math.random() * 10);
    return recordId;
}

