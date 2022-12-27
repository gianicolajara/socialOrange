import Router from "express";
import { handleErrorsValidators } from "../middlewares/validatorHandleError";
import {
  createPostValidator,
  deletePostValidator,
  getAllPostsValidtor,
  getOnePostValidator,
  likePostValidator,
  updatePostValidator,
} from "../validators/post.validator";
import {
  createPost,
  deletePost,
  getAllPosts,
  getOnePost,
  likePost,
  updatePost,
} from "../controllers/post.controller";
import { verifyToken } from "../middlewares/verifyToken";

const postRouter = Router();

postRouter.get(
  "/",
  [...getAllPostsValidtor, handleErrorsValidators, verifyToken],
  getAllPosts
);
postRouter.get(
  "/:id",
  [...getOnePostValidator, handleErrorsValidators, verifyToken],
  getOnePost
);
postRouter.delete(
  "/:id",
  [...deletePostValidator, handleErrorsValidators, verifyToken],
  deletePost
);
postRouter.post(
  "/",
  [...createPostValidator, handleErrorsValidators, verifyToken],
  createPost
);

postRouter.put(
  "/:id",
  [...updatePostValidator, handleErrorsValidators, verifyToken],
  updatePost
);

postRouter.put(
  "/like/:id",
  [...likePostValidator, handleErrorsValidators, verifyToken],
  likePost
);

export default postRouter;
