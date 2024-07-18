const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io', 
  port: 587, 
  auth: {
    user: 'api', 
    pass: '14e601cd3b2c3e1861249082449239d4' 
  }
});

module.exports = transporter;