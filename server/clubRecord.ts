type Application = {
    recordId: string,
    formSubmissionDate: Date,
    isApproved: boolean,
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
function clubApplicationEntry(clubId: string) {
    let studentDetails: Student = getStudentInfo()
    let appliedClubDetails: Club = getClubInfo(clubId);
    let studentHRInfo: Student = getStudentHRInfo();
    let currentClub: Club = getCurrentClub();

    let application: Application = {
        email: studentDetails.email,
        appliedClubId: clubId,
        hasCapacity: appliedClubDetails.enrolled >= appliedClubDetails.capacity,
        received: true,
        processed: false,
        recordId: getlogId(clubEnrollmentSheet),
        formSubmissionDate: new Date(),
        isApproved: false,
        name: studentDetails.full_name,
        grade: studentDetails.grade,
        school: studentHRInfo.school,
        homeroom: studentDetails.homeroom,
        appliedClubName: appliedClubDetails.name,
        appliedclubModerator: appliedClubDetails.moderator,
        appliedClubDetails: appliedClubDetails.description,
        appliedClubLocation: appliedClubDetails.location,
        canSubmit: false,
        formState: getFormState(),
        pendingClubName: "",
        isInClub: false,
        currentClubId: "",
        currentClubName: "",
        applicationStatus: "",
        user_role: "",
        isStudent: false,
        isModerator: false,
        message: ""
    };
    let formSubmissionDate = new Date();
    application
    let applicationLogRecord = [
        application.recordId,
        formSubmissionDate,
        application.email,
        application.appliedClubId,
        application.received,
        application.processed,
    ];
    clubEnrollmentSheet.appendRow(applicationLogRecord);
    return "Application received for " + application.appliedClubId;
}
function getClubInfo(clubId: string) {
    clubsValues = clubsSheet.getDataRange().getValues();
    clubsValuesAsObjArray = ValuesToArrayOfObjects(clubsValues);
    let clubInfo = clubsValuesAsObjArray.find((club: Club) => club.id == clubId);
    return clubInfo;
}