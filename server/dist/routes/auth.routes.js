"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validator_1 = require("../validators/auth.validator");
const auth_controller_1 = require("../controllers/auth.controller");
const validatorHandleError_1 = require("../middlewares/validatorHandleError");
const verifyToken_1 = require("../middlewares/verifyToken");
const authRouter = (0, express_1.Router)();
authRouter.post("/register", [...auth_validator_1.registerValidator, validatorHandleError_1.handleErrorsValidators], auth_controller_1.registerUser);
authRouter.post("/login", [...auth_validator_1.loginValidator, validatorHandleError_1.handleErrorsValidators], auth_controller_1.loginUser);
authRouter.post("/logout", [...auth_validator_1.validateLogoutValidators, validatorHandleError_1.handleErrorsValidators, verifyToken_1.verifyToken], auth_controller_1.logout);
authRouter.post("/verifyLogin", [...auth_validator_1.validateLoginValidators, validatorHandleError_1.handleErrorsValidators, verifyToken_1.verifyToken], auth_controller_1.recoveredLogin);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map