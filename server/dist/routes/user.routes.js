"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validatorHandleError_1 = require("../middlewares/validatorHandleError");
const user_validator_1 = require("../validators/user.validator");
const user_controller_1 = require("../controllers/user.controller");
const verifyToken_1 = require("../middlewares/verifyToken");
const userRouter = (0, express_1.Router)();
userRouter.get("/:name", [...user_validator_1.getUserByNameValidator, validatorHandleError_1.handleErrorsValidators, verifyToken_1.verifyToken], user_controller_1.getUserByName);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map