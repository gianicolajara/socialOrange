import { UploadedFile } from "express-fileupload";
import fs from "fs";

export const createPhoto = (pathUrl = "", file: UploadedFile) => {
  if (pathUrl === "" || !file.data || !file.name)
    throw new Error("Debe ingresar un path valido o un archivo valido");

  fs.appendFile(pathUrl, file.data, (err) => {
    if (err) throw err;
  });
};
