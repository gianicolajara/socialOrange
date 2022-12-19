"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoveredLogin = exports.logout = exports.loginUser = exports.registerUser = void 0;
const jwt_util_1 = require("../utils/jwt.util");
const user_model_1 = __importDefault(require("../model/user.model"));
const registerUser = (req, res, next) => {
    const { username, password, firstName, lastName } = req.body;
    const newUser = new user_model_1.default({
        firstName,
        lastName,
        password: user_model_1.default.hashPassword(password),
        username: username.toLowerCase(),
    });
    newUser
        .save()
        .then((data) => {
        return res.status(200).json({
            message: "User created successfully",
            user: data,
        });
    })
        .catch(next);
};
exports.registerUser = registerUser;
const loginUser = (req, res, next) => {
    const { username, password } = req.body;
    user_model_1.default.findOne({
        username: username.toLowerCase(),
    }, (err, user) => {
        if (err)
            return next(err);
        if (!user) {
            return res.status(401).json({
                message: "Username or password incorrect",
            });
        }
        const passwordIsValid = user_model_1.default.validatePassword(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({
                message: "Username or password incorrect",
            });
        }
        req.session.isLogin = true;
        req.session.user = user.id;
        const token = (0, jwt_util_1.generateJWT)(user.id);
        res.cookie("JWT_TOKEN", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            domain: "localhost",
        });
        return res.status(200).json({
            user,
            token: token,
        });
    });
};
exports.loginUser = loginUser;
const logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err)
            return next(err);
        res.cookie("JWT_TOKEN", "", {
            maxAge: 0,
        });
        res.cookie("connect.sid", "", {
            maxAge: 0,
        });
        return res.status(200).json({
            message: "Logout successful",
        });
    });
};
exports.logout = logout;
const recoveredLogin = (req, res, next) => {
    const token = req.cookies["JWT_TOKEN"];
    const session = req.cookies["connect.sid"];
    const decodedToken = (0, jwt_util_1.decodeAndVerifyJWT)(token);
    req.sessionID = session;
    req.session.reload((err) => {
        if (err) {
            return res.status(401).json({
                message: "Unnautorized session",
            });
        }
    });
    user_model_1.default.findById(decodedToken, (err, user) => {
        if (err)
            return next(err);
        if (!user) {
            return res.status(401).json({
                message: "Unnautorized session",
            });
        }
        return res.status(200).json({
            message: "Authorized session",
            token: token,
            user,
        });
    });
};
exports.recoveredLogin = recoveredLogin;
//# sourceMappingURL=auth.controller.js.map