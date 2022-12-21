import { Router } from "express";
import { handleErrorsValidators } from "../middlewares/validatorHandleError";
import { getUserByNameValidator } from "../validators/user.validator";
import { getUserByName } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/verifyToken";

const userRouter = Router();

userRouter.get(
  "/:name",
  [...getUserByNameValidator, handleErrorsValidators, verifyToken],
  getUserByName
);

export default userRouter;
