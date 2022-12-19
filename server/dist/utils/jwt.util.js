"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeAndVerifyJWT = exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
// genera un token firmado a partir de cualquier
// tipo de data
const generateJWT = (data) => {
    const token = jsonwebtoken_1.default.sign(data, config_1.JWT_SECRET);
    return token;
};
exports.generateJWT = generateJWT;
// verifica la firma de token y ademas
// devuelve su valor
const decodeAndVerifyJWT = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
};
exports.decodeAndVerifyJWT = decodeAndVerifyJWT;
//# sourceMappingURL=jwt.util.js.map