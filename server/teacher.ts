type Staff = {
    email: string,
    phone: string,
    role: string,
}

function isTeacher() {
    let staffInfo = getStaffInfo();
    return staffInfo.role.toLowerCase() == "teacher";
}
function getStaffInfo() {
    staffValues = staffSheet.getDataRange().getValues();
    staffValuesAsObjArray = ValuesToArrayOfObjects(staffValues);
    let staffInfo = staffValuesAsObjArray.find((staff: Staff) => staff.email == getUserEmail());
    return staffInfo;
}
function testStaff() {
    Logger.log(getStaffInfo());
    Logger.log(isTeacher());
}