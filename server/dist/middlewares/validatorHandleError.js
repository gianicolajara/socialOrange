"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorsValidators = void 0;
const express_validator_1 = require("express-validator");
const handleErrorsValidators = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.status(400).json({
            type: "ERROR_VALIDATOR",
            errors: errors.mapped(),
        });
    }
    return next();
};
exports.handleErrorsValidators = handleErrorsValidators;
//# sourceMappingURL=validatorHandleError.js.map