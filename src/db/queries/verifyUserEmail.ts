import dayjs from "dayjs";
import { db } from "..";

export default async function verifyUserEmail(token: string) {
  if (!token) return false;

  const userEmailVerification = await db.userEmailVerification.findUnique({
    where: {
      token,
    },
  });

  if (!userEmailVerification) return false;

  if (dayjs().isAfter(dayjs(userEmailVerification.expires))) return false;

  await db.user.update({
    where: {
      id: userEmailVerification.userId,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  await db.userEmailVerification.delete({
    where: {
      token,
    },
  });

  return true;
}
