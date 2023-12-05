import { validationResult } from "express-validator";

export const inputErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const formattedErrors = errors.array().map((e) => {
    const err = e as any;
    return {
      field: err.path,
      message: err.msg,
    };
  });

  res.status(400).json({ status: "error", message: formattedErrors });
};
