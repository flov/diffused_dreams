import { auth } from "@/auth";
import { db } from "@/db";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
  // update the user's tokens in the database
  const session = await auth();
  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const email = session.user.email;
  if (!email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // get logged in user from the database
  const user = await db.user.findUnique({
    where: { email },
  });
  return Response.json(user);
}
