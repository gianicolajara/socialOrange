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

const postRouter = Router();

postRouter.get(
  "/",
  [...getAllPostsValidtor, handleErrorsValidators],
  getAllPosts
);
postRouter.get(
  "/:id",
  [...getOnePostValidator, handleErrorsValidators],
  getOnePost
);
postRouter.delete(
  "/:id",
  [...deletePostValidator, handleErrorsValidators],
  deletePost
);
postRouter.post(
  "/",
  [...createPostValidator, handleErrorsValidators],
  createPost
);

postRouter.put(
  "/:id",
  [...updatePostValidator, handleErrorsValidators],
  updatePost
);

postRouter.put(
  "/like/:id",
  [...likePostValidator, handleErrorsValidators],
  likePost
);

export default postRouter;
