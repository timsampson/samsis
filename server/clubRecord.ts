import App from "../src/App.svelte";

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
        canSubmit: false,
        hasPendingClub: false,
        formState: getFormState(),
        pendingClubName: "",
        isInClub: (currentClub.id != ""),
        currentClubId: currentClub.id,
        currentClubName: currentClub.name,
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

    let approved1: Approved = {
        recordId: "id2022197301",
        email: "tsampson@dishs.tp.edu.tw",
        approvalStatus: "approved",
        processed: true
    };
    let approved2: Approved = {
        recordId: "id202126611",
        email: "scawte@niceschool.edu",
        approvalStatus: "approved",
        processed: true

    };
    let approvedList = [approved1, approved2];
    let application = processReviewedClubApplications(approvedList);
    Logger.log(application);
}
function processReviewedClubApplications(approvedList: Approved[]) {
    let processedApplications = 0;
    clubApplicationValues = clubApplicationSheet.getDataRange().getValues();
    let clubApplicationValuesAsObjArray = ValuesToArrayOfObjects(clubApplicationValues);
    // approved is an array of objects.
    // for each of the objects in the array, find the record in the club application sheet
    // and update the record with the approver's email and approval status
    let colIndex = clubApplicationValues[0].indexOf("approvalStatus");
    let rowIndex;
    approvedList.forEach(applicationRecord => {
        Logger.log(applicationRecord);
        rowIndex = clubApplicationValuesAsObjArray.findIndex((record: Application) => {
            return record.recordId == applicationRecord.recordId;
        });
        // sheet row number starts at 1, so add 1 to rowIndex and colIndex
        // missing header row, so add 1 to rowIndex
        if (rowIndex > 0) { // if the record was found
            if (applicationRecord.approvalStatus == "approved") {
                clubApplicationSheet.getRange(rowIndex + 2, colIndex + 1).setValue("approved");
            }
            else {
                clubApplicationSheet.getRange(rowIndex + 2, colIndex + 1).setValue("rejected");
            }
            clubApplicationSheet.getRange(rowIndex + 2, colIndex + 2).setValue(new Date());
            clubApplicationSheet.getRange(rowIndex + 2, colIndex + 3).setValue(getUserEmail());
            processedApplications++;
        }
        rowIndex = 0;
    });
    Logger.log(`Number of processsed Records: ${processedApplications}`);
    return `Number of processsed Records: ${processedApplications}`;
}