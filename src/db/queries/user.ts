import { Dispatch, SetStateAction } from "react";
import { User } from "../types";

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
