const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
  host: 'mail.royalxela.com',
  port: 465,
  auth: {
    user: 'support@royalxela.com',
    pass: 'iamtheowner'
      },
  tls: {
      rejectUnauthorized: false
    },
});

module.exports = transporter


