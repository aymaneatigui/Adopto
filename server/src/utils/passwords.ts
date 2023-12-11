import * as bcrypt from "bcrypt";
import crypto from "crypto";

export const hashPassword = (passwrd) => {
  return bcrypt.hash(passwrd, 5);
};

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const generateRandomPassword = () => {
  return crypto.randomBytes(5).toString("hex").substring(0, 9);
};
