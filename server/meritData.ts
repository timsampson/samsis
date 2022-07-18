type Merit = {
    id: string,
    timestamp: Date,
    incident_date: Date,
    student_id: string,
    homeroom: string,
    student_name: string,
    student_email: string,
    student_house: string,
    teacherEmail: string,
    teacher_name: string,
    subject: string,
    hr_teacher_id: string,
    hr_teacher_email: string,
    hr_teacher_name: string,
    category: string,
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

let meritCategoriesSheet = schoolSpreadsheet.getSheetByName("merit_categories");
let meritCategoriesValues: any[][] | [any, ...any[]];
let meritCategoriesValuesAsObjArray: any[];
function getAllMeritCategories() {
    meritCategoriesValues = meritCategoriesSheet.getDataRange().getValues();
    let meritCategoriesData = valuesToArrayOfObjects(meritCategoriesValues);
    return meritCategoriesData;
}


let subjectsSheet = schoolSpreadsheet.getSheetByName("subjects");
let subjectsValues: any[][] | [any, ...any[]];
let subjectsValuesAsObjArray: any[];

function getAllSubjects() {
    subjectsValues = subjectsSheet.getDataRange().getValues();
    subjectsValuesAsObjArray = valuesToArrayOfObjects(subjectsValues);
    return subjectsValuesAsObjArray;
}

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
    let studentMeritInfo = meritValuesAsObjArray.filter((merit: Merit) => merit.student_email == getUserEmail());
    studentMeritInfo.forEach((record, index) => {
        studentMeritInfo[index] = JSON.stringify(record);
    });
    return studentMeritInfo;
}
// To be used when an admin gets up a single user's records... might just do this filtered client side.
function getUserMeritInfoByEmail(email: string) {
    meritValues = meritSheet.getDataRange().getValues();
    meritValuesAsObjArray = valuesToArrayOfObjects(meritValues);
    let studentInfo = studentValuesAsObjArray.find((student: Student) => student.email == email);
    return studentInfo;
}
function meritSubmissionTest() {
    let testObj = {
        "behaviorCategory": "Orange Level",
        "meritBehaviors": [
            "fighting",
            "screaming"
        ],
        "meritDetails": "j kj jnkj",
        "selectedStudents": [
            {
                "id": "3",
                "student_id": "768",
                "hr_id": "GKS1",
                "student_email": "adamov@niceschool.edu",
                "student_name": "Zondra  Adamov",
                "hr_teacher": "Ms. Marie Tobin",
                "homeroom": "Taichung",
                "grade": "K",
                "school": "ls"
            },
            {
                "id": "1",
                "student_id": "387",
                "hr_id": "GPKS1",
                "student_email": "tcoughlan@niceschool.edu",
                "student_name": "Rafaellle Thaddeus Coughlan",
                "hr_teacher": "Ms. Victoria Bishop",
                "homeroom": "Kaohsiung",
                "grade": "PK",
                "school": "ls"
            },
            {
                "id": "2",
                "student_id": "338",
                "hr_id": "GPKS2",
                "student_email": "vguitt@niceschool.edu",
                "student_name": "Maryellen Valentine Guitt",
                "hr_teacher": "Mr. Danny Baker",
                "homeroom": "Wulai",
                "grade": "PK",
                "school": "ls"
            },
            {
                "id": "4",
                "student_id": "872",
                "hr_id": "GKS2",
                "student_email": "rcadwallader@niceschool.edu",
                "student_name": "Clyve Russell Cadwallader",
                "hr_teacher": "Ms. Agnes Tobin",
                "homeroom": "Tainan",
                "grade": "K",
                "school": "ls"
            }
        ],
        "incident_date": "2022-07-19"
    }

    let testObjAsString = JSON.stringify(testObj);
    meritSubmission(testObjAsString);
}

function meritSubmission(meritRecord): boolean {
    let id: string;
    let category = meritRecord.behaviorCategory;
    let timestamp = new Date();
    let incident_date = new Date(meritRecord.selectedDate);
    let details = meritRecord.meritDetails;
    let type = meritRecord.meritBehaviors.join(',');
    let teacherEmail = getUserEmail();
    let staffInfo: Staff = getStaffInfo(teacherEmail);
    let teacher_name = staffInfo.full_name;
    let teacherId = staffInfo.id;
    meritRecord.selectedStudents.forEach((student) => {
        let studentHrInfo = getStudentHRInfo(student.student_email);
        let student_house = getStudentHouse(student.student_email);
        id = getlogId(meritSheet);
        let record = [
            id,
            timestamp,
            incident_date,
            student.student_id,
            student.homeroom,
            student.student_name,
            student.student_email,
            student_house,
            teacherId,
            teacherEmail,
            teacher_name,
            "testing",
            studentHrInfo.hr_id,
            studentHrInfo.hr_teacher_id,
            studentHrInfo.hr_teacher_email,
            studentHrInfo.hr_teacher_name,
            category,
            type,
            "", // attendance_details
            "", //merit_details
            "", //homework_details
            details,
        ];
        meritSheet.appendRow(record);
    });
    return true;
}
function meritEditSubmission(submission) {
    return "recieved";
}