"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListOfUserByName = exports.getUserByName = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const getUserByName = (req, res, next) => {
    const { name } = req.params;
    user_model_1.default.findOne({
        username: name,
    }, {})
        .populate({
        path: "posts",
        model: "Post",
        populate: [
            {
                path: "creator",
                model: "User",
            },
            {
                path: "photo",
                model: "Image",
            },
        ],
    })
        .exec((err, doc) => {
        if (err)
            return next(err);
        if (doc) {
            return res.status(200).json({
                message: "User found",
                user: doc,
            });
        }
        return res.status(404).json({
            message: "User dont found",
        });
    });
};
exports.getUserByName = getUserByName;
const getListOfUserByName = (req, res, next) => {
    const { name } = req.body;
    user_model_1.default.find({ firstName: { $regex: name, $options: "i" } }, {})
        .limit(5)
        .exec((err, doc) => {
        if (err)
            return next(err);
        return res.status(200).json({
            users: doc,
        });
    });
};
exports.getListOfUserByName = getListOfUserByName;
//# sourceMappingURL=user.controller.js.map