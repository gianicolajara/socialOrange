import { useEffect } from "react";
import { useSelector } from "react-redux";
import { closeModalAction } from "../../redux/slices/modal/modal.slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { deletePostByIdThunk } from "../../redux/thunks/post.thunk";
import { loadingStatePost, modalsEnum } from "../../types/enums/generalEnums";
import { successToast } from "../../utils/toasts";
import YNModal from "../Modal/YNModal";

const ModalDeletePost = () => {
  const dispatch = useAppDispatch();

  const modals = useSelector((state: RootState) => state.modalReducer);
  const { loading } = useSelector((state: RootState) => state.postReducer);

  const handleOnYes = () => {
    dispatch(deletePostByIdThunk(modals[modalsEnum.deletepost].information));
  };

  const handleCloseModal = () =>
    dispatch(closeModalAction(modalsEnum.deletepost));

  useEffect(() => {
    if (loading === loadingStatePost.SUCCEEDEDDELETED) {
      successToast("Post eliminado con exito");
      handleCloseModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <YNModal
      title="Borrar Post"
      onYes={handleOnYes}
      open={modals[modalsEnum.deletepost]?.value}
      onClose={handleCloseModal}
    />
  );
};

export default ModalDeletePost;
