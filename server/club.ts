type Club = {
    id: number,
    form_submission_date: any;
    level: string,
    club_id: number,
    active: boolean,
    year: string,
    club_name: string,
    enrolled: number,
    capacity: number,
    moderator: string,
    description: string,
    location: string,
};
type ClubEnrollment = {
    record_id: number,
    approvalDate: any,
    year: string,
    email: string,
    name: string,
    grade: string,
    school: string,
    homeroom: string,
    club_id: number,
    club_name: string,
    club_moderator: string,
    description: string,
    is_in_club: boolean;
};
type UserClubState = {
    email: string,
    name: string,
    grade: string,
    school: string,
    homeroom: string,
    form_edit_state: string,
    is_in_club: boolean,
    current_club_id: number,
    current_club_name: string,
    user_role: string,
    is_student: boolean,
    is_moderator: boolean,
    club_message: string,
}
function getClubRecords() {
    clubsValues = clubsSheet.getDataRange().getValues();
    clubsValuesAsObjArray = valuesToArrayOfObjects(clubsValues);
    return clubsValuesAsObjArray;
}
function sanitize(element: string | number) {
    return element.toString().trim().toLowerCase();
}
function getCurrentClubRecord() {
    let currentClubRecord = {} as ClubEnrollment;
    clubEnrollmentValuesAsObjArray = valuesToArrayOfObjects(clubEnrollmentSheet.getDataRange().getValues());
    let clubRecord = clubEnrollmentValuesAsObjArray.find((clubRecord) => clubRecord.email == getUserEmail());
    if (clubRecord == null || clubRecord == undefined) {
        currentClubRecord.club_id = 0;
        currentClubRecord.club_name = 'Not in a club';
        currentClubRecord.is_in_club = false;
    }
    else {
        currentClubRecord.club_id = clubRecord.club_id;
        currentClubRecord.club_name = clubRecord.club_name;
        currentClubRecord.is_in_club = true;
    }
    Logger.log(JSON.stringify(currentClubRecord));
    return currentClubRecord;
}
function getCurrentClubRecordIndex(applicationEmail) {
    let currentClubRecordIndex: number;
    clubEnrollmentValues = clubEnrollmentSheet.getDataRange().getValues();
    clubEnrollmentValuesAsObjArray = valuesToArrayOfObjects(clubEnrollmentValues);
    currentClubRecordIndex = clubEnrollmentValuesAsObjArray.findIndex((clubRecord) => clubRecord.email == applicationEmail);
    return currentClubRecordIndex;
}
function getClubsFilteredByLevel() {
    if (isTeacher(getUserEmail())) {
        let clubs: Club[] = getClubRecords();
        return clubs;
    } else {
        // need student details
        let studentHrInfo: Student = getStudentHRInfo(getUserEmail());
        // need available clubs
        // filter the availabe clubs by matches with student details.
        let allclubs = getClubRecords();
        function isMatch(levelOptions) {
            let isMatch = false;
            levelOptions.forEach((element) => {
                if (sanitize(element) == sanitize(studentHrInfo.grade)
                    || sanitize(element) == sanitize(studentHrInfo.school)
                    || sanitize(element) == sanitize(studentHrInfo.homeroom)) {
                    isMatch = true;
                }
            });
            return isMatch;
        }
        let clubsByLevel = allclubs.filter(function (club) {
            // split club levels into array
            let levelOptions = club.level.split(",");
            return isMatch(levelOptions);
        });
        return clubsByLevel;
    }
}
async function getUserClubState() {
    let studentDetails = await getStudentInfo(getUserEmail());
    let studentHrInfo = await getStudentHRInfo(getUserEmail());
    let currentClubRecord = getCurrentClubRecord();
    let is_student = (studentDetails.email != undefined);
    let form_edit_state = getFormState();
    let userClubState: UserClubState = {
        email: studentDetails.email,
        name: studentDetails.full_name,
        grade: studentHrInfo.grade,
        school: studentHrInfo.school,
        homeroom: studentHrInfo.homeroom,
        form_edit_state: form_edit_state,
        is_in_club: currentClubRecord.is_in_club,
        current_club_id: currentClubRecord.club_id,
        current_club_name: currentClubRecord.club_name,
        user_role: "",
        is_student: is_student,
        is_moderator: false,
        club_message: "",
    };
    return userClubState;
}

function testClubs() {
    let studentDetails = getStudentInfo(getUserEmail());
    Logger.log(`studentDetails: ${JSON.stringify(studentDetails)}`);
    let studentHrInfo = getStudentHRInfo(getUserEmail());
    Logger.log(`studentHrInfo: ${JSON.stringify(studentHrInfo)}`);
    let currentClubRecord = getCurrentClubRecord();
    Logger.log(`currentClubRecord: ${JSON.stringify(currentClubRecord)}`);
    let is_student = (studentDetails.email != undefined);
    Logger.log(`is_student: ${is_student}`);
    let form_state = getFormState();
    Logger.log(`form_state: ${form_state}`);
    let userClubState = getUserClubState();
    Logger.log(`userClubState: ${JSON.stringify(userClubState)}`);
}