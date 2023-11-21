import { body } from "express-validator";

export const authRule = () => {
  return [
    body("username")
      .isAlphanumeric()
      .withMessage("Username must contain only letters and numbers")
      .isLength({ min: 4 })
      .withMessage("Username must be at least 4 characters long"),
    body("password")
      .isAlphanumeric()
      .withMessage("Password must contain only letters and numbers")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long"),
  ];
};
