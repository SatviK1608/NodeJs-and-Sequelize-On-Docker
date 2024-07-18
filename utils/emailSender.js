
const transporter = require('../config/emailConfig');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');


const sendForgotPasswordEmail = async (toEmail, verificationCode) => {
  try {
    
    const templatePath = path.join(__dirname, '../templates/forgotPasswordEmail.html');
    const emailTemplateSource = fs.readFileSync(templatePath, 'utf-8');
    
    
    const emailTemplate = handlebars.compile(emailTemplateSource);
    const emailHtml = emailTemplate({ verificationCode });

   
    await transporter.sendMail({
      from: '"BlaBla Support" <mailtrap@demomailtrap.com>',
      to: 'satvik1608@gmail.com',
      subject: 'Forgot Password Verification Code',
      html: emailHtml
    });

    console.log('Forgot password email sent successfully');
  } catch (error) {
    console.error('Error sending forgot password email:', error);
  }
};

module.exports = {
  sendForgotPasswordEmail
};
