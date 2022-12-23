import { Router } from "express";
import { handleErrorsValidators } from "../middlewares/validatorHandleError";
import {
  getListOfUserByNameValidator,
  getUserByNameValidator,
} from "../validators/user.validator";
import {
  getListOfUserByName,
  getUserByName,
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/verifyToken";

const userRouter = Router();

userRouter.get(
  "/:name",
  [...getUserByNameValidator, handleErrorsValidators, verifyToken],
  getUserByName
);

userRouter.post(
  "/",
  [...getListOfUserByNameValidator, handleErrorsValidators, verifyToken],
  getListOfUserByName
);

export default userRouter;
