import { NextFunction, Request, Response } from "express";
import { UserInterface } from "interfaces";
import User from "..//model/user.model";
import { decodeAndVerifyJWT } from "../utils/jwt.util";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["JWT_TOKEN"];
  if (!token) {
    return res.status(401).json({
      message: "Unhatorized token",
    });
  }

  const decodedToken = decodeAndVerifyJWT(token);

  if (decodedToken) {
    User.findById(decodedToken, (err: any, user: UserInterface) => {
      if (err) {
        return res.status(401).json({
          message: "Unhatorized token",
        });
      }

      if (!user) {
        return res.status(401).json({
          message: "Unhatorized token",
        });
      }

      return next();
    });
  }
};
