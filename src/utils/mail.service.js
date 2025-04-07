import nodemailer from 'nodemailer';
import config from '../config/config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: config.smtpHost,
  port: config.smtpPort,
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass
  }
});

export const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: 'noreply@ntg.ba',
    to,
    subject,
    html: text
  };
  return transporter.sendMail(mailOptions);
}
