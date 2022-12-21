import { AxiosResponse } from "axios";
import { serverUserUrl } from "../../config/urlBackend";
import { getFetch } from "../../utils/fetching";

export const getUserByNameService = (name: string): Promise<AxiosResponse> => {
  return getFetch({
    pathUrl: `${serverUserUrl}/${name}`,
    withCredentials: true,
  });
};
