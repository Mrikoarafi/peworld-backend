const {JWTEMPLOYE,JWTRECRUITER,JWT_REGIS,EMAIL,PASSWORD} = require('../helper/env')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

module.exports = {
  sendEmailEmploye: (email) => {
    const isjwt = jwt.sign({ email: email }, JWTEMPLOYE);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hacker0001223@gmail.com",
        pass: "ammarpedia123",
      },
    });
    const link = `http://localhost:3000/employe/register/${isjwt}`;
    var mailOptions = {
      from: "as@gmail.com",
      to: email,
      subject: "Register hire app",
      html:
        "Hello,<br> <h2>Please Click on the link to verify your email.</h2><br><a href=" +
        link +
        ">Click here to verify</a>",
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      console.log("Email sent: " + info.response);
    });
    
  },
  sendEmailRecruiter: (email) => {
  }
}
