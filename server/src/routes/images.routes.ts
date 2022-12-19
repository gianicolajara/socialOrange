import { Router } from "express";
import { createImage, deleteImageById } from "../controllers/images.controller";

const imageRouter = Router();

imageRouter.post("/", createImage);
imageRouter.delete("/:id", deleteImageById);

export default imageRouter;
