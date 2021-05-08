const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'clinicthasung@gmail.com',
      pass: 'P@ssw0rd-thasung'
    }
  })

  const message = {
    from: `Admin <clinicthasung@gmail.com>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  }

  await transporter.sendMail(message ,async(err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log('yes')

    }
  })
}

module.exports = sendEmail;