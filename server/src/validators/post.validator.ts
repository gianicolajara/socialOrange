import { body, param, cookie } from "express-validator";

export const createPostValidator = [
  body("post")
    .isString()
    .withMessage("post needs to be a string")
    .isLength({
      min: 1,
      max: 255,
    })
    .withMessage("post needs minimum 1 caracter and maximum 255 caracter")
    .optional({ nullable: true }),
  body("creator")
    .isMongoId()
    .withMessage("creator needs to be a valid mongo id"),
  body("photo")
    .isString()
    .withMessage("photo needs to be a valid string")
    .optional({ nullable: true }),
  cookie("JWT_TOKEN").isJWT().withMessage("token is required"),
];

export const deletePostValidator = [
  param("id").isMongoId().withMessage("id is required"),
  cookie("JWT_TOKEN").isJWT().withMessage("token is required"),
];

export const updatePostValidator = [
  param("id").isMongoId().withMessage("id is required"),
  cookie("JWT_TOKEN").isJWT().withMessage("token is required"),
  body("post")
    .isString()
    .withMessage("post needs to be a string")
    .isLength({
      min: 1,
      max: 255,
    })
    .withMessage("post needs minimum 1 caracter and maximum 255 caracter")
    .exists({ checkFalsy: false }),
  body("photo")
    .isString()
    .withMessage("photo needs to be a valid string")
    .optional({ nullable: true }),
];

export const getAllPostsValidtor = [
  cookie("JWT_TOKEN").isJWT().withMessage("token is required"),
];

export const getOnePostValidator = [
  param("id").isMongoId().withMessage("id is required"),
  cookie("JWT_TOKEN").isJWT().withMessage("token is required"),
];
