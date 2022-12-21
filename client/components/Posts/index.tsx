import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  deletePost,
  insertPost,
  updatePost,
} from "../../redux/slices/post/post.slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { getAllPostThunk } from "../../redux/thunks/post.thunk";
import { PostInterface } from "../../types/interfaces/post";
import { socket } from "../../utils/socket";
import ListPost from "./ListPost";

const Posts = () => {
  const dispatch = useAppDispatch();

  const { posts } = useSelector((state: RootState) => state.postReducer);

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
      <ListPost posts={posts} />
    </section>
  );
};

export default Posts;
