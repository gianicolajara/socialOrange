import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { createPostThunk } from "../../redux/thunks/post.thunk";
import { loadingStatePost } from "../../types/enums/generalEnums";
import { PostFormInterface } from "../../types/interfaces/post";
import { successToast } from "../../utils/toasts";
import Button from "../Button";
import TextArea from "../TextArea";

const initialPostForm: PostFormInterface = {
  creator: "",
  post: "",
  photo: "",
  commentaries: [],
};

const CreatePost = () => {
  const [postForm, setPostForm] = useState(initialPostForm);
  const dispatch = useAppDispatch();

  const { loading, error } = useSelector(
    (state: RootState) => state.postReducer
  );
  const { user } = useSelector((state: RootState) => state.userReducer);

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
    } as PostFormInterface;

    dispatch(createPostThunk(newPost));
  };

  useEffect(() => {
    if (loading === loadingStatePost.SUCCEEDEDCREATED) {
      successToast("Nuevo post creado");
      setPostForm(initialPostForm);
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
          error={error?.errors?.post}
        />
        <div className="w-full gap-1 flex justify-end">
          <Button loading={loading === loadingStatePost.PENDING}>Foto</Button>
          <Button type="submit" loading={loading === loadingStatePost.PENDING}>
            Subir
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
