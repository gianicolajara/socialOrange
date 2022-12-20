import { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { createPostThunk } from "../../redux/thunks/post.thunk";
import {
  createImage,
  deleteImageService,
} from "../../services/image/image.services";
import { loadingStatePost } from "../../types/enums/generalEnums";
import { PostFormInterface } from "../../types/interfaces/post";
import { successToast } from "../../utils/toasts";
import Button from "../Button";
import SubmitPhoto from "../SubmitPhoto";
import TextArea from "../TextArea";

const initialPostForm: PostFormInterface = {
  creator: "",
  post: "",
  photo: "",
  commentaries: [],
};

const initialIdImage = "";
const initialDisplayImage: string | ArrayBuffer | null = null;
const initialSelectedFile = "";

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const [postForm, setPostForm] = useState(initialPostForm);
  const [idImageToSave, setIdImageToSave] = useState(initialIdImage);
  const [selectedFile, setSelectedFile] = useState(initialSelectedFile);
  const [urlBlobImage, setUrlBlobImage] = useState<string | ArrayBuffer | null>(
    initialDisplayImage
  );

  const { user } = useSelector((state: RootState) => state.userReducer);
  const { loading, error } = useSelector(
    (state: RootState) => state.postReducer
  );

  const handleChangePostForm = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitPost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = {
      ...postForm,
      creator: user?.id,
      photo: idImageToSave, //only send image name with extension
    } as PostFormInterface;
    dispatch(createPostThunk(newPost));
  };

  const handleOnChangeImage = (file: File): Promise<AxiosResponse> =>
    createImage(file);

  const handleDeleteImage = (id: string): Promise<AxiosResponse> =>
    deleteImageService(id);

  useEffect(() => {
    if (loading === loadingStatePost.SUCCEEDEDCREATED) {
      successToast("Nuevo post creado");
      setPostForm(initialPostForm);
      setUrlBlobImage(initialDisplayImage);
      setIdImageToSave(initialIdImage);
      setSelectedFile(initialSelectedFile);
    }
  }, [loading]);

  return (
    <div className="w-full h-max border-[1px] border-neutral-300 p-2 rounded-lg max-w-[500px] mx-auto mb-5">
      <form onSubmit={handleSubmitPost}>
        <TextArea
          placeholder="Ingresa un post o foto"
          rows={2}
          name="post"
          onChange={handleChangePostForm}
          value={postForm.post}
          error={error?.errors?.post?.msg}
        />
        <div className="w-full gap-1 flex justify-end items-center">
          <SubmitPhoto
            idImageToSave={idImageToSave}
            handleSetIdImage={setIdImageToSave}
            handleOnChangeImage={handleOnChangeImage}
            handleDeleteImage={handleDeleteImage}
            blobUrlImage={urlBlobImage}
            setBlobUrlImage={setUrlBlobImage}
            value={selectedFile}
          />
          <Button type="submit" loading={loading === loadingStatePost.PENDING}>
            Subir
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
