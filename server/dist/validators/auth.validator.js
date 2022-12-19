"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogoutValidators = exports.validateLoginValidators = exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.body)("username")
        .isString()
        .withMessage("Username must be a string")
        .isLength({ min: 3, max: 25 })
        .withMessage("Username must be at least 3 characters long and at least 25 characters long"),
    (0, express_validator_1.body)("firstName")
        .isString()
        .withMessage("Firstname must be a string")
        .isLength({ min: 3, max: 25 })
        .withMessage("Firstname must be at least 3 characters long and at least 25 characters long"),
    (0, express_validator_1.body)("lastName")
        .isString()
        .withMessage("Lastname must be a string")
        .isLength({ min: 3, max: 25 })
        .withMessage("lastName must be at least 3 characters long and at least 25 characters long"),
    (0, express_validator_1.body)("password")
        .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1,
    })
        .withMessage("password needs 8 characters minimum, 1 lower character, 1 number, 1 uppercase and 1 symbol"),
];
exports.loginValidator = [
    (0, express_validator_1.body)("username")
        .isString()
        .withMessage("Username must be a string")
        .isLength({ min: 3, max: 25 })
        .withMessage("Username must be at least 3 characters long and at least 25 characters long"),
    (0, express_validator_1.body)("password")
        .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1,
    })
        .withMessage("password needs 8 characters minimum, 1 lower character, 1 number, 1 uppercase and 1 symbol"),
];
exports.validateLoginValidators = [
    (0, express_validator_1.cookie)("JWT_TOKEN").isJWT().withMessage("jwt is required"),
    (0, express_validator_1.cookie)("connect.sid")
        .isString()
        .isLength({ min: 3 })
        .withMessage("session id is required"),
];
exports.validateLogoutValidators = [...exports.validateLoginValidators];
//# sourceMappingURL=auth.validator.js.map