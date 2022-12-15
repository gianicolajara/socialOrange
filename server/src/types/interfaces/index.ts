import { Model, Types } from "mongoose";

//propiedades
export interface UserInterface {
  id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostInterface {
  id?: Types.ObjectId;
  post: string;
  creator: Types.ObjectId;
  photo?: string;
  commentaries?: Array<any>;
  createdAt: string;
  updatedAt: string;
}

//statics
export interface UserModel extends Model<UserInterface> {
  hashPassword(password: string): string;
  validatePassword(password: string, hash: string): boolean;
}
