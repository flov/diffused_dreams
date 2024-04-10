import { db } from "@/db";
import { UserRegisterSchema } from "@/schemas/user";
import { generateRandomString, hashPassword } from "@/utils/crypto";
import { Prisma, User } from "@prisma/client";
import dayjs from "dayjs";

export async function POST(request: Request) {
  const body = await request.json();

  const { value, error } = UserRegisterSchema.validate(body);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  const { password, email } = value;
  const passwordHash = await hashPassword(password);

  let user: User;

  try {
    user = await db.user.create({
      data: {
        email,
        password: passwordHash,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return new Response(JSON.stringify({ error: "Email already exists" }), {
          status: 400,
        });
      }
    }
    throw e;
  }

  const token = generateRandomString();

  await db.userEmailVerification.create({
    data: {
      userId: user.id,
      token,
      expires: dayjs().add(5, "days").toDate(),
    },
  });

  if (process.env.NODE_ENV !== "production") {
    console.log("Copy this to browser to verify email");
    console.log(`http://localhost:3000/verify-email/${token}`);
  } else {
    // todo implement the logic to send it to email
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
