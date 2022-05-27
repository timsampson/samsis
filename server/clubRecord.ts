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
    let currentClub: Club = getCurrentClub();

    let application: Application = {
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
        canSubmit: false,
        hasPendingClub: false,
        formState: "",
        pendingClubName: "",
        isInClub: undefined,
        currentClubId: "",
        currentClubName: "",
        applicationStatus: "pending",
        user_role: "",
        isStudent: (studentDetails.email != undefined),
        isModerator: false,
        message: ""
    };
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
    let applicationStringify = JSON.stringify(application);
    return applicationStringify;
}
function clubEnrollmentEntry(newEnrollmentRecords: any[]) {
    clubEnrollmentValues = clubApplicationSheet.getDataRange().getValues();
    clubEnrollmentValuesAsObjArray = ValuesToArrayOfObjects(clubEnrollmentValues);
    // get the clubEnrollmentSheet values
    newEnrollmentRecords.forEach((record) => {
        let clubApplicantEmail = record.email;
        let currentIndexOfRecordForUser = clubEnrollmentValuesAsObjArray.findIndex((record: Application) => {
            return record.email == clubApplicantEmail;
        });
        // recordId	formSubmissionDate	year	isApproved	email	name	grade	school	homeroom	appliedClubId	clubName
        // if the user doesn't have a record, add the record
        let approvedRecord = [
            record.recordId,
            record.formSubmissionDate,
            record.formSubmissionDate.getFullYear(),
            record.approvalStatus,
            record.email,
            record.name,
            record.grade,
            record.school,
            record.homeroom,
            record.appliedClubId,
            record.appliedClubName
        ];
        if (currentIndexOfRecordForUser == -1) {
            clubEnrollmentSheet.appendRow(approvedRecord);
        }
        else {
            // if the user has a record find it's index
            // replace it with the new record
            clubEnrollmentSheet.getRange(currentIndexOfRecordForUser + 2, 1, 1, clubEnrollmentSheet.getLastColumn()).setValues([approvedRecord]);
        }
    });
}
function getClubApprovalRecords() {
    clubApplicationValues = clubApplicationSheet.getDataRange().getValues();
    clubApplicationValuesAsObjArray = ValuesToArrayOfObjects(clubApplicationValues);
    let pendingClubs = clubApplicationValuesAsObjArray.filter((application) => application.processed == false);
    pendingClubs.forEach((record, index) => {
        pendingClubs[index] = JSON.stringify(record);
    });
    return pendingClubs;
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
function processReviewedClubApplications(approvedList: any[]) {
    let userProcessing = getUserEmail();
    //Logger.log(approvedList);
    let processingDate = new Date();
    let numProcessed = 0;
    let approvedForEnrollment = [];
    clubApplicationValues = clubApplicationSheet.getDataRange().getValues();
    let clubApplicationValuesAsObjArray = ValuesToArrayOfObjects(clubApplicationValues);
    // approvedList is an array of objects.
    // for each of the objects in the array, find the record in the club application sheet
    // and update the record with the approver's email and approval status
    let colIndex = clubApplicationValues[0].indexOf("approvalStatus");
    let rowIndex: number;
    // compare the sumbitted entries with the sheet record 
    // return the rowindex if found or -1 
    approvedList.forEach(approvedRecord => {
        clubApplicationValuesAsObjArray.forEach((applicationRecord: Application, rowIndex) => {
            if (applicationRecord.recordId == approvedRecord.recordId) {
                if (approvedRecord.approvalStatus == "approved") {
                    approvedForEnrollment.push(applicationRecord);
                    // sheet row number starts at 1, so add 1 to rowIndex and colIndex
                    // missing header row, so add 1 to rowIndex
                    let updateRange = clubApplicationSheet.getRange(rowIndex + 2, colIndex, 1, 4);
                    if (approvedRecord.approvalStatus == "approved") {
                        // these records are getting written contiguously, so this will be a problem if the columns are moved.
                        // this can be updated to use 4 column indexes and 4 separate writes to be less brittle
                        updateRange.setValues([[true, "approved", processingDate, userProcessing]]);
                    }
                    else {
                        updateRange.setValues([[true, "rejected", processingDate, userProcessing]]);
                    }
                    numProcessed++;
                }
            }
            return applicationRecord.recordId == approvedRecord.recordId;
        });
        rowIndex = 0;
    });
    approvedForEnrollment.forEach(record => {
        Logger.log(`Here is a record: ${JSON.stringify(record)}`);
    });
    Logger.log(`Number of processsed Records: ${numProcessed}`);
    return `Number of processsed Records: ${numProcessed}`;
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