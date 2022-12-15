import "express-session";
import mongoose from "mongoose";
import { UserInterface } from "../../interfaces/index";

declare module "express-session" {
  interface SessionData {
    isLogin?: boolean;
    user?: string; //id mongo user
  }
}
