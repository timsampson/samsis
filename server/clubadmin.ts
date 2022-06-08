function getClubApprovalRecords() {
    clubApplicationValues = clubApplicationSheet.getDataRange().getValues();
    clubApplicationValuesAsObjArray = valuesToArrayOfObjects(clubApplicationValues);
    let pendingClubs = clubApplicationValuesAsObjArray.filter((application) => application.processed == false);
    pendingClubs.forEach((record, index) => {
        pendingClubs[index] = JSON.stringify(record);
    });
    return pendingClubs;
}