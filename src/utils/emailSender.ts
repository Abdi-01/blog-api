import path from "path";
import fs from "fs";
import { transporter } from "../lib/nodemailer";
import handlebars from "handlebars";
export const sendEmail = async (
  email: string,
  subject: string,
  content?: string | null,
  data?: { username: string; otp: string; link: string }
) => {
  try {
    const templatePath = path.join(__dirname, "../templates", "register.hbs");
    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const compileTemplate = handlebars.compile(templateSource);
    const html = compileTemplate(data);
    await transporter.sendMail({
      from: process.env.MAIL_SENDER,
      to: email,
      subject,
      html: content || html,
    });
  } catch (error) {
    throw error;
  }
};
