import mongoose from "mongoose";
import { URL_MONGO } from "../config";

export const mongooseConnection = (): void => {
  mongoose
    .connect(URL_MONGO)
    .then(() => {
      console.log("connectado correctamente a mongoose");
    })
    .catch((err) => {
      console.error(err);
    });

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error("error en mongoose", error);
  });
};
