const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bigflymakeover@gmail.com",
    pass: 'fgameriswagcehcp',
  },
});


module.exports = transporter;