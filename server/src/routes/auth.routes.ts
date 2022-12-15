import { Router } from "express";
import {
  loginValidator,
  registerValidator,
  validateLoginValidators,
  validateLogoutValidators,
} from "../validators/auth.validator";
import {
  loginUser,
  logout,
  registerUser,
  recoveredLogin,
} from "../controllers/auth.controller";
import { handleErrorsValidators } from "../middlewares/validatorHandleError";
import { verifyToken } from "../middlewares/verifyToken";

const authRouter = Router();

authRouter.post(
  "/register",
  [...registerValidator, handleErrorsValidators],
  registerUser
);
authRouter.post(
  "/login",
  [...loginValidator, handleErrorsValidators],
  loginUser
);
authRouter.post(
  "/logout",
  [...validateLogoutValidators, handleErrorsValidators, verifyToken],
  logout
);
authRouter.post(
  "/verifyLogin",
  [...validateLoginValidators, handleErrorsValidators, verifyToken],
  recoveredLogin
);

export default authRouter;
