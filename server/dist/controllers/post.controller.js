"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.updatePost = exports.deletePost = exports.getOnePost = exports.getAllPosts = void 0;
const mongoose_1 = require("mongoose");
const post_model_1 = __importDefault(require("../model/post.model"));
const getAllPosts = (req, res, next) => {
    post_model_1.default.find({})
        .populate("creator")
        .exec((err, posts) => {
        if (err)
            return next(err);
        /* if (!posts.length) {
        return res.status(404).json({
          message: "No posts found",
        });
      } */
        return res.status(200).json({
            message: "posts found",
            posts,
        });
    });
};
exports.getAllPosts = getAllPosts;
const getOnePost = (req, res, next) => {
    const { id } = req.params;
    post_model_1.default.findOne({ id }, (err, post) => {
        if (err)
            return next(err);
        if (!post) {
            return res.status(404).json({
                message: "No post found",
            });
        }
        return res.status(200).json({
            message: "post found",
            post,
        });
    });
};
exports.getOnePost = getOnePost;
const deletePost = (req, res, next) => {
    const { id } = req.params;
    post_model_1.default.findByIdAndDelete(id, (err) => {
        if (err)
            return next(err);
        return res.status(200).json({ message: "post deleted successfully", id });
    });
};
exports.deletePost = deletePost;
const updatePost = (req, res, next) => {
    const { id } = req.params;
    const { post, photo } = req.body;
    post_model_1.default.findByIdAndUpdate(id, {
        post,
        photo,
    }, { new: true }, (err, updatedPost) => {
        if (err)
            return next(err);
        return res.status(200).json({
            message: "post updated successfully",
            post: updatedPost,
        });
    });
};
exports.updatePost = updatePost;
const createPost = (req, res, next) => {
    const { post, creator, photo } = req.body;
    const newPost = new post_model_1.default({
        post,
        creator: new mongoose_1.Types.ObjectId(creator),
        photo,
    });
    newPost
        .save()
        .then((postSaved) => {
        postSaved.populate("creator").then((postSavedPopulated) => {
            return res.status(200).json({
                message: "Post saved successfully",
                post: postSavedPopulated,
            });
        });
    })
        .catch((err) => {
        return next(err);
    });
};
exports.createPost = createPost;
//# sourceMappingURL=post.controller.js.map