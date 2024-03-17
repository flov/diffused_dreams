"use server";

import * as auth from "@/auth";

export const signInWithGoogle = async () =>
  auth.signIn("google", { redirectTo: "/eventstation" });
export const signInWithGithub = async () =>
  auth.signIn("github", { redirectTo: "/eventstation" });
