import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { getAllPostThunk } from "../../redux/thunks/post.thunk";
import PostItem from "./PostItem";

const Posts = () => {
  const dispatch = useAppDispatch();

  const { posts } = useSelector((state: RootState) => state.postReducer);

  useEffect(() => {
    dispatch(getAllPostThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex flex-col w-full h-full gap-5 items-center">
      {posts &&
        posts.length > 0 &&
        posts.map(
          ({
            creator,
            post,
            commentaries,
            id,
            photo,
            createdAt,
            updatedAt,
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
            />
          )
        )}
    </section>
  );
};

export default Posts;
