import { NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import { BASE_URL } from "../config";

export const createPhoto = (
  pathUrl = "",
  file: UploadedFile,
  next: NextFunction
) => {
  if (pathUrl === "" || !file.data || !file.name)
    throw new Error("Debe ingresar un path valido o un archivo valido");

  if (!fs.existsSync(`${BASE_URL}/public/images`)) {
    fs.mkdirSync(`${BASE_URL}/public/images`, { recursive: true });
  }

  fs.appendFile(pathUrl, file.data, (err) => {
    if (err) {
      console.log("el error es aqui");
      return next(err);
    }
  });
};
