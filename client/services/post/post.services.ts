import { AxiosResponse } from "axios";
import { serverPostUrl } from "../../config/urlBackend";
import { PostFormType } from "../../types/interfaces/post";
import { deleteFetch, getFetch, postFetch } from "../../utils/fetching";

export const createPostService = ({
  post = null,
}: {
  post: PostFormType;
}): Promise<AxiosResponse> => {
  return postFetch({
    pathUrl: serverPostUrl,
    data: post || undefined,
    withCredentials: true,
  });
};

export const getAllPostService = (): Promise<AxiosResponse> => {
  return getFetch({
    pathUrl: serverPostUrl,
    withCredentials: true,
  });
};

export const deletePostByIdService = (id = "") => {
  return deleteFetch({
    pathUrl: `${serverPostUrl}/${id}`,
    withCredentials: true
  })
}
