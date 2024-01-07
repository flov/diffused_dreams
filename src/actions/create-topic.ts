"use server";

import * as auth from "@/auth";

export const createTopic = async () => auth.signIn("github");
