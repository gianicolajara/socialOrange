"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const handleErrors = (err, req, res, next) => {
    console.error(err);
    if (err) {
        return res.status(400).json({
            message: err.message || "Somethign went wrong",
        });
    }
    next();
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=handleErrors.js.map