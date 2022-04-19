function testUserRecord() {
    getStudentRecord(getUserEmail());
}
function testStudentvalues() {
    Logger.log(JSON.stringify(studentValuesAsObjArray));
}
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