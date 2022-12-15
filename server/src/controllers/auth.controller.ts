import { NextFunction, Request, Response } from "express";
import { UserInterface } from "interfaces";
import { decodeAndVerifyJWT, generateJWT } from "../utils/jwt.util";
import User from "../model/user.model";

export const registerUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, firstName, lastName } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    password: User.hashPassword(password),
    username: username.toLowerCase(),
  });

  newUser
    .save()
    .then((data) => {
      return res.status(200).json({
        message: "User created successfully",
        user: data,
      });
    })
    .catch(next);
};

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  User.findOne(
    {
      username: username.toLowerCase(),
    },
    (err: any, user: UserInterface) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({
          message: "Username or password incorrect",
        });
      }

      const passwordIsValid = User.validatePassword(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).json({
          message: "Username or password incorrect",
        });
      }

      req.session.isLogin = true;
      req.session.user = user.id;

      const token = generateJWT(user.id);

      res.cookie("JWT_TOKEN", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        domain: "localhost",
      });

      return res.status(200).json({
        user,
        token: token,
      });
    }
  );
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.cookie("JWT_TOKEN", "", {
      maxAge: 0,
    });

    res.cookie("connect.sid", "", {
      maxAge: 0,
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  });
};

export const recoveredLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["JWT_TOKEN"];
  const session = req.cookies["connect.sid"];

  const decodedToken = decodeAndVerifyJWT(token);

  req.sessionID = session;

  req.session.reload((err) => {
    if (err) {
      return res.status(401).json({
        message: "Unnautorized session",
      });
    }
  });

  User.findById(decodedToken, (err: any, user: UserInterface) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        message: "Unnautorized session",
      });
    }

    return res.status(200).json({
      message: "Authorized session",
      token: token,
      user,
    });
  });
};
