function testUserRecord() {
    getStudentRecord(getUserEmail());
}
function testStudentvalues() {
    Logger.log(JSON.stringify(studentValuesAsObjArray));
}
let studentValuesAsObjArray = ValuesToArrayOfObjects(studentValues);

type studentObjValues = {
    email: string,
    phone: string,
    passport_country: string,
    address: string,
    passport_number: string,
    gender: string,
    middle_name: string,
    status: string,
    id: string,
    last_name: string,
    personal_email: string,
    birthday: Date,
    full_name: string,
    first_name: string,
    passport_expiry: Date
}

function getStudentRecord(userEmail: string) {
    let studentdetails = studentValuesAsObjArray.find((record: { email: string; }) => record.email === userEmail)
    Logger.log(studentdetails);
    return studentdetails;
}
function getUserEmail() {
    return Session.getActiveUser().getEmail();
}
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