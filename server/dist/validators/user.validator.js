"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByNameValidator = void 0;
const express_validator_1 = require("express-validator");
exports.getUserByNameValidator = [
    (0, express_validator_1.param)("name")
        .exists({ checkFalsy: true })
        .withMessage("Field name is required"),
    (0, express_validator_1.cookie)("JWT_TOKEN").isJWT().withMessage("token is required"),
];
//# sourceMappingURL=user.validator.js.map