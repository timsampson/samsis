function sendApplicationEmail(emailTemplateRecordValues) {
  const htmlBody = HtmlService.createTemplateFromFile("email_templates/welcome-mail.html");
  htmlBody.stuName = emailTemplateRecordValues.name;
  htmlBody.clubName = emailTemplateRecordValues.appliedClubName;
  htmlBody.clubDetails = emailTemplateRecordValues.appliedClubDetails;
  htmlBody.clubModerator = emailTemplateRecordValues.appliedclubModerator;
  htmlBody.message = emailTemplateRecordValues.message;
  const emailHtml = htmlBody.evaluate().getContent();
  // const toEmail = application.email;
  let welcomeMessage = `Dear ${emailTemplateRecordValues.email} Notice for your application to the ${emailTemplateRecordValues.appliedClubName} club!`;
  MailApp.sendEmail({
    // bcc: 'tsampson@dishs.tp.edu.tw', not needed for testing
    // cc:
    htmlBody: emailHtml,
    subject: welcomeMessage,
    to: 'tsampson@dishs.tp.edu.tw',  // hardcoded for testing to: toEmail
  });
}