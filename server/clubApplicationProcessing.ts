type Application = {
    student_email: any;
    record_id: string,
    submission_date: Date,
    reviewed_date: Date,
    reviewed_by: string,
    student_name: string,
    grade: string,
    school: string,
    homeroom: string,
    club_id: number,
    club_name: string,
    club_moderator: string,
    club_location: string,
    review_status: string,
    notification_kind: string,
    has_capacity: boolean,
    form_state: string,
    received: boolean,
    is_in_club: boolean,
    current_club_id: number,
    current_club_name: string,
    processed: boolean,
    user_role: string,
    is_student: boolean,
    is_moderator: boolean,
    application_message: string,
    description: string,
}
async function clubApplicationSubmission(club_id: number) {
    let application_record_id = getlogId(clubEnrollmentSheet);
    let application_form_state = getFormState();
    let studentDetails: Student = await getStudentInfo(getUserEmail());
    let appliedClubDetails: Club = await getClubInfo(club_id);
    let studentHrInfo: Student = await getStudentHRInfo(getUserEmail());
    let currentClubRecord: ClubEnrollment = getCurrentClubRecord();
    let form_state = getFormState();
    let is_student = (studentDetails.email != undefined);
    Logger.log(`currentclubrecord is: ${JSON.stringify(currentClubRecord)}`);
    Logger.log(` currentclubrecord.is_in_club is: ${currentClubRecord.is_in_club}`);
    let application: Application = {
        student_email: studentDetails.email,
        club_id: club_id,
        reviewed_by: "",
        has_capacity: appliedClubDetails.enrolled < appliedClubDetails.capacity,
        received: true,
        processed: false,
        record_id: application_record_id,
        submission_date: new Date(),
        reviewed_date: new Date(),
        student_name: studentDetails.full_name,
        grade: studentHrInfo.grade,
        school: studentHrInfo.school,
        homeroom: studentHrInfo.homeroom,
        club_moderator: appliedClubDetails.moderator,
        club_name: appliedClubDetails.club_name,
        description: appliedClubDetails.description,
        club_location: appliedClubDetails.location,
        review_status: "pending",
        form_state: application_form_state,
        is_in_club: currentClubRecord.is_in_club,
        current_club_id: currentClubRecord.club_id,
        current_club_name: currentClubRecord.name,
        user_role: "",
        is_student: is_student,
        is_moderator: false,
        application_message: "",
        notification_kind: "",
    };
    if (form_state == "closed" || form_state == "view") {
        // these records are getting written contiguously, so this will be a problem if the columns are moved.
        // this can be updated to use 4 column indexes and 4 separate writes to be less brittle
        application.application_message = `The club form is not open for submissions at this time.`;
        application.review_status = "rejected";
        application.notification_kind = "Error";
        application.reviewed_by = "Automatic Review";
        let applicationStringify = JSON.stringify(application);
        return applicationStringify;
    } else if
        (application.has_capacity && !application.is_in_club && form_state == "submit") {
        // these records are getting written contiguously, so this will be a problem if the columns are moved.
        // this can be updated to use 4 column indexes and 4 separate writes to be less brittle
        application.application_message = `Welcome! Your application to join ${application.club_name} has been approved.`;
        application.review_status = "approved";
        application.notification_kind = "success";
        application.reviewed_by = "Automatic Review";
        application.processed = true;
    }
    else {
        application.application_message = `Unfortunately your application to join the ${application.club_name} club is still pending. The club is full or the moderator has not yet approved your application.`;
        application.review_status = "pending";
        application.notification_kind = "warning";
        application.reviewed_by = "Automatic Review";
    }
    let applicationLogRecord = [
        application.record_id,
        application.submission_date,
        application.submission_date.getFullYear(),
        application.processed,
        application.review_status,
        application.reviewed_date,
        application.reviewed_by,
        application.student_email,
        application.student_name,
        application.grade,
        application.school,
        application.homeroom,
        application.club_id,
        application.club_name,
        application.club_moderator,
        application.description,
        application.has_capacity,
        application.is_in_club,
    ];
    if (application.has_capacity && !application.is_in_club) {
        updateEnrollmentEntry(application);
    }
    clubApplicationSheet.appendRow(applicationLogRecord);
    let applicationStringify = JSON.stringify(application);
    sendApplicationEmail(application);
    return applicationStringify;
}
function getClubInfo(club_id: number) {
    clubsValues = clubsSheet.getDataRange().getValues();
    clubsValuesAsObjArray = valuesToArrayOfObjects(clubsValues);
    let clubInfo = clubsValuesAsObjArray.find((club: Club) => club.id == club_id);
    return clubInfo;
}
type Approved = {
    record_id: string,
    student_email: string,
    review_status: string,
    processed: boolean
}
function processReviewedClubApplications(approvedList: Approved[]) {
    let userProcessing = getUserEmail();
    let processingDate = new Date();
    let processedApplications = 0;
    clubApplicationValues = clubApplicationSheet.getDataRange().getValues();
    let clubApplicationValuesAsObjArray = valuesToArrayOfObjects(clubApplicationValues);
    // get index of the approval status from the header row of the club application sheet.
    let colIndex = clubApplicationValues[0].indexOf("review_status");
    // initialize the row index variable which will hold the value of the row index of the club application sheet.
    let rowIndex: number;
    // iterate through the approved list and update associated records in the club application sheet.
    approvedList.forEach(applicationRecord => {
        // return the index of the row that contains the email of the current application record.
        rowIndex = clubApplicationValuesAsObjArray.findIndex((record: Application) => {
            return record.record_id == applicationRecord.record_id;
        });
        // Google Sheets rows and columns start their index at 1, findIndex starts at 0.
        // Add 1 to account for the difference in indexing
        // Add 1 to the row index to account for the header row.
        // Get the range to be updated.
        let updateRange = clubApplicationSheet.getRange(rowIndex + 2, colIndex, 1, 4);
        let recordToProcess: Application;
        if (rowIndex > 0) { // if the record was found
            recordToProcess = clubApplicationValuesAsObjArray[rowIndex] as Application;
            if (applicationRecord.review_status == "approved") {
                // these records are getting written contiguously, so this will be a problem if the columns are moved.
                // this can be updated to use 4 column indexes and 4 separate writes to be less brittle
                updateRange.setValues([[true, "approved", processingDate, userProcessing]]);
                recordToProcess.application_message = `Your application to join ${recordToProcess.club_name} has been approved.`;
                updateEnrollmentEntry(recordToProcess);
            }
            else {
                updateRange.setValues([[true, "rejected", processingDate, userProcessing]]);
                recordToProcess.application_message = `Your application to join ${recordToProcess.club_name} has been rejected.`;
            }
            recordToProcess.reviewed_date = processingDate;
            processedApplications++;
            sendApplicationEmail(recordToProcess);
        }
        rowIndex = 0;
    });
    return `Number of processsed Records: ${processedApplications}`;
}
function updateEnrollmentEntry(application: Application) {
    // approved list.id should end up being the enrolled id
    clubEnrollmentValues = clubEnrollmentSheet.getDataRange().getValues();
    clubEnrollmentValuesAsObjArray = valuesToArrayOfObjects(clubEnrollmentValues);
    for (let index = clubEnrollmentValuesAsObjArray.length - 1; index > 0; index--) {
        if (clubEnrollmentValuesAsObjArray[index].email == application.student_email) {
            clubEnrollmentSheet.deleteRow(index + 2);
            clubEnrollmentValuesAsObjArray.splice(index, 1);
        }
    }
    let enrollmentRecord = [
        application.record_id,
        application.reviewed_date,
        application.reviewed_date.getFullYear(),
        application.student_email,
        application.student_name,
        application.grade,
        application.school,
        application.homeroom,
        application.club_id,
        application.club_name,
        application.club_moderator,
        application.description
    ];
    clubEnrollmentSheet.appendRow(enrollmentRecord);
}

function testPRCA() {
    let approved1 = {
        record_id: "id202126608",
        student_email: "tsampson@dishs.tp.edu.tw",
        review_status: "approved",
        processed: true
    };
    let approved2 = {
        record_id: "id202126609",
        student_email: "scawte@niceschool.edu",
        review_status: "approved",
        processed: true
    };
    let approved3 = {
        record_id: "id202126610",
        student_email: "scawte@niceschool.edu",
        review_status: "rejected",
        processed: true
    };
    let approved4 = {
        record_id: "id202126608",
        student_email: "traske@niceschool.edu",
        review_status: "approved",
        processed: true
    }

    let approvedList: Approved[] = [approved1, approved2, approved3, approved4];
    let application = processReviewedClubApplications(approvedList);
    Logger.log(`application: ${application}`);
}
function testApplication() {
    let applicationtest = clubApplicationSubmission(4);
    Logger.log(`application: ${applicationtest}`);
}

