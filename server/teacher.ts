type Staff = {
    email: string,
    phone: string,
    role: string,
}

function isTeacher() {
    let staffInfo = getStaffInfo();
    if (staffInfo === undefined) {
        return false;
    }
    return true;
}
function getStaffInfo() {
    staffValues = staffSheet.getDataRange().getValues();
    staffValuesAsObjArray = valuesToArrayOfObjects(staffValues);
    let staffInfo = staffValuesAsObjArray.find((staff: Staff) => staff.email == getUserEmail());
    return staffInfo;
}
function testStaff() {
    Logger.log(getStaffInfo());
    Logger.log(isTeacher());
}