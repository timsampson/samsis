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
type HRinfo = {
    // id	student_id	hr_id	student_email	student_name	hr_teacher	homeroom	grade	school
    id: string,
    student_id: string,
    hr_id: string,
    student_email: string,
    student_name: string,
    hr_teacher: string,
    homeroom: string,
    grade: string,
    school: string
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
    const studentHRInfo = hrStudentValuesAsObjArray.find((record: HRinfo) => record.student_email == getUserEmail());
    return studentHRInfo;
}
function getAllStudentsHRInfo() {
    hrStudentValues = hrStudentSheet.getDataRange().getValues();
    let hrData = valuesToArrayOfObjects(hrStudentValues);
    hrData.forEach((record, index) => {
        hrData[index] = JSON.stringify(record);
    });
    return hrData;
}

function getStudentLevel() {
    let student: Student = getStudentHRInfo();
    return student.level;
}
function testUserRecord() {
    getStudentInfo();
}
function testStudentvalues() {
    Logger.log(JSON.stringify(studentValuesAsObjArray));
}
