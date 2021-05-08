const fs = require('fs');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

let mailerConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,

  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
};

const getTransport = nodemailer.createTransport(mailerConfig);

const sendTemplate = (template, values, templateValues) => {
  const magicTemplate = handlebars.compile(fs.readFileSync(template, 'utf-8'));

  let message = {
    from: values.from,
    to: values.to,
    subject: values.subject,
    html: magicTemplate(templateValues),
  };

  getTransport.sendMail(message);
};

module.exports = {
  getTransport,
  sendTemplate,
};
