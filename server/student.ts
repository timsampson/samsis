type Student = {
    id: string,
    email: string,
    phone: string,
    passport_country: string,
    address: string,
    passport_number: string,
    gender: string,
    middle_name: string,
    status: string,
    last_name: string,
    personal_email: string,
    birthday: Date,
    full_name: string,
    first_name: string,
    house_name: string,
    passport_expiry: Date
    level: string,
    grade: string;
    homeroom: string;
    school: string;
}
type HRinfo = {
    // id	student_id	hr_id	student_email	student_name	hr_teacher_name	homeroom	grade	school
    id: string,
    student_id: string,
    hr_id: string,
    student_email: string,
    student_name: string,
    hr_teacher_name: string,
    homeroom: string,
    grade: string,
    school: string
}

function getUserEmail() {
    return Session.getActiveUser().getEmail();
}
function getStudentInfo(email: string) {
    if (email === undefined) { email = getUserEmail(); }
    studentValues = studentSheet.getDataRange().getValues();
    studentValuesAsObjArray = valuesToArrayOfObjects(studentValues);
    let studentInfo = studentValuesAsObjArray.find((student: Student) => student.email == getUserEmail());
    return studentInfo;
}

function getStudentHRInfo(email: string) {
    if (email === undefined) { email = getUserEmail(); }
    hrStudentValues = hrStudentSheet.getDataRange().getValues();
    hrStudentValuesAsObjArray = valuesToArrayOfObjects(hrStudentValues);
    const studentHrInfo = hrStudentValuesAsObjArray.find((record: HRinfo) => record.student_email == email);
    if (studentHrInfo.hr_id === undefined) {
        studentHrInfo.hr_id = "Not Assigned";
    }
    return studentHrInfo;
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
    let student: Student = getStudentHRInfo(getUserEmail());
    return student.level;
}
function getStudentHouse(email: string) {
    if (email === undefined) { email = getUserEmail(); }
    let student: Student = getStudentHouseInfo(email);
    return student.house_name;
}
let houseSheet = schoolSpreadsheet.getSheetByName("houses");
let houseValues: any[][] | [any, ...any[]];
let houseValuesAsObjArray: any[];

function getStudentHouseInfo(email: string) {
    if (email === undefined) { email = getUserEmail(); }
    houseValues = houseSheet.getDataRange().getValues();
    houseValuesAsObjArray = valuesToArrayOfObjects(houseValues);
    let studentHouseInfo = houseValuesAsObjArray.find((record) => record.student_email == email);
    return studentHouseInfo;
}
function testUserRecord() {
    getStudentInfo(getUserEmail());
}
function testStudentvalues() {
    Logger.log(JSON.stringify(studentValuesAsObjArray));
}
