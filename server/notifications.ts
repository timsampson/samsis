// Send an email with two attachments: a file from Google Drive (as a PDF) and an HTML file.
// var file = DriveApp.getFileById('1234567890abcdefghijklmnopqrstuvwxyz');
// var blob = Utilities.newBlob('Insert any HTML content here', 'text/html', 'my_document.html');
// MailApp.sendEmail('mike@example.com', 'Attachment example', 'Two files are attached.', {
//     name: 'Automatic Emailer Script',
//     attachments: [file.getAs(MimeType.PDF), blob]
// });
// This file contains the functions that are used to create the email body
// and send using 
const houseImageURL = "0Bw2SLdz4BuDmRXBWYlR3NnQ0Tnpfb0FiNXhhYkhJMGExbGkw";
const sunImageURL = "0Bw2SLdz4BuDmZHlyNFc0QkR2TVdzNHhpbkZ4RzZidnNYZjFF";
const houseImage = DriveApp.getFileById(houseImageURL)
    .getBlob()
    .setName("housePicture");
const sunImage = DriveApp.getFileById(sunImageURL)
    .getBlob()
    .setName("sunImage");


function createMeritEmailHTML(
    { record }: {
        record: {
            sunPicture: GoogleAppsScript.Base.Blob;
            housePicture: GoogleAppsScript.Base.Blob;
            studentName: any;
            studentHouse: any;
            allDetails: any;
            hrtEmail: string;
            teacherEmail: string;
            studentEmail: any;
        };
    }): void {
    // Create the individual template
    const htmlBody = HtmlService.createTemplateFromFile("meritMailTemplate");
    htmlBody.name = record.studentName;
    htmlBody.house = record.studentHouse;
    htmlBody.alldetails = record.allDetails;
    const meritHtmlBody = htmlBody.evaluate().getContent();
    // Send the email
    sendMeritEmail();

    function sendMeritEmail() {
        const ccEmail = record.hrtEmail + ", " + record.teacherEmail;
        const toEmail = record.studentEmail;
        const emailSubject = "Merit Awarded";
        sendMerit(meritHtmlBody, ccEmail, toEmail, emailSubject);
    }
}

// sends the email 
function sendMerit(
    meritHtml: string,
    ccEmail: string,
    toEmail: string,
    emailSubject: string,
) {
    // Send individual email
    MailApp.sendEmail({
        cc: ccEmail,
        htmlBody: meritHtml,
        subject: emailSubject,
        to: toEmail,
        inlineImages: {
            sunPicture: sunImage,
            housePicture: houseImage,
        },
    });
}