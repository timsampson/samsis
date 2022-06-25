type Application = {
    recordId: string,
    formSubmissionDate: Date,
    reviewedDate: Date,
    reviewedBy: string,
    email: string,
    name: string,
    grade: string,
    school: string,
    homeroom: string,
    clubId: number,
    clubName: string,
    clubModerator: string,
    clubLocation: string,
    reviewStatus: string,
    hasCapacity: boolean,
    formState: string,
    received: boolean,
    isInClub: boolean,
    currentClubId: number,
    currentClubName: string,
    processed: boolean,
    user_role: string,
    isStudent: boolean,
    isModerator: boolean,
    applicationMessage: string,
    description: string,
}
async function clubApplicationSubmission(clubId: number) {
    let applicationRecordId = getlogId(clubEnrollmentSheet);
    let applicationFormState = getFormState();
    let studentDetails: Student = await getStudentInfo()
    let appliedClubDetails: Club = await getClubInfo(clubId);
    let studentHRInfo: Student = await getStudentHRInfo();
    let currentClubRecord: ClubEnrollment = getCurrentClubRecord();
    let formState = getFormState();
    let isStudent = (studentDetails.email != undefined);
    Logger.log(`currentclubrecord is: ${JSON.stringify(currentClubRecord)}`);
    Logger.log(` currentclubrecord.isInClub is: ${currentClubRecord.isInClub}`);
    let application: Application = {
        email: studentDetails.email,
        clubId: clubId,
        reviewedBy: "",
        hasCapacity: appliedClubDetails.enrolled < appliedClubDetails.capacity,
        received: true,
        processed: false,
        recordId: applicationRecordId,
        formSubmissionDate: new Date(),
        reviewedDate: new Date(),
        name: studentDetails.full_name,
        grade: studentHRInfo.grade,
        school: studentHRInfo.school,
        homeroom: studentHRInfo.homeroom,
        clubModerator: appliedClubDetails.moderator,
        clubName: appliedClubDetails.name,
        description: appliedClubDetails.description,
        clubLocation: appliedClubDetails.location,
        reviewStatus: "pending",
        formState: applicationFormState,
        isInClub: currentClubRecord.isInClub,
        currentClubId: currentClubRecord.clubId,
        currentClubName: currentClubRecord.name,
        user_role: "",
        isStudent: isStudent,
        isModerator: false,
        applicationMessage: "",
    };
    if (formState == "closed" || formState == "view") {
        // these records are getting written contiguously, so this will be a problem if the columns are moved.
        // this can be updated to use 4 column indexes and 4 separate writes to be less brittle
        application.applicationMessage = `The club form is not open for submissions at this time.`;
        application.reviewStatus = "rejected";
        application.reviewedBy = "Automatic Review";
        let applicationStringify = JSON.stringify(application);
        return applicationStringify;
    } else if
        (application.hasCapacity && !application.isInClub && formState == "submit") {
        // these records are getting written contiguously, so this will be a problem if the columns are moved.
        // this can be updated to use 4 column indexes and 4 separate writes to be less brittle
        application.applicationMessage = `Welcome! Your application to join ${application.clubName} has been approved.`;
        application.reviewStatus = "approved";
        application.reviewedBy = "Automatic Review";
        application.processed = true;
    }
    else {
        application.applicationMessage = `Unfortunately your application to join ${application.clubName} is still pending. The club is full or the moderator has not yet approved your application.`;
        application.reviewStatus = "pending";
        application.reviewedBy = "Automatic Review";
    }
    let applicationLogRecord = [
        application.recordId,
        application.formSubmissionDate,
        application.formSubmissionDate.getFullYear(),
        application.processed,
        application.reviewStatus,
        application.reviewedDate,
        application.reviewedBy,
        application.email,
        application.name,
        application.grade,
        application.school,
        application.homeroom,
        application.clubId,
        application.clubName,
        application.clubModerator,
        application.description,
        application.hasCapacity,
        application.isInClub,
    ];
    if (application.hasCapacity && !application.isInClub) {
        updateEnrollmentEntry(application);
    }
    clubApplicationSheet.appendRow(applicationLogRecord);
    let applicationStringify = JSON.stringify(application);
    sendApplicationEmail(application);
    return applicationStringify;
}
function getClubInfo(clubId: number) {
    clubsValues = clubsSheet.getDataRange().getValues();
    clubsValuesAsObjArray = valuesToArrayOfObjects(clubsValues);
    let clubInfo = clubsValuesAsObjArray.find((club: Club) => club.id == clubId);
    return clubInfo;
}
function processReviewedClubApplications(approvedList: Approved[]) {
    let userProcessing = getUserEmail();
    let processingDate = new Date();
    let processedApplications = 0;
    clubApplicationValues = clubApplicationSheet.getDataRange().getValues();
    let clubApplicationValuesAsObjArray = valuesToArrayOfObjects(clubApplicationValues);
    // get index of the approval status from the header row of the club application sheet.
    let colIndex = clubApplicationValues[0].indexOf("reviewStatus");
    // initialize the row index variable which will hold the value of the row index of the club application sheet.
    let rowIndex: number;
    // iterate through the approved list and update associated records in the club application sheet.
    approvedList.forEach(applicationRecord => {
        // return the index of the row that contains the email of the current application record.
        rowIndex = clubApplicationValuesAsObjArray.findIndex((record: Application) => {
            return record.recordId == applicationRecord.recordId;
        });
        // Google Sheets rows and columns start their index at 1, findIndex starts at 0.
        // Add 1 to account for the difference in indexing
        // Add 1 to the row index to account for the header row.
        // Get the range to be updated.
        let updateRange = clubApplicationSheet.getRange(rowIndex + 2, colIndex, 1, 4);
        let recordToProcess: Application;
        if (rowIndex > 0) { // if the record was found
            recordToProcess = clubApplicationValuesAsObjArray[rowIndex] as Application;
            if (applicationRecord.reviewStatus == "approved") {
                // these records are getting written contiguously, so this will be a problem if the columns are moved.
                // this can be updated to use 4 column indexes and 4 separate writes to be less brittle
                updateRange.setValues([[true, "approved", processingDate, userProcessing]]);
                recordToProcess.applicationMessage = `Your application to join ${recordToProcess.clubName} has been approved.`;
                updateEnrollmentEntry(recordToProcess);
            }
            else {
                updateRange.setValues([[true, "rejected", processingDate, userProcessing]]);
                recordToProcess.applicationMessage = `Your application to join ${recordToProcess.clubName} has been rejected.`;
            }
            recordToProcess.reviewedDate = processingDate;
            processedApplications++;
            sendApplicationEmail(recordToProcess);
        }
        rowIndex = 0;
    });
    return `Number of processsed Records: ${processedApplications}`;
}
function updateEnrollmentEntry(application: Application) {
    // approved list.id should end up being the enrolled id
    clubEnrollmentValues = clubEnrollmentSheet.getDataRange().getValues();
    clubEnrollmentValuesAsObjArray = valuesToArrayOfObjects(clubEnrollmentValues);
    for (let index = clubEnrollmentValuesAsObjArray.length - 1; index > 0; index--) {
        if (clubEnrollmentValuesAsObjArray[index].email == application.email) {
            clubEnrollmentSheet.deleteRow(index + 2);
            clubEnrollmentValuesAsObjArray.splice(index, 1);
        }
    }
    let enrollmentRecord = [
        application.recordId,
        application.reviewedDate,
        application.reviewedDate.getFullYear(),
        application.email,
        application.name,
        application.grade,
        application.school,
        application.homeroom,
        application.clubId,
        application.clubName,
        application.clubModerator,
        application.description
    ];
    clubEnrollmentSheet.appendRow(enrollmentRecord);
}
type Approved = {
    recordId: string,
    email: string,
    reviewStatus: string,
    processed: boolean
}
function testPRCA() {
    let approved1 = {
        recordId: "id202126608",
        email: "tsampson@dishs.tp.edu.tw",
        reviewStatus: "approved",
        processed: true
    };
    let approved2 = {
        recordId: "id202126609",
        email: "scawte@niceschool.edu",
        reviewStatus: "approved",
        processed: true
    };
    let approved3 = {
        recordId: "id202126610",
        email: "scawte@niceschool.edu",
        reviewStatus: "rejected",
        processed: true
    };
    let approved4 = {
        recordId: "id202126608",
        email: "traske@niceschool.edu",
        reviewStatus: "approved",
        processed: true
    };
    let approvedList = [approved1, approved2, approved3, approved4];
    let application = processReviewedClubApplications(approvedList);
    Logger.log(`application: ${application}`);
}
function testApplication() {
    let applicationtest = clubApplicationSubmission(4);
    Logger.log(`application: ${applicationtest}`);
}

