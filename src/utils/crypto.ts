import bcrypt from "bcrypt";
import crypto from "node:crypto";

const SALT_ROUNDS = process.env.PASSWORD_SALT_ROUNDS
  ? parseInt(process.env.PASSWORD_SALT_ROUNDS, 10)
  : 10;

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (
  password: string | null,
  hash: string | null
) => {
  if (!password || !hash) {
    return false;
  }

  return bcrypt.compare(password, hash);
};

export const generateRandomString = (size = 20) => {
  return crypto.randomBytes(size).toString("hex");
};
