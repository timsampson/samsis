type Application = {
    recordId: string,
    formSubmissionDate: Date,
    approvedBy: string,
    email: string,
    name: string,
    grade: string,
    school: string,
    homeroom: string,
    appliedClubId: string,
    appliedClubName: string,
    appliedclubModerator: string,
    appliedClubDetails: string,
    appliedClubLocation: string,
    approvalStatus: string,
    approvalDate: Date,
    isApproved: boolean,
    hasCapacity: boolean,
    canSubmit: boolean,
    formState: string,
    received: boolean,
    hasPendingClub: boolean,
    pendingClubName: string,
    isInClub: boolean,
    currentClubId: string,
    currentClubName: string,
    applicationStatus: string,
    processed: boolean,
    user_role: string,
    isStudent: boolean,
    isModerator: boolean,
    message: string,
}
async function clubApplicationEntry(clubId: string) {
    let studentDetails: Student = await getStudentInfo()
    let appliedClubDetails: Club = await getClubInfo(clubId);
    let studentHRInfo: Student = await getStudentHRInfo();
    let currentClubDetails: currentClub = getCurrentClub(getUserEmail());

    let application: Application = {
        formState: "submission",
        email: studentDetails.email,
        appliedClubId: clubId,
        approvedBy: "",
        hasCapacity: appliedClubDetails.enrolled < appliedClubDetails.capacity,
        received: true,
        processed: false,
        recordId: getlogId(clubEnrollmentSheet),
        formSubmissionDate: new Date(),
        name: studentDetails.full_name,
        grade: studentHRInfo.grade,
        school: studentHRInfo.school,
        homeroom: studentHRInfo.homeroom,
        appliedClubName: appliedClubDetails.name,
        appliedclubModerator: appliedClubDetails.moderator,
        appliedClubDetails: appliedClubDetails.description,
        appliedClubLocation: appliedClubDetails.location,
        approvalStatus: "pending",
        approvalDate: undefined,
        isApproved: false,
        canSubmit: false,
        hasPendingClub: false,
        pendingClubName: "",
        isInClub: currentClubDetails.isInClub,
        currentClubId: currentClubDetails.currentClubId,
        currentClubName: currentClubDetails.currentClubName,
        applicationStatus: "pending",
        user_role: "",
        isStudent: (studentDetails.email != undefined),
        isModerator: false,
        message: ""
    };

    if (application.formState == "submission" && application.isInClub == false) {
        application.message = "Your club application has been approved.";
        application.isApproved = true;
        let reviewedRecord = [
            application.recordId,
            application.formSubmissionDate,
            application.formSubmissionDate.getFullYear(),
            application.isApproved,
            application.email,
            application.name,
            application.grade,
            application.school,
            application.homeroom,
            application.appliedClubId,
            application.appliedClubName,
        ];
        clubEnrollmentSheet.appendRow(reviewedRecord);
    }
    else {
        application.message = "Your club application status is pending review."
        application.approvalStatus = "pending";
        let applicationLogRecord = [
            application.recordId,
            application.formSubmissionDate,
            application.formSubmissionDate.getFullYear(),
            application.processed,
            application.approvalStatus,
            application.approvalDate,
            application.approvedBy,
            application.email,
            application.name,
            application.grade,
            application.school,
            application.homeroom,
            application.appliedClubId,
            application.appliedClubName,
            application.hasCapacity
        ];
        clubApplicationSheet.appendRow(applicationLogRecord);
    }
    let applicationStringify = JSON.stringify(application);
    return applicationStringify;
}
function getClubApplicationRecord(recordId: any) {
    let updatedClubEnrollmentValuesAsObjArray = getClubApplicationValuesAsObjArray();
    let applicationRecord = updatedClubEnrollmentValuesAsObjArray.find((application) => application.recordId == recordId);
    return applicationRecord;
}
function testProcessed() {
    let reviewedRecords = [{
        recordId: `id2022307285`,
        email: 'tsampson@dishs.tp.edu.tw',
        approvalStatus: "approved",
    }];
    Logger.log(reviewedRecords);
    return processReviewedClubApplications(reviewedRecords);
}
function processReviewedClubApplications(reviewedRecords: any[]) {
    reviewedRecords.forEach((application) => {
        // get the current club for the user in the application
        let currentClubDetails: currentClub = getCurrentClub(application.email);
        // get the current application record by id for the individual in the application
        let clubApplicationRecord = getClubApplicationRecord(application.recordId);
        application.isApproved = application.approvalStatus == "approved" ? true : false;
        let reviewedRecord = [
            clubApplicationRecord.recordId,
            clubApplicationRecord.formSubmissionDate,
            clubApplicationRecord.formSubmissionDate.getFullYear(),
            application.isApproved,
            clubApplicationRecord.email,
            clubApplicationRecord.name,
            clubApplicationRecord.grade,
            clubApplicationRecord.school,
            clubApplicationRecord.homeroom,
            clubApplicationRecord.appliedClubId,
            clubApplicationRecord.appliedClubName,
        ];
        if (application.isApproved == true && currentClubDetails.isInClub == false) {
            Logger.log(`application.isApproved == true && currentClubDetails.isInClub == false`);
            clubEnrollmentSheet.appendRow(reviewedRecord);
            updateApplicationRecord(application);
        }
        else if (application.isApproved == true && currentClubDetails.isInClub == true) {
            Logger.log(`This should be updating the record`);
            let enrollmentValuesAsObjArray = getClubEnrollmentValuesAsObjArray();
            let index = enrollmentValuesAsObjArray.findIndex((enrollment: Application) => enrollment.email == application.email);
            clubEnrollmentSheet.getRange(index + 2, 1, 1, clubEnrollmentSheet.getLastColumn()).setValues([reviewedRecord]);
            updateApplicationRecord(application);
        }
        else {
            updateApplicationRecord(application);
        }
    });
    reviewedRecords.forEach((record, index) => {
        reviewedRecords[index] = JSON.stringify(record);
    });
    return reviewedRecords;
}
function updateApplicationRecord(applicationRecord: Application) {
    let userProcessing = getUserEmail();
    let processingDate = new Date();
    let colIndex = clubApplicationValues[0].indexOf("approvalStatus");
    let rowIndex = clubApplicationValuesAsObjArray.findIndex((record: Application) => {
        return record.recordId == applicationRecord.recordId;
    });
    // sheet row number starts at 1, so add 1 to rowIndex and colIndex
    // missing header row, so add 1 to rowIndex
    let updateRange = clubApplicationSheet.getRange(rowIndex + 2, colIndex, 1, 4);
    if (rowIndex > 0) { // if the record was found
        if (applicationRecord.approvalStatus == "approved") {
            // these records are getting written contiguously, so this will be a problem if the columns are moved.
            // this can be updated to use 4 column indexes and 4 separate writes to be less brittle
            updateRange.setValues([[true, "approved", processingDate, userProcessing]]);
        }
        else {
            updateRange.setValues([[true, "rejected", processingDate, userProcessing]]);
        }
    }
}

function getClubApprovalRecords() {
    clubApplicationValues = clubApplicationSheet.getDataRange().getValues();
    clubApplicationValuesAsObjArray = valuesToArrayOfObjects(clubApplicationValues);
    let pendingClubs = clubApplicationValuesAsObjArray.filter((application) => application.processed == false);
    pendingClubs.forEach((record, index) => {
        pendingClubs[index] = JSON.stringify(record);
    });
    return pendingClubs;
}
function getClubInfo(clubId: string) {
    clubsValues = clubsSheet.getDataRange().getValues();
    clubsValuesAsObjArray = valuesToArrayOfObjects(clubsValues);
    let clubInfo = clubsValuesAsObjArray.find((club: Club) => club.id == clubId);
    return clubInfo;
}
type Approved = {
    recordId: string,
    email: string,
    approvalStatus: string,
    processed: boolean,
    isApproved: boolean,
}