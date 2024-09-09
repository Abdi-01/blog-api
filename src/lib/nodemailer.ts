import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_SENDER, // email account for sender
    pass: process.env.MAIL_APP_PASSWORD, // app password from google
  },
});
