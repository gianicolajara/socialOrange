import { OptionsButtonItemProps } from "../../components/OptionsButton/types";
import { UserInterface } from "./user";

export interface PostInterface {
  id?: string;
  post: string;
  creator: UserInterface;
  photo?: {
    name: string;
    extension: string;
    relativePathUrl: string;
    id: string;
  };
  commentaries?: Array<any>;
  createdAt: string;
  updatedAt: string;
  ownerPost?: boolean;
  ownerOptions?: (id: string) => Array<OptionsButtonItemProps>;
}

export interface PostFormInterface {
  post: string;
  creator: string;
  photo?: string;
  commentaries?: Array<any>;
}

export interface initialPhotoForm {
  photoFile: File | undefined;
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

export interface ResponseAxiosUpdatePost {
  message: string;
  post: PostInterface;
}

export interface ResponseAxiosCreateImage {
  imageRes: {
    extension: string;
    id: string;
    name: string;
    relativePathUrl: string;
  };
  message: string;
}
