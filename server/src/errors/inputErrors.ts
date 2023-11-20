import { validationResult } from "express-validator";

export const inputErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const formattedErrors = errors.array().map((error) => ({
    field: error.type,
    message: error.msg,
  }));

  res.status(400).json({ errors: formattedErrors });
};
