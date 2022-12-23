import { PostInterface } from "./post";

export interface UserForm {
  username: string;
  password: string;
}

export interface UserInterface {
  id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
  updatedAt?: string;
  posts?: Array<PostInterface>;
}

export interface AxiosResponseLoginUser {
  user: UserInterface;
  token: string;
}

export interface AxiosResponseRecoveryUser {
  user: UserInterface;
  token: string;
  message: string;
}

export interface AxiosResponseLogout {
  message: string;
}

export interface AxiosResponseRegisterUser {
  message: string;
  user: UserInterface;
}

export interface AxiosResponseGetListOfUsersByName {
  users: Array<UserInterface>;
}
