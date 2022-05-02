function setRecordClubApplicationEntry(clubId: string | number) {
    let application = {
        email: getUserEmail(),
        appliedClubId: clubId,
        received: true,
        processed: true,
        isModerator: undefined,
        recordId: undefined,
    };
    let formSubmissionDate = new Date();
    application.recordId = applicationId(clubEnrollmentSheet);;
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