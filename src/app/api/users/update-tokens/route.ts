import { auth } from "@/auth";
import { db } from "@/db";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function PUT(request: NextRequest) {
  // update the user's tokens in the database
  const session = await auth();
  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email } = session.user;
  if (!email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  // get logged in user from the database
  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  // update the user's tokens by substracting the payload from the current tokens
  // get payload from request body
  const { tokens } = await request.json();
  const updatedUser = await db.user.update({
    where: { email },
    data: {
      tokens: user.tokens - tokens,
    },
  });

  return Response.json(updatedUser);
}
