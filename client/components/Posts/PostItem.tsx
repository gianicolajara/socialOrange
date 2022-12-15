import Image from "next/image";
import { AiFillLike } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { PostInterface } from "../../types/interfaces/post";
import IconButton from "../Button/IconButton";

const PostItem = ({
  id,
  photo,
  post,
  creator,
  commentaries,
  createdAt,
  updatedAt,
}: PostInterface) => {
  return (
    <article
      aria-label="post"
      className="max-w-[500px] w-full max-h-[600px] h-max bg-neutral-50 rounded-md overflow-hidden shadow cursor-pointer hover:"
    >
      <div
        aria-label="header-post"
        className="w-full h-[75px] bg-neutral-100 flex p-5"
      >
        <div
          aria-label="user-post-information"
          className="w-full h-full flex items-center gap-3"
        >
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden ring-4 ring-orange-400">
            {/*  <Image
              src={avatar}
              alt="avatar"
              width={50}
              height={50}
              className="object-cover"
            /> */}
          </div>

          <div className="h-max">
            <p className="text-sm">{creator.username}</p>
            <small className="text-xs">{createdAt}</small>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex justify-center items-center gap-3">
            <p>{0}</p>
            <IconButton>
              <AiFillLike />
            </IconButton>
          </div>
          <IconButton>
            <SlOptions />
          </IconButton>
        </div>
      </div>
      {photo && (
        <div aria-label="body-post" className="w-full h-[400px]">
          <div className="w-full h-full">
            <Image
              src={photo}
              width={1000}
              height={400}
              alt="post-image"
              className="object-cover w-full h-[400px]"
            />
          </div>
        </div>
      )}
      {post && (
        <div className="w-full">
          <p className="p-4 text-sm">
            {post?.split(" ").slice(0, 7).join(" ")}...
          </p>
        </div>
      )}
    </article>
  );
};

export default PostItem;
