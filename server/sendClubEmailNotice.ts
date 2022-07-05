function sendApplicationEmail(emailTemplateRecordValues: Application) {
  const htmlBody = HtmlService.createTemplateFromFile("email_templates/club_application_mail.html");
  htmlBody.student_name = emailTemplateRecordValues.student_name;
  htmlBody.club_name = emailTemplateRecordValues.club_name;
  htmlBody.description = emailTemplateRecordValues.description;
  htmlBody.club_moderator = emailTemplateRecordValues.club_moderator;
  htmlBody.message = emailTemplateRecordValues.application_message;
  const emailHtml = htmlBody.evaluate().getContent();
  // const toEmail = application.email;
  let welcomeMessage = `Dear ${emailTemplateRecordValues.student_email} Notice for your application to the ${emailTemplateRecordValues.club_name} club!`;
  MailApp.sendEmail({
    // bcc: 'tsampson@dishs.tp.edu.tw', not needed for testing
    // cc:
    htmlBody: emailHtml,
    subject: welcomeMessage,
    to: 'tsampson@dishs.tp.edu.tw',  // hardcoded for testing to: toEmail
  });
}