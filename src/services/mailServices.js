/* eslint-disable no-undef */
const nodemailer = require('nodemailer');
require('dotenv').config();

const mailService = {
  async sendMail({emailTo }) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const token = jwt.sign(
      {
          email: emailTo,
      },
      process.env.SECRET,
      {
          algorithm: 'HS256',
          expiresIn: '1d',
          issuer: 'nhan',
      }
  );

  const resetUrl = `http://localhost:3000/reset_password/${token}`;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: emailTo,
      subject: "Reset Password",
      text: "Reset your password",
      html: `click  <a href="${resetUrl}">here</a> to reset your password`
    });
  },
};

Object.freeze(mailService);

module.exports = mailService;
