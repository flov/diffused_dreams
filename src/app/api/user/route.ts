import { db } from "@/db";
import { UserRegisterSchema } from "@/schemas/user";
import { hashPassword } from "@/utils/crypto";
import { Prisma } from "@prisma/client";

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

  //  todo: add email verification link

  try {
    await db.user.create({
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

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
