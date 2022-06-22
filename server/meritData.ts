type Merit = {
    id: string,
    timestamp: Date,
    incidentDate: Date,
    studentID: string,
    homeroom: string,
    studentName: string,
    studentEmail: string,
    studentHouse: string,
    teacherEmail: string,
    teacherName: string,
    subject: string,
    hrTeacherID: string,
    hrTeacherEmail: string,
    hrTeacherName: string,
    categories: string,
    type: string,
    attendance_details: string,
    merit_details: string,
    homework_details: string,
    all_details: string,
    notice_sent: string,
    assigned_department: string,
    assigned_to: string,
    assignee_reviewed: string,
    assignee_reviewed_date: Date,
    assignee_message: string,
    assignment_status: string,
    resolved: string,
    resolved_by: string,
    resolved_date: Date,
    resolved_message: string,
}

let meritSheet = schoolSpreadsheet.getSheetByName("merits");
let meritValues: any[][] | [any, ...any[]];
let meritValuesAsObjArray: any[];

function getAllMeritInfo() {
    meritValues = meritSheet.getDataRange().getValues();
    let meritData = valuesToArrayOfObjects(meritValues);
    meritData.forEach((record, index) => {
        meritData[index] = JSON.stringify(record);
    });
    return meritData;
}
// To be used when a student looks up their own records
function getSingeUserMeritInfo() {
    meritValues = meritSheet.getDataRange().getValues();
    meritValuesAsObjArray = valuesToArrayOfObjects(meritValues);
    let studentInfo = studentValuesAsObjArray.find((student: Student) => student.email == getUserEmail());
    return studentInfo;
}
// To be used when an admin gets up a single user's records... might just do this filtered client side.
function getUserMeritInfoByEmail(email: string) {
    meritValues = meritSheet.getDataRange().getValues();
    meritValuesAsObjArray = valuesToArrayOfObjects(meritValues);
    let studentInfo = studentValuesAsObjArray.find((student: Student) => student.email == email);
    return studentInfo;
}