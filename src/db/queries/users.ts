import { Dispatch, SetStateAction } from "react";
import type { User } from "@prisma/client";
import { db } from "..";

export const payUserTokens = async (
  tokens: number,
  setUser: Dispatch<SetStateAction<User | null>> | null,
) => {
  try {
    const res = await fetch("/api/users/update-tokens", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokens }),
    });
    if (setUser) setUser(await res.json());
  } catch (error) {
    console.error("Error updating token:", error);
  }
};

export const fetchUsers = (): Promise<User[]> => {
  return db.user.findMany({ take: 20 });
};

export const fetchUserByEmail = (email: string): Promise<User | null> => {
  return db.user.findUnique({ where: { email } });
};
