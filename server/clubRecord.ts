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
async function clubApplicationEntry(clubId: string) {
    let studentDetails: Student = await getStudentInfo()
    let appliedClubDetails: Club = await getClubInfo(clubId);
    let studentHRInfo: Student = await getStudentHRInfo();
    let currentClub: Club = getCurrentClub();

    let application: Application = {
        email: studentDetails.email,
        appliedClubId: clubId,
        hasCapacity: appliedClubDetails.enrolled < appliedClubDetails.capacity,
        received: true,
        processed: false,
        recordId: getlogId(clubEnrollmentSheet),
        formSubmissionDate: new Date(),
        isApproved: false,
        name: studentDetails.full_name,
        grade: studentHRInfo.grade,
        school: studentHRInfo.school,
        homeroom: studentHRInfo.homeroom,
        appliedClubName: appliedClubDetails.name,
        appliedclubModerator: appliedClubDetails.moderator,
        appliedClubDetails: appliedClubDetails.description,
        appliedClubLocation: appliedClubDetails.location,
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
        application.isApproved,
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