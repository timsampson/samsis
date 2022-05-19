function getClubApprovalRecords() {
    clubApplicationValues = clubApplicationSheet.getDataRange().getValues();
    clubApplicationValuesAsObjArray = ValuesToArrayOfObjects(clubApplicationValues);
    let pendingClubs = clubApplicationValuesAsObjArray.filter((application) => application.isApproved == false);
    pendingClubs.forEach((record, index) => {
        pendingClubs[index] = JSON.stringify(record);
    });
    return pendingClubs;
}