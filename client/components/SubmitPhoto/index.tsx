import Image from "next/image";
import { useState } from "react";
import InputFile from "../Input/InputFile";
import Loader from "../Loader";
import { errorToast, successToast } from "../../utils/toasts";
import { ResponseAxiosCreateImage } from "../../types/interfaces/post";
import { SubmitPhotoProps } from "./types";

const initialDisplayImage = null;
const initialIdImage = "";

//Permite subir una foto y ademas tener un menu para
//poder eliminar la foto si no desea subirla y elegir otra
//este componente devolvera un id que pertenece a la imagen
const SubmitPhoto = ({
  blobUrlImage,
  setBlobUrlImage,
  handleOnChangeImage,
  handleDeleteImage,
  handleSetIdImage,
  idImageToSave,
  value,
}: SubmitPhotoProps) => {
  const [loadingImage, setLoadingImage] = useState(true);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingImage(true);

    if (!e.target?.files || !e.target.files.length || e.target.files === null)
      return;

    const fr = new FileReader();

    handleOnChangeImage(e.target.files[0])
      .then((res) => {
        const { imageRes } = res.data as ResponseAxiosCreateImage;
        handleSetIdImage(imageRes.id);
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
      setBlobUrlImage(fr.result);
    };

    fr.readAsDataURL(e.target.files[0]);
  };

  const handleDeleteFile = () => {
    handleDeleteImage(idImageToSave).then(() => {
      setBlobUrlImage(initialDisplayImage);
      handleSetIdImage(initialIdImage);
    });
  };

  return (
    <>
      {blobUrlImage && (
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
            src={blobUrlImage as string}
            alt="image"
            width={100}
            height={100}
          />
        </div>
      )}
      <InputFile handleChangeFile={handleChangeFile} value={value} />
    </>
  );
};

export default SubmitPhoto;
