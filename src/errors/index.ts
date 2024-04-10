import { AuthError } from "next-auth";
import { EMAIL_NOT_VERIFIED } from "./customErrorTypes";

export class EmailNotVerifiedError extends AuthError {
  static kind = "signIn";
  static type = EMAIL_NOT_VERIFIED;

  constructor(message: string) {
    super(message);
  }
}
