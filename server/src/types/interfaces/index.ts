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
  posts?: Array<PostInterface>;
}

export interface PostInterface {
  id?: Types.ObjectId;
  post: string;
  creator: Types.ObjectId;
  photo?: Types.ObjectId;
  commentaries?: Array<any>;
  createdAt?: string;
  updatedAt?: string;
}

//statics
export interface UserModel extends Model<UserInterface> {
  hashPassword(password: string): string;
  validatePassword(password: string, hash: string): boolean;
}

export interface ImageInterface {
  id: Types.ObjectId;
  name: string;
  extension: string;
  relativePathUrl: string;
}
