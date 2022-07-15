// id	email	lastname	firstname	gender	title	full_name	employment	department_code	department_name	role	is_club_admin
type Staff = {
    id: string,
    email: string,
    lastname: string,
    firstname: string,
    gender: string,
    title: string,
    full_name: string,
    employment_type: string,
    department_name: string,
    role: string,
}

function isTeacher(email: string) {
    if (email === undefined) { email = getUserEmail(); }
    let staffInfo = getStaffInfo(email);
    if (staffInfo === undefined) {
        return false;
    }
    return true;
}
function getStaffInfo(email: string) {
    if (email === undefined) { email = getUserEmail(); }
    staffValues = staffSheet.getDataRange().getValues();
    staffValuesAsObjArray = valuesToArrayOfObjects(staffValues);
    let staffInfo: Staff = staffValuesAsObjArray.find((staff: Staff) => staff.email == email);
    return staffInfo;
}
function getAllStaffInfo() {
    staffValues = staffSheet.getDataRange().getValues();
    let staffInfo = staffValuesAsObjArray = valuesToArrayOfObjects(staffValues);
    return staffInfo;
}
function testStaff() {
    Logger.log(getStaffInfo(getUserEmail()));
    Logger.log(isTeacher(getUserEmail()));
}
function getTeacherName(email: string) {
    if (email === undefined) { email = getUserEmail(); }
    let staffInfo: Staff = getStaffInfo(email);
    return staffInfo.full_name;
}
function getTeacherId(email: string) {
    if (email === undefined) { email = getUserEmail(); }
    let staffInfo: Staff = getStaffInfo(email);
    return staffInfo.id;
}