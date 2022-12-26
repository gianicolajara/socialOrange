import { useEffect } from "react";
import { useSelector } from "react-redux";
import { openModalAction } from "../../redux/slices/modal/modal.slice";
import {
  deletePost,
  insertPost,
  updatePost,
} from "../../redux/slices/post/post.slice";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  getAllPostThunk,
  likePostByIdThunk,
} from "../../redux/thunks/post.thunk";
import { loadingStatePost, modalsEnum } from "../../types/enums/generalEnums";
import { PostInterface } from "../../types/interfaces/post";
import { socket } from "../../utils/socket";
import { OptionsButtonItemProps } from "../OptionsButton/types";
import ListPost from "./ListPost";

const Posts = () => {
  const dispatch = useAppDispatch();

  const { posts } = useSelector((state: RootState) => state.postReducer);
  const { user, loading } = useSelector(
    (state: RootState) => state.userReducer
  );

  const createOptionsItem = (id = ""): Array<OptionsButtonItemProps> => [
    {
      id: 1,
      label: "Borrar",
      onClick: () => {
        dispatch(
          openModalAction({ modalName: modalsEnum.deletepost, information: id })
        );
      },
    },
    {
      id: 2,
      label: "Editar",
      onClick: () => {
        dispatch(
          openModalAction({ modalName: modalsEnum.updatepost, information: id })
        );
      },
    },
  ];

  const likeButtonPost = (id = "") => {
    dispatch(likePostByIdThunk(id));
  };

  const getPermisionsOwnerPost = (id: string) => {
    return user?.id === id;
  };

  useEffect(() => {
    socket.on("post->insert", (doc: PostInterface) => {
      dispatch(insertPost(doc));
    });

    socket.on("post->delete", (id: string) => {
      dispatch(deletePost(id));
    });

    socket.on("post->update", ({ id, updatedFields }) => {
      dispatch(updatePost({ id, updatedFields }));
    });

    return () => {
      socket.off("post->insert");
      socket.off("post->delete");
      socket.off("post->update");
    };
  }, []);

  useEffect(() => {
    dispatch(getAllPostThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex flex-col w-full h-full gap-5 items-center">
      <ListPost
        posts={posts}
        ownerOptions={createOptionsItem}
        ownerPost={getPermisionsOwnerPost}
        handleOnLike={likeButtonPost}
        loadingLike={loading === loadingStatePost.PENDING}
      />
    </section>
  );
};

export default Posts;
