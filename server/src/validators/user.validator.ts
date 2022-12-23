import { body, cookie, param } from "express-validator";

export const getUserByNameValidator = [
  param("name")
    .exists({ checkFalsy: true })
    .withMessage("Field name is required"),
  cookie("JWT_TOKEN").isJWT().withMessage("token is required"),
];

export const getListOfUserByNameValidator = [
  body("name").isString().withMessage("Field name must be a string"),
  cookie("JWT_TOKEN").isJWT().withMessage("token is required"),
];
