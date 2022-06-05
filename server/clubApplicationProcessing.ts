type Application = {
    recordId: string,
    formSubmissionDate: Date,
    approvalDate: Date,
    approvedBy: string,
    email: string,
    name: string,
    grade: string,
    school: string,
    homeroom: string,
    clubId: string,
    clubName: string,
    clubModerator: string,
    clubDetails: string,
    clubLocation: string,
    approvalStatus: string,
    hasCapacity: boolean,
    canSubmit: boolean,
    formState: string,
    received: boolean,
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
    let currentClub: Club = getCurrentClub();

    let application: Application = {
        email: studentDetails.email,
        clubId: clubId,
        approvedBy: "",
        hasCapacity: appliedClubDetails.enrolled < appliedClubDetails.capacity,
        received: true,
        processed: false,
        recordId: getlogId(clubEnrollmentSheet),
        formSubmissionDate: new Date(),
        approvalDate: undefined,
        name: studentDetails.full_name,
        grade: studentHRInfo.grade,
        school: studentHRInfo.school,
        homeroom: studentHRInfo.homeroom,
        clubModerator: appliedClubDetails.moderator,
        clubName: appliedClubDetails.name,
        clubDetails: appliedClubDetails.description,
        clubLocation: appliedClubDetails.location,
        approvalStatus: "pending",
        canSubmit: false,
        formState: getFormState(),
        isInClub: (currentClub != undefined),
        currentClubId: currentClub.id,
        currentClubName: currentClub.name,
        applicationStatus: "pending",
        user_role: "",
        isStudent: (studentDetails.email != undefined),
        isModerator: false,
        message: ""
    };
    if (application.hasCapacity && !application.isInClub) {
        // these records are getting written contiguously, so this will be a problem if the columns are moved.
        // this can be updated to use 4 column indexes and 4 separate writes to be less brittle
        application.message = `Welcome! Your application to join ${application.clubName} has been approved.`;
    }
    else {
        application.message = `Unfortunately your application to join ${application.clubName} has been rejected. The club is full or the moderator has not yet approved your application.`;
    }
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
        application.clubId,
        application.clubName,
        application.clubModerator,
        application.hasCapacity,
        application.isInClub,
    ];
    clubApplicationSheet.appendRow(applicationLogRecord);
    let applicationStringify = JSON.stringify(application);
    sendApplicationEmail(application);
    return applicationStringify;
}
function getClubInfo(clubId: string) {
    clubsValues = clubsSheet.getDataRange().getValues();
    clubsValuesAsObjArray = ValuesToArrayOfObjects(clubsValues);
    let clubInfo = clubsValuesAsObjArray.find((club: Club) => club.id == clubId);
    return clubInfo;
}
type Approved = {
    recordId: string,
    email: string,
    approvalStatus: string,
    processed: boolean
}
function testPRCA() {
    let approved1 = {
        recordId: "id202126608",
        email: "tsampson@dishs.tp.edu.tw",
        approvalStatus: "approved",
        processed: true
    };
    let approved2 = {
        recordId: "id202126609",
        email: "scawte@niceschool.edu",
        approvalStatus: "approved",
        processed: true
    };
    let approved3 = {
        recordId: "id202126610",
        email: "scawte@niceschool.edu",
        approvalStatus: "rejected",
        processed: true
    };
    let approved4 = {
        recordId: "id202126611",
        email: "scawte@niceschool.edu",
        approvalStatus: "approved",
        processed: true
    };
    let approvedList = [approved1, approved2, approved3, approved4];
    let application = processReviewedClubApplications(approvedList);
    Logger.log(application);
}
function processReviewedClubApplications(approvedList: Approved[]) {
    let userProcessing = getUserEmail();
    let processingDate = new Date();
    let processedApplications = 0;
    clubApplicationValues = clubApplicationSheet.getDataRange().getValues();
    let clubApplicationValuesAsObjArray = ValuesToArrayOfObjects(clubApplicationValues);
    // get index of the approval status from the header row of the club application sheet.
    let colIndex = clubApplicationValues[0].indexOf("approvalStatus");
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
        let emailTemplateRecordValues: { message?: any; clubName?: any; };
        if (rowIndex > 0) { // if the record was found
            emailTemplateRecordValues = clubApplicationValuesAsObjArray[rowIndex];
            if (applicationRecord.approvalStatus == "approved") {
                // these records are getting written contiguously, so this will be a problem if the columns are moved.
                // this can be updated to use 4 column indexes and 4 separate writes to be less brittle
                updateRange.setValues([[true, "approved", processingDate, userProcessing]]);
                emailTemplateRecordValues.message = `Your application to join ${emailTemplateRecordValues.clubName} has been approved.`;
            }
            else {
                updateRange.setValues([[true, "rejected", processingDate, userProcessing]]);
                emailTemplateRecordValues.message = `Your application to join ${emailTemplateRecordValues.clubName} has been rejected.`;
            }
            processedApplications++;
            sendApplicationEmail(emailTemplateRecordValues);
        }
        rowIndex = 0;
    });
    Logger.log(`Number of processsed Records: ${processedApplications}`);
    return `Number of processsed Records: ${processedApplications}`;
}