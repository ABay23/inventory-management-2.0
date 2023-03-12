const nodemailer = require('nodemailer')

const emailSender = async (subject, message, send_to, send_from, reply_to) => {
  //* Create email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
  const emailOptions = {
    from: send_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  }
  //* Send email
  transporter.sendMail(emailOptions, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}

module.exports = emailSender
