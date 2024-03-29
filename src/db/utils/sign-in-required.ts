import { auth } from "@/auth";

export const signInRequired = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this"],
      },
    };
  }
};
