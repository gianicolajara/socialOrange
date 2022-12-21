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
import userRouter from "./routes/user.routes";
import { createServer } from "http";
import { createSocket } from "./utils/socket.util";

dotenv.config();

const app = express();
const server = createServer(app);
const io = createSocket(server);

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
app.use("/user", userRouter);
app.use(notFoundRouter);

//handle errors
app.use(handleErrors);

io.on("connection", (socket) => {
  console.log("a user connected ", socket.id);
});

export default server;

export { io };
