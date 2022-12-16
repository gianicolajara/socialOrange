import { UserInterface } from "./user";

export interface PostInterface {
  id?: string;
  post: string;
  creator: UserInterface;
  photo?: string;
  commentaries?: Array<any>;
  createdAt: string;
  updatedAt: string;
}

export interface PostFormInterface {
  post: string;
  creator: string;
  photo?: string;
  commentaries?: Array<any>;
}

export type PostFormType = PostFormInterface | null | undefined;

export interface ResponseAxiosCreatePost {
  message: string;
  post: PostInterface;
}

export interface ResponseAxiosGetAllPosts {
  message: string;
  posts: Array<PostInterface>;
}

export interface ResponseAxiosDeletePost {
 message: string; 
 id: string;
}