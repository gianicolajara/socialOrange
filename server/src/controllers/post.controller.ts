import { NextFunction, Request, Response } from "express";
import { ImageInterface, PostInterface } from "interfaces";
import { Types } from "mongoose";
import Image from "../model/image.model";
import { URL_IMAGES_FOLDER_PUBLIC } from "../config";
import Post from "../model/post.model";
import fs from "fs";

export const getAllPosts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Post.find({})
    .populate(["creator", "photo"])
    .exec((err: any, posts: Array<PostInterface>) => {
      if (err) return next(err);

      return res.status(200).json({
        message: "posts found",
        posts,
      });
    });
};

export const getOnePost = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  Post.findOne({ id }, (err: any, post: PostInterface) => {
    if (err) return next(err);

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

export const deletePost = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  Post.findByIdAndDelete(id, (err: any, post: PostInterface) => {
    if (err) return next(err);

    if (post.photo !== null) {
      Image.findByIdAndDelete(post.photo, (err: any, image: ImageInterface) => {
        if (err) return next(err);

        fs.unlink(
          `${URL_IMAGES_FOLDER_PUBLIC}/${image.id}.${image.extension}`,
          (err) => {
            if (err) return next(err);

            return res
              .status(200)
              .json({ message: "post deleted successfully", id });
          }
        );
      });
    } else {
      return res.status(200).json({ message: "post deleted successfully", id });
    }
  });
};

export const updatePost = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { post, photo } = req.body;

  Post.findByIdAndUpdate(
    id,
    {
      post,
      photo,
    },
    { new: true }
  )
    .populate(["creator", "photo"])
    .exec((err, updatedPost) => {
      if (err) return next(err);

      return res.status(200).json({
        message: "post updated successfully",
        post: updatedPost,
      });
    });
};

export const createPost = (req: Request, res: Response, next: NextFunction) => {
  const { post, creator, photo } = req.body;

  const newPost = new Post({
    post,
    creator: new Types.ObjectId(creator),
    photo: new Types.ObjectId(photo),
  });

  newPost
    .save()
    .then((postSaved) => {
      postSaved.populate(["creator", "photo"]).then((postSavedPopulated) => {
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
