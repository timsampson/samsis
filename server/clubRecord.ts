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
    let currentClubDetails: currentClub = getCurrentClub();

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
        let approvedRecord = [
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
        clubEnrollmentSheet.appendRow(approvedRecord);
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

function clubEnrollmentEntry(pendingEnrollmentRecords: Application[]) {
    // get the clubEnrollmentSheet values
    let enrollmentValuesAsObjArray = getClubEnrollmentValuesAsObjArray();
    // check to see if the record is already in the sheet if not append it.
    // loop though all records
    pendingEnrollmentRecords.forEach((pendingEnrollmentRecord) => {
        let indexOfApproved = enrollmentValuesAsObjArray.findIndex((enrollment: Application) => enrollment.email === pendingEnrollmentRecord.email);
        // check to see if the record is already in the enrollment sheet if not append it.
        let approvedRecord;
        if (indexOfApproved < 0) {
            pendingEnrollmentRecord.isApproved = true;
            approvedRecord = [
                pendingEnrollmentRecord.recordId,
                pendingEnrollmentRecord.formSubmissionDate,
                pendingEnrollmentRecord.formSubmissionDate.getFullYear(),
                pendingEnrollmentRecord.isApproved,
                pendingEnrollmentRecord.email,
                pendingEnrollmentRecord.name,
                pendingEnrollmentRecord.grade,
                pendingEnrollmentRecord.school,
                pendingEnrollmentRecord.homeroom,
                pendingEnrollmentRecord.appliedClubId,
                pendingEnrollmentRecord.appliedClubName,
                indexOfApproved
            ];
            clubEnrollmentSheet.appendRow(approvedRecord);
        }
        else {
            approvedRecord = [
                pendingEnrollmentRecord.recordId,
                pendingEnrollmentRecord.formSubmissionDate,
                pendingEnrollmentRecord.formSubmissionDate.getFullYear(),
                pendingEnrollmentRecord.isApproved,
                pendingEnrollmentRecord.email,
                pendingEnrollmentRecord.name,
                pendingEnrollmentRecord.grade,
                pendingEnrollmentRecord.school,
                pendingEnrollmentRecord.homeroom,
                pendingEnrollmentRecord.appliedClubId,
                pendingEnrollmentRecord.appliedClubName
            ];
            // if the user has a previous club Enrollment record 
            // use the current index to replace it with the new record
            clubEnrollmentSheet.getRange(indexOfApproved + 2, 1, 1, clubEnrollmentSheet.getLastColumn()).setValues([approvedRecord]);
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
    processed: boolean,
    isApproved: boolean,
}