import { db } from "@/db";
import { UserEmailVerificationSchema } from "@/schemas/user";
import { generateRandomString } from "@/utils/crypto";
import dayjs from "dayjs";
const nodemailer = require('nodemailer');

export async function POST(request: Request) {
  const body = await request.json();
  const { value, error } = UserEmailVerificationSchema.validate(body);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  const { email } = value;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  }

  if (user.emailVerified) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  }

  const token = generateRandomString();

  // delete old email verifications links
  await db.userEmailVerification.deleteMany({
    where: {
      userId: user.id,
    },
  });

  await db.userEmailVerification.create({
    data: {
      userId: user.id,
      token,
      expires: dayjs().add(5, "days").toDate(),
    },
  });

  // if (process.env.NODE_ENV !== "production") {
  //   console.log("Copy this to browser to verify email");
  //   console.log(`http://localhost:3000/verify-email/${token}`);
  // } else {
    // todo implement the logic to send it to email
    const emailContent = `Click the following link to verify your email: http://localhost:3000/verify-email/${token}`;
    // TODO: Use your email sending library or service to send the email
    // For example, you can use Nodemailer to send the email
    // Here's an example of how you can use Nodemailer:
    

    // Create a transporter object with your email service provider's SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
      user: 'info@phantaisia.com',
      pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'info@phantaisia.com',
      to: email,
      subject: 'Email Verification',
      text: emailContent,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error: any, info: { response: any; }) => {
      if (error) {
      console.error('Error sending email:', error);
      } else {
      console.log('Email sent:', info.response);
      }
    });
    
  //}

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
