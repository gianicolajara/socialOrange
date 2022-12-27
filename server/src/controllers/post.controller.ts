import { NextFunction, Request, Response } from "express";
import { ImageInterface, PostInterface } from "interfaces";
import { URL_IMAGES_FOLDER_PUBLIC } from "../config";
import { Types } from "mongoose";
import Image from "../model/image.model";
import Post from "../model/post.model";
import User from "../model/user.model";
import fs from "fs";

export const getAllPosts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findById(req.session.user, {}, (err, userDoc) => {
    if (err) return next(err);

    Post.aggregate(
      [
        {
          $addFields: {
            likeByUser: {
              $cond: [
                {
                  $in: [new Types.ObjectId(req.session.user), "$ratings"],
                },
                true,
                false,
              ],
            },
          },
        },
      ],
      {},
      (err, result) => {
        if (err) return next(err);

        const resultMangosta = result.map((item) => new Post(item).toJSON());

        Post.populate(resultMangosta, { path: "creator photo" }, (err, doc) => {
          if (err) return next(err);

          return res.status(200).json({
            message: "posts found",
            posts: doc,
          });
        });
      }
    );
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

    if (post.photo) {
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

  let newPostBody: PostInterface = {
    post,
    creator: new Types.ObjectId(creator),
  };

  if (photo) {
    newPostBody = { ...newPostBody, photo: new Types.ObjectId(photo) };
  }

  const newPost = new Post(newPostBody);

  newPost
    .save()
    .then((postSaved) => {
      postSaved.populate(["creator", "photo"]).then((postSavedPopulated) => {
        User.findByIdAndUpdate(
          creator,
          {
            $push: {
              posts: postSaved,
            },
          },
          (err) => {
            if (err) return next(err);
            return res.status(200).json({
              message: "Post saved successfully",
              post: postSavedPopulated,
            });
          }
        );
      });
    })
    .catch((err) => {
      return next(err);
    });
};

export const likePost = (req: Request, res: Response, next: NextFunction) => {
  //post/like -> method post
  const { id } = req.params;

  Post.findById(id)
    .where("ratings")
    .in([req.session.user])
    .exec((errPost, docPost) => {
      if (errPost) return next(errPost);

      if (docPost === null) {
        Post.findByIdAndUpdate(
          id,
          {
            $push: {
              ratings: new Types.ObjectId(req.session.user),
            },
            $inc: {
              likes: 1,
            },
            $set: {
              likeByUser: true,
            },
          },
          {},
          (err, doc) => {
            if (err) return next(err);
          }
        );
      } else {
        docPost.updateOne(
          {
            $pull: {
              ratings: new Types.ObjectId(req.session.user),
            },
            $inc: {
              likes: -1,
            },
            $set: {
              likeByUser: false,
            },
          },
          {},
          (err, doc) => {
            if (err) return next(err);
          }
        );
      }

      return res.status(200).json({
        message: "liked successfully",
      });
    });
};
