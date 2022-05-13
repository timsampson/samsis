// https://docs.google.com/spreadsheets/d/1pNZJdnNie-JRvRXuvFJDP299Br5Rr1K1yTMSvXSKZok/edit#gid=0
let schoolSpreadsheet = SpreadsheetApp.openById("1pNZJdnNie-JRvRXuvFJDP299Br5Rr1K1yTMSvXSKZok");
let studentSheet = schoolSpreadsheet.getSheetByName("students");
let studentValues: any[][] | [any, ...any[]];
let studentValuesAsObjArray: any[];

let clubsSheet = schoolSpreadsheet.getSheetByName("clubs");
let clubsValues: any[][] | [any, ...any[]];
let clubsValuesAsObjArray: any[];

let staffSheet = schoolSpreadsheet.getSheetByName("staff");
let staffValues: any[][] | [any, ...any[]];
let staffValuesAsObjArray: any[];

let clubEnrollmentSheet = schoolSpreadsheet.getSheetByName("club_enrollment");

let hrStudentSheet = schoolSpreadsheet.getSheetByName("hr_st_join");
let hrStudentValues: any[][] | [any, ...any[]];
let hrStudentValuesAsObjArray: any[];

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
// get user photo from google drive
//AdminDirectory.Users.Photos.get(email_address)
function getUserPhoto() {
    let userEmail = getUserEmail();
    let photo = AdminDirectory.Users.Photos.get(userEmail).photoData;
    return Utilities.base64EncodeWebSafe(photo).replace(/_/g, '/').replace(/-/g, '+');
}
