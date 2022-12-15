import type { ErrorRequestHandler } from "express";

export const handleErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  if (err) {
    return res.status(400).json({
      message: err.message || "Somethign went wrong",
    });
  }
  next();
};
