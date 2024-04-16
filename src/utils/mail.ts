import { createTransport } from "nodemailer";

export const gmailEmailTransporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@phantaisia.com",
    pass: process.env.EMAIL_PASSWORD,
  },
  connectionTimeout: 10000
});

export async function sendEmailVerificationLink({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const emailContent = `Click the following link to verify your email: https://diffused-dreams-psi.vercel.app/verify-email/${token}`;

  // todo in the future: create a template for the email and use handlebarsjs to replace/render the token
  const htmlEmailContent = `
  <p>
    Click the following link to verify your email:
    <a href="https://diffused-dreams-psi.vercel.app/verify-email/${token}" target="_blank">Verify Email</a>
  </p>
`;

  const mailOptions = {
    from: "info@phantaisia.com",
    to: email,
    subject: "Email Verification",
    text: emailContent,
    html: htmlEmailContent,
  };

  gmailEmailTransporter.sendMail(
    mailOptions,
    (error: any, info: { response: any }) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    }
  );
}
