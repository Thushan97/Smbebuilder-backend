const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail({
  from,
  to,
  subject,
  text,
  htmlPageName,
  replacements,
}) {
  EMAIL_ADDRESS = process.env.MAILER_EMAIL_ADDRESS;
  EMAIL_PASSWORD = process.env.MAILER_EMAIL_PASSWORD;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports(587)
    auth: {
      user: EMAIL_ADDRESS, // generated ethereal user
      pass: EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let htmlToSend = "";
  if (htmlPageName) {
    htmlToSend = await ejs.renderFile(
      path.join(__dirname, `../email/${htmlPageName}/index.ejs`),
      { ...replacements }
    );
  }

  // send mail with defined transport object
  return await transporter.sendMail({
    from: `${from} <${EMAIL_ADDRESS}>`,
    to,
    subject,
    text,
    html: htmlToSend,
  });
}

module.exports.sendMail = sendMail;
