"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnePostValidator = exports.getAllPostsValidtor = exports.updatePostValidator = exports.deletePostValidator = exports.createPostValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createPostValidator = [
    (0, express_validator_1.body)("post")
        .isString()
        .withMessage("post needs to be a string")
        .isLength({
        min: 1,
        max: 255,
    })
        .withMessage("post needs minimum 1 caracter and maximum 255 caracter")
        .optional({ nullable: true }),
    (0, express_validator_1.body)("creator")
        .isMongoId()
        .withMessage("creator needs to be a valid mongo id"),
    (0, express_validator_1.body)("photo")
        .isString()
        .withMessage("photo needs to be a valid string")
        .optional({ nullable: true }),
    (0, express_validator_1.cookie)("JWT_TOKEN").isJWT().withMessage("token is required"),
];
exports.deletePostValidator = [
    (0, express_validator_1.param)("id").isMongoId().withMessage("id is required"),
    (0, express_validator_1.cookie)("JWT_TOKEN").isJWT().withMessage("token is required"),
];
exports.updatePostValidator = [
    (0, express_validator_1.param)("id").isMongoId().withMessage("id is required"),
    (0, express_validator_1.cookie)("JWT_TOKEN").isJWT().withMessage("token is required"),
    (0, express_validator_1.body)("post")
        .isString()
        .withMessage("post needs to be a string")
        .isLength({
        min: 1,
        max: 255,
    })
        .withMessage("post needs minimum 1 caracter and maximum 255 caracter")
        .exists({ checkFalsy: false }),
    (0, express_validator_1.body)("photo")
        .isString()
        .withMessage("photo needs to be a valid string")
        .optional({ nullable: true }),
];
exports.getAllPostsValidtor = [
    (0, express_validator_1.cookie)("JWT_TOKEN").isJWT().withMessage("token is required"),
];
exports.getOnePostValidator = [
    (0, express_validator_1.param)("id").isMongoId().withMessage("id is required"),
    (0, express_validator_1.cookie)("JWT_TOKEN").isJWT().withMessage("token is required"),
];
//# sourceMappingURL=post.validator.js.map