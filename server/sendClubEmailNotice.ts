function sendApplicationEmail(emailTemplateRecordValues: Application) {
  const htmlBody = HtmlService.createTemplateFromFile("email_templates/club_application_mail.html");
  htmlBody.stuName = emailTemplateRecordValues.name;
  htmlBody.clubName = emailTemplateRecordValues.clubName;
  htmlBody.description = emailTemplateRecordValues.description;
  htmlBody.clubModerator = emailTemplateRecordValues.clubModerator;
  htmlBody.message = emailTemplateRecordValues.applicationMessage;
  const emailHtml = htmlBody.evaluate().getContent();
  // const toEmail = application.email;
  let welcomeMessage = `Dear ${emailTemplateRecordValues.email} Notice for your application to the ${emailTemplateRecordValues.clubName} club!`;
  MailApp.sendEmail({
    // bcc: 'tsampson@dishs.tp.edu.tw', not needed for testing
    // cc:
    htmlBody: emailHtml,
    subject: welcomeMessage,
    to: 'tsampson@dishs.tp.edu.tw',  // hardcoded for testing to: toEmail
  });
}