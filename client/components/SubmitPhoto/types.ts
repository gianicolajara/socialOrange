import { Dispatch, SetStateAction } from "react";
import { AxiosResponse } from "axios";

export interface SubmitPhotoProps {
  handleOnChangeImage: (file: File) => Promise<AxiosResponse>;
  handleDeleteImage: (id: string) => Promise<AxiosResponse>;
  handleSetUrlImage: Dispatch<SetStateAction<string>>;
  displayImageState: string | ArrayBuffer | null;
  setDisplayImageState: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
}
