type Club = {
    id: number,
    formSubmissionDate: any;
    level: string,
    clubId: number,
    active: boolean,
    year: string,
    name: string,
    enrolled: number,
    capacity: number,
    moderator: string,
    description: string,
    location: string,
};
type ClubEnrollment = {
    recordId: number,
    approvalDate: any,
    year: string,
    email: string,
    name: string,
    grade: string,
    school: string,
    homeroom: string,
    clubId: number,
    clubName: string,
    clubModerator: string,
    description: string,
    isInClub: boolean;
};
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
        currentClubRecord.clubId;
        currentClubRecord.clubName;
        currentClubRecord.isInClub = false;
    }
    else {
        currentClubRecord.clubId = clubRecord.clubId;
        currentClubRecord.clubName = clubRecord.clubName;
        currentClubRecord.isInClub = true;
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
    if (isTeacher()) {
        let clubs: Club[] = getClubRecords();
        return clubs;
    } else {
        // need student details
        let studentHRInfo: Student = getStudentHRInfo();
        // need available clubs
        // filter the availabe clubs by matches with student details.
        let allclubs = getClubRecords();
        function isMatch(levelOptions) {
            let isMatch = false;
            levelOptions.forEach((element) => {
                if (sanitize(element) == sanitize(studentHRInfo.grade)
                    || sanitize(element) == sanitize(studentHRInfo.school)
                    || sanitize(element) == sanitize(studentHRInfo.homeroom)) {
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
    let studentDetails = await getStudentInfo();
    let studentHRInfo = await getStudentHRInfo();
    let currentClubRecord = getCurrentClubRecord();
    let isStudent = (studentDetails.email != undefined);
    let formState = getFormState();
    let userClubState = {
        email: studentDetails.email,
        name: studentDetails.full_name,
        grade: studentHRInfo.grade,
        school: studentHRInfo.school,
        homeroom: studentHRInfo.homeroom,
        formState: formState,
        isInClub: currentClubRecord.isInClub,
        currentClubId: currentClubRecord.clubId,
        currentClubName: currentClubRecord.clubName,
        user_role: "",
        isStudent: isStudent,
        isModerator: false,
        clubMessage: "",
    };
    return userClubState;
}

function testClubs() {
    let studentDetails = getStudentInfo();
    Logger.log(`studentDetails: ${JSON.stringify(studentDetails)}`);
    let studentHRInfo = getStudentHRInfo();
    Logger.log(`studentHRInfo: ${JSON.stringify(studentHRInfo)}`);
    let currentClubRecord = getCurrentClubRecord();
    Logger.log(`currentClubRecord: ${JSON.stringify(currentClubRecord)}`);
    let isStudent = (studentDetails.email != undefined);
    Logger.log(`isStudent: ${isStudent}`);
    let formState = getFormState();
    Logger.log(`formState: ${formState}`);
    let userClubState = getUserClubState();
    Logger.log(`userClubState: ${JSON.stringify(userClubState)}`);
}