"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.updatePost = exports.deletePost = exports.getOnePost = exports.getAllPosts = void 0;
const mongoose_1 = require("mongoose");
const image_model_1 = __importDefault(require("../model/image.model"));
const config_1 = require("../config");
const post_model_1 = __importDefault(require("../model/post.model"));
const user_model_1 = __importDefault(require("../model/user.model"));
const fs_1 = __importDefault(require("fs"));
const getAllPosts = (req, res, next) => {
    post_model_1.default.find({})
        .populate(["creator", "photo"])
        .exec((err, posts) => {
        if (err)
            return next(err);
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
    post_model_1.default.findByIdAndDelete(id, (err, post) => {
        if (err)
            return next(err);
        if (post.photo) {
            image_model_1.default.findByIdAndDelete(post.photo, (err, image) => {
                if (err)
                    return next(err);
                fs_1.default.unlink(`${config_1.URL_IMAGES_FOLDER_PUBLIC}/${image.id}.${image.extension}`, (err) => {
                    if (err)
                        return next(err);
                    return res
                        .status(200)
                        .json({ message: "post deleted successfully", id });
                });
            });
        }
        else {
            return res.status(200).json({ message: "post deleted successfully", id });
        }
    });
};
exports.deletePost = deletePost;
const updatePost = (req, res, next) => {
    const { id } = req.params;
    const { post, photo } = req.body;
    post_model_1.default.findByIdAndUpdate(id, {
        post,
        photo,
    }, { new: true })
        .populate(["creator", "photo"])
        .exec((err, updatedPost) => {
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
    let newPostBody = {
        post,
        creator: new mongoose_1.Types.ObjectId(creator),
    };
    if (photo) {
        newPostBody = Object.assign(Object.assign({}, newPostBody), { photo: new mongoose_1.Types.ObjectId(photo) });
    }
    const newPost = new post_model_1.default(newPostBody);
    newPost
        .save()
        .then((postSaved) => {
        postSaved.populate(["creator", "photo"]).then((postSavedPopulated) => {
            user_model_1.default.findByIdAndUpdate(creator, {
                $push: {
                    posts: postSaved,
                },
            }, (err) => {
                if (err)
                    return next(err);
                return res.status(200).json({
                    message: "Post saved successfully",
                    post: postSavedPopulated,
                });
            });
        });
    })
        .catch((err) => {
        return next(err);
    });
};
exports.createPost = createPost;
//# sourceMappingURL=post.controller.js.map