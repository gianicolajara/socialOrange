import { NextFunction, Request, Response } from "express";
import User from "../model/user.model";

export const getUserByName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.params;

  User.findOne(
    {
      username: name,
    },
    {}
  )
    .populate({
      path: "posts",
      model: "Post",
      populate: [
        {
          path: "creator",
          model: "User",
        },
        {
          path: "photo",
          model: "Image",
        },
      ],
    })
    .exec((err, doc) => {
      if (err) return next(err);

      if (doc) {
        return res.status(200).json({
          message: "User found",
          user: doc,
        });
      }

      return res.status(404).json({
        message: "User dont found",
      });
    });
};
