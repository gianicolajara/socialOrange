import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { closeModalAction } from "../../redux/slices/modal/modal.slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { updatePostByIdThunk } from "../../redux/thunks/post.thunk";
import { loadingStatePost, modalsEnum } from "../../types/enums/generalEnums";
import { PostFormInterface } from "../../types/interfaces/post";
import { successToast } from "../../utils/toasts";
import Button from "../Button";
import NormalModal from "../Modal/NormalModal";
import TextArea from "../TextArea";

const initialPostSelected: PostFormInterface = {
  creator: "",
  post: "",
};

const ModalsPost = () => {
  const dispatch = useAppDispatch();
  const modalsState = useSelector((state: RootState) => state.modalReducer);
  const { posts, error, loading } = useSelector(
    (state: RootState) => state.postReducer
  );
  const [postSelected, setPostSelected] =
    useState<PostFormInterface>(initialPostSelected);

  const selectedModal = modalsState[modalsEnum.updatepost];
  const open = selectedModal?.value;

  const getPostById = posts.find(
    (item) => item.id === selectedModal?.information
  );

  const handleOnClose = () => {
    dispatch(closeModalAction(modalsEnum.updatepost));
  };

  const handleChangePostForm = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostSelected({
      ...postSelected,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updatePostByIdThunk({
        id: selectedModal?.information,
        post: postSelected,
      })
    );
  };

  useEffect(() => {
    setPostSelected({
      creator: getPostById?.creator?.id as string,
      post: getPostById?.post as string,
      photo: getPostById?.photo?.id as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPostById]);

  useEffect(() => {
    if (loading === loadingStatePost.SUCCEEDEDUPDATED) {
      successToast("Post cambiado exitosamente");
      handleOnClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return open ? (
    <NormalModal onClose={handleOnClose} title="Editar Post">
      <form
        onSubmit={handleOnSubmit}
        className="w-full h-full flex flex-col gap-2"
      >
        <TextArea
          placeholder="Post"
          name="post"
          rows={5}
          withBorder={true}
          onChange={handleChangePostForm}
          value={postSelected.post}
          error={error?.errors?.post}
        />
        <Button type="submit" loading={loading === loadingStatePost.PENDING}>
          Editar
        </Button>
      </form>
    </NormalModal>
  ) : null;
};

export default ModalsPost;
