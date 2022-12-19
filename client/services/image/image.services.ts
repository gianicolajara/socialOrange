import { AxiosResponse } from "axios";
import { serverImageUrl } from "../../config/urlBackend";
import { deleteFetch, postFetch } from "../../utils/fetching";

export const createImage = (file: File): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append("files", file as Blob);

  return postFetch({
    pathUrl: serverImageUrl,
    data: formData,
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteImageService = (id: string): Promise<AxiosResponse> => {
  return deleteFetch({
    pathUrl: `${serverImageUrl}/${id}`,
    withCredentials: true,
  });
};
