import { db } from "@/db";
import { UserEmailVerificationSchema } from "@/schemas/user";
import { generateRandomString } from "@/utils/crypto";
import { sendEmailVerificationLink } from "@/utils/mail";
import dayjs from "dayjs";
const nodemailer = require("nodemailer");

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
  console.log("attempting to send email to", email, "with token", token);
  if (process.env.NODE_ENV !== "production") {
    console.log("Copy this to browser to verify email");
    console.log(`http://localhost:3000/verify-email/${token}`);
  } else {
    await sendEmailVerificationLink({ token, email });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
