const config = require('config');
const nodemailer = require('nodemailer');

function sendMail(email, subject, text){
  console.log('Config:', config.get('nodeMailUsername'))
  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: config.get('nodeMailUsername')    
  });

  const mailOptions = {
    from: 'kingzchanges@gmail.com',
    to: email,
    subject:subject,
    text: text
  }
    
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

exports.sendMail = sendMail
