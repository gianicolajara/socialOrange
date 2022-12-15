import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const handleErrorsValidators = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.mapped());

    return res.status(400).json({
      type: "ERROR_VALIDATOR",
      errors: errors.mapped(),
    });
  }

  return next();
};
