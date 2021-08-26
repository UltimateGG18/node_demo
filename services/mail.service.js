const nodemailer = require("nodemailer");

const sendEmail = (mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "gauravgaonkar1818@gmail.com",
      pass: "gaurav@18",
    },
  });
  transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
