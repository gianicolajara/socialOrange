import Router from "express";
import { handleErrorsValidators } from "../middlewares/validatorHandleError";
import {
  createPostValidator,
  deletePostValidator,
  getAllPostsValidtor,
  getOnePostValidator,
} from "../validators/post.validator";
import {
  createPost,
  deletePost,
  getAllPosts,
  getOnePost,
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

export default postRouter;
