import { Dispatch, SetStateAction } from "react";
import { AxiosResponse } from "axios";

export interface SubmitPhotoProps {
  handleOnChangeImage: (file: File) => Promise<AxiosResponse>;
  handleDeleteImage: (id: string) => Promise<AxiosResponse>;
  handleSetIdImage: Dispatch<SetStateAction<string>>;
  blobUrlImage: string | ArrayBuffer | null;
  setBlobUrlImage: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
  idImageToSave: string;
  value: string;
}
