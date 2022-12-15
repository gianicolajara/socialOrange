import { SessionOptions } from "express-session";
import MongoStore from "connect-mongo";
import { v4 as uuidv4 } from "uuid";

export const PORT = process.env.PORT || 5001;
export const URL_MONGO = "mongodb://0.0.0.0:27017/socialOrange";
export const JWT_SECRET = process.env.JWT_SECRET || "";

export const SESSION_CONFIG: SessionOptions = {
  genid: (_) => {
    return uuidv4();
  },
  secret: "test-secret",
  resave: false,
  saveUninitialized: false,
  unset: "destroy",
  proxy: true,
  cookie: {
    secure: false,
    domain: "localhost",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: "/",
  },
  store: MongoStore.create({
    crypto: {
      secret: "squirrel",
    },
    mongoUrl: "mongodb://0.0.0.0:27017/socialOrange",
    autoRemove: "interval",
    autoRemoveInterval: 10,
  }),
};
