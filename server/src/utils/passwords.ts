import * as bcrypt from "bcrypt";

export const hashPassword = (passwrd) => {
  return bcrypt.hash(passwrd, 5);
};

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};
