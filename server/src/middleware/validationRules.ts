import { body } from "express-validator";

export const authRule = () => {
  return [
    body("username")
      .isLength({ min: 4 })
      .withMessage("username must be at least 4 characters long")
      .isLength({ max: 20 })
      .withMessage("username must be at most 20 characters long")
      .isAlphanumeric()
      .withMessage("username must contain only letters and numbers"),
    body("password")
      .isLength({ min: 4 })
      .withMessage("password must be at least 4 characters long"),
  ];
};
