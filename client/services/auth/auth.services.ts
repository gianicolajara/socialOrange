import { AxiosResponse } from "axios";
import {
  serverAuthLoginUrl,
  serverAuthLogoutUrl,
  serverAuthRegisterUrl,
  serverAuthVerifyLoginUrl,
} from "../../config/urlBackend";
import { postFetch } from "../../utils/fetching";

export const loginUserService = ({
  username = "",
  password = "",
}): Promise<AxiosResponse> => {
  return postFetch({
    pathUrl: serverAuthLoginUrl,
    withCredentials: true,
    data: { username, password },
  });
};

export const recoveredLoginService = (): Promise<AxiosResponse> => {
  return postFetch({
    pathUrl: serverAuthVerifyLoginUrl,
    withCredentials: true,
  });
};

export const logoutService = (): Promise<AxiosResponse> => {
  return postFetch({
    pathUrl: serverAuthLogoutUrl,
    withCredentials: true,
  });
};

export const registerUserService = ({
  username = "",
  password = "",
  firstName = "",
  lastName = "",
}): Promise<AxiosResponse> => {
  return postFetch({
    pathUrl: serverAuthRegisterUrl,
    data: {
      username,
      password,
      firstName,
      lastName,
    },
    withCredentials: true,
  });
};
