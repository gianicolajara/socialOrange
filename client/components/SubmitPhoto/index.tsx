import Image from "next/image";
import { useState } from "react";
import InputFile from "../Input/InputFile";
import Loader from "../Loader";
import { errorToast, successToast } from "../../utils/toasts";
import { ResponseAxiosCreateImage } from "../../types/interfaces/post";
import { SubmitPhotoProps } from "./types";

const initialDisplayImage = null;
const initialIdImage = "";

const SubmitPhoto = ({
  handleOnChangeImage,
  handleDeleteImage,
  handleSetUrlImage,
  displayImageState,
  setDisplayImageState,
}: SubmitPhotoProps) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [idImage, setIdImage] = useState<string>(initialIdImage);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingImage(true);

    if (!e.target?.files || !e.target.files.length || e.target.files === null)
      return;

    const fr = new FileReader();

    handleOnChangeImage(e.target.files[0])
      .then((res) => {
        const { imageRes } = res.data as ResponseAxiosCreateImage;
        setIdImage(imageRes.id);
        handleSetUrlImage(`${imageRes.id}.${imageRes.extension}`);
        successToast("Su imagen fue subida correctamente");
      })
      .catch((err) => {
        errorToast(
          err.msg ||
            err.message ||
            "Algo fue mal subiendo la imagen, intentelo de nuevo"
        );
      })
      .finally(() => {
        setLoadingImage(false);
      });

    fr.onload = () => {
      setDisplayImageState(fr.result);
    };

    fr.readAsDataURL(e.target.files[0]);
  };

  const handleDeleteFile = () => {
    handleDeleteImage(idImage).then(() => {
      setDisplayImageState(initialDisplayImage);
      setIdImage(initialIdImage);
    });
  };

  return (
    <>
      {displayImageState && (
        <div className="w-[100px] h-max relative z-10 rounded-lg overflow-hidden">
          {loadingImage ? (
            <div className="w-full h-full absolute top-0 left-0 z-50">
              <Loader />
            </div>
          ) : (
            <div
              className="w-full h-full absolute top-0 left-0 z-50 justify-center items-center bg-black/50 cursor-pointer flex"
              onClick={handleDeleteFile}
            >
              <p className="text-white font-bold">X</p>
            </div>
          )}

          <Image
            src={displayImageState as string}
            alt="image"
            width={100}
            height={100}
          />
        </div>
      )}
      <InputFile handleChangeFile={handleChangeFile} />
    </>
  );
};

export default SubmitPhoto;
