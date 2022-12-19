"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validatorHandleError_1 = require("../middlewares/validatorHandleError");
const post_validator_1 = require("../validators/post.validator");
const post_controller_1 = require("../controllers/post.controller");
const postRouter = (0, express_1.default)();
postRouter.get("/", [...post_validator_1.getAllPostsValidtor, validatorHandleError_1.handleErrorsValidators], post_controller_1.getAllPosts);
postRouter.get("/:id", [...post_validator_1.getOnePostValidator, validatorHandleError_1.handleErrorsValidators], post_controller_1.getOnePost);
postRouter.delete("/:id", [...post_validator_1.deletePostValidator, validatorHandleError_1.handleErrorsValidators], post_controller_1.deletePost);
postRouter.post("/", [...post_validator_1.createPostValidator, validatorHandleError_1.handleErrorsValidators], post_controller_1.createPost);
postRouter.put("/:id", [...post_validator_1.updatePostValidator, validatorHandleError_1.handleErrorsValidators], post_controller_1.updatePost);
exports.default = postRouter;
//# sourceMappingURL=post.routes.js.map