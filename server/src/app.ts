import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import notFoundRouter from "./routes/notFound.routes";
import authRouter from "./routes/auth.routes";
import { handleErrors } from "./middlewares/handleErrors";
import { mongooseConnection } from "./mongo/connect";
import { SESSION_CONFIG } from "./config";
import postRouter from "./routes/post.routes";
import fileUpload from "express-fileupload";
import imageRouter from "./routes/images.routes";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

//connect db mongoose
mongooseConnection();

//middlewares
app.use("/public", express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(SESSION_CONFIG));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  fileUpload({
    createParentPath: true,
  })
);

//routes
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/image", imageRouter);
app.use(notFoundRouter);

//handle errors
app.use(handleErrors);

export default app;
