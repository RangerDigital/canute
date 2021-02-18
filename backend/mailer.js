const nodemailer = require('nodemailer');

let mailerConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,

  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
};

module.exports = nodemailer.createTransport(mailerConfig);
