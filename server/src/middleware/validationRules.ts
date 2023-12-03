import { body } from "express-validator";

export const authRule = () => {
  return [
    body("username")
      .isAlphanumeric()
      .withMessage("username must contain only letters and numbers")
      .isLength({ min: 4 })
      .withMessage("username must be at least 4 characters long"),
    body("password")
      .isAlphanumeric()
      .withMessage("password must contain only letters and numbers")
      .isLength({ min: 4 })
      .withMessage("password must be at least 4 characters long"),
  ];
};
