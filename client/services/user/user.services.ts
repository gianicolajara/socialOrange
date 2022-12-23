import { AxiosResponse } from "axios";
import { serverUserUrl } from "../../config/urlBackend";
import { getFetch, postFetch } from "../../utils/fetching";

export const getUserByNameService = (name: string): Promise<AxiosResponse> => {
  return getFetch({
    pathUrl: `${serverUserUrl}/${name}`,
    withCredentials: true,
  });
};

export const getListOfUserByNameService = (
  name: string
): Promise<AxiosResponse> => {
  return postFetch({
    pathUrl: serverUserUrl,
    data: {
      name,
    },
    withCredentials: true,
  });
};
