import { PostInterface } from "../../types/interfaces/post";
import { OptionsButtonItemProps } from "../OptionsButton/types";

export interface ListPostProps {
  posts: Array<PostInterface>;
  ownerPost: (id: string) => boolean;
  ownerOptions: (id: string) => Array<OptionsButtonItemProps>;
}
