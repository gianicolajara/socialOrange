import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { BASE_URL } from "../config";
import { createPhoto } from "../utils/files.util";
import Image from "../model/image.model";
import fs from "fs";

export const createImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files?.files as UploadedFile;

  if (!req.files && !files)
    return res.status(400).json({
      message: "you must send a picture",
    });

  const extension = files.name.split(".")[1];

  const newImage = new Image({
    name: files.name,
    extension,
  });

  newImage
    .save()
    .then((imageRes) => {
      createPhoto(
        `${BASE_URL}/public/images/${imageRes.id}.${extension}`,
        files
      );

      return res.status(200).json({
        message: "image saved successfully",
        imageRes,
      });
    })
    .catch((err) => {
      return next(err);
    });
};

export const deleteImageById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  Image.findByIdAndDelete(id, {}, (err, doc) => {
    if (err) return next(err);

    if (!doc) return res.status(404);

    fs.unlink(`${BASE_URL}/public/images/${doc.id}.${doc.extension}`, (err) => {
      if (err) return next(err);
    });

    return res.status(200).json({
      message: "image delete successfully",
    });
  });
};
