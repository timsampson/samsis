// clubs
type Club = {
    formSubmissionDate: any;
    level: string,
    id: string,
    active: boolean,
    year: string,
    name: string,
    enrolled: number,
    capacity: number,
    moderator: string,
    description: string,
    location: string,
};

function getClubRecords() {
    clubsValues = clubsSheet.getDataRange().getValues();
    clubsValuesAsObjArray = ValuesToArrayOfObjects(clubsValues);
    return clubsValuesAsObjArray;
}

function sanitize(element: string | number) {
    return element.toString().trim().toLowerCase();
}
// function getPendingClubs() {
//     clubApplicationValues = studentSheet.getDataRange().getValues();
//     clubApplicationValuesAsObjArray = ValuesToArrayOfObjects(clubApplicationValues);
//     let pendingClubs = clubApplicationValuesAsObjArray.filter((application: Application) => application.hasPendingClub);
// }
function getCurrentClub() {
    let currentClub = {} as Club;
    clubEnrollmentValues = clubEnrollmentSheet.getDataRange().getValues();
    clubEnrollmentValuesAsObjArray = ValuesToArrayOfObjects(clubEnrollmentValues);
    currentClub = clubEnrollmentValuesAsObjArray.find((clubRecord) => clubRecord.email == getUserEmail());
    // let currentClubStringify = JSON.stringify(currentClub);
    // return currentClubStringify;
    return currentClub;
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