function testUserRecord() {
    getStudentInfo();
}
function testStudentvalues() {
    Logger.log(JSON.stringify(studentValuesAsObjArray));
}
type Student = {
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
    level: string,
    grade: string;
    homeroom: string;
    school: string;
}

function getUserEmail() {
    return Session.getActiveUser().getEmail();
}
function getStudentInfo() {
    studentValues = studentSheet.getDataRange().getValues();
    studentValuesAsObjArray = valuesToArrayOfObjects(studentValues);
    let studentInfo = studentValuesAsObjArray.find((student: Student) => student.email == getUserEmail());
    return studentInfo;
}

function getStudentHRInfo() {
    hrStudentValues = hrStudentSheet.getDataRange().getValues();
    hrStudentValuesAsObjArray = valuesToArrayOfObjects(hrStudentValues);
    const studentHRInfo = hrStudentValuesAsObjArray.find((student) => student.email == getUserEmail());
    return studentHRInfo;
}

function getStudentLevel() {
    let student: Student = getStudentHRInfo();
    return student.level;
}
