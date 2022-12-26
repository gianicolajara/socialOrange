import { useEffect } from "react";
import {
  addModalAction,
  deleteModalAction,
} from "../../redux/slices/modal/modal.slice";
import { useAppDispatch } from "../../redux/store";
import { modalsEnum } from "../../types/enums/generalEnums";
import ModalsPost from "../ModalsPost";
import ModalDeletePost from "../ModalsPost/ModalDeletePost";
import PostItem from "./PostItem";
import { ListPostProps } from "./types";

const ListPost = ({
  posts,
  ownerOptions,
  ownerPost,
  handleOnLike = () => {},
  loadingLike = false,
}: ListPostProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addModalAction(modalsEnum.updatepost));
    dispatch(addModalAction(modalsEnum.deletepost));

    return () => {
      dispatch(deleteModalAction(modalsEnum.updatepost));
      dispatch(deleteModalAction(modalsEnum.deletepost));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalsPost />
      <ModalDeletePost />
      {posts && posts.length > 0 ? (
        posts.map(
          ({
            creator,
            post,
            commentaries,
            id,
            photo,
            createdAt,
            updatedAt,
            likes,
          }) => (
            <PostItem
              key={id}
              creator={creator}
              post={post}
              commentaries={commentaries}
              id={id}
              photo={photo}
              createdAt={createdAt}
              updatedAt={updatedAt}
              ownerOptions={ownerOptions}
              ownerPost={ownerPost(creator.id || "")}
              likes={likes}
              handleOnLike={handleOnLike}
              loadingLike={loadingLike}
            />
          )
        )
      ) : (
        <p>No hay posts para mostrar</p>
      )}
    </>
  );
};

export default ListPost;
