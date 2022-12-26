import Image from "next/image";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { openModalAction } from "../../redux/slices/modal/modal.slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { deletePostByIdThunk } from "../../redux/thunks/post.thunk";
import { modalsEnum } from "../../types/enums/generalEnums";
import { PostInterface } from "../../types/interfaces/post";
import { getEstimatedTime } from "../../utils/times";
import IconButton from "../Button/IconButton";
import OptionsButton from "../OptionsButton";
import { OptionsButtonItemProps } from "../OptionsButton/types";

const PostItem = ({
  id = "",
  photo,
  post,
  creator,
  commentaries = [],
  createdAt = "",
  updatedAt = "",
  ownerPost = false,
  ownerOptions = () => [],
}: PostInterface) => {
  const dispatch = useAppDispatch();

  return (
    <article
      aria-label="post"
      className="max-w-[500px] w-full max-h-[600px] h-max bg-neutral-50 rounded-md shadow cursor-pointer hover:"
    >
      <div
        aria-label="header-post"
        className="w-full h-[75px] bg-neutral-100 flex p-5"
      >
        <div
          aria-label="user-post-information"
          className="w-full h-full flex items-center gap-3"
        >
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden ring-2 ring-neutral-400">
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
            <small className="text-xs">
              {getEstimatedTime({ timestamp: createdAt })}
            </small>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex justify-center items-center gap-3">
            <p>{0}</p>
            <IconButton>
              <AiFillLike />
            </IconButton>
            {ownerPost && <OptionsButton options={ownerOptions(id)} />}
          </div>
        </div>
      </div>
      {photo && (
        <div aria-label="body-post" className="w-full h-[400px]">
          <div className="w-full h-full">
            <Image
              src={photo.relativePathUrl}
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
