"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const user_model_1 = __importDefault(require("..//model/user.model"));
const jwt_util_1 = require("../utils/jwt.util");
const verifyToken = (req, res, next) => {
    const token = req.cookies["JWT_TOKEN"];
    if (!token) {
        return res.status(401).json({
            message: "Unhatorized token",
        });
    }
    const decodedToken = (0, jwt_util_1.decodeAndVerifyJWT)(token);
    if (decodedToken) {
        user_model_1.default.findById(decodedToken, (err, user) => {
            if (err) {
                return res.status(401).json({
                    message: "Unhatorized token",
                });
            }
            if (!user) {
                return res.status(401).json({
                    message: "Unhatorized token",
                });
            }
            return next();
        });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map