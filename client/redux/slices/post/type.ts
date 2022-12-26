import { loadingStatePost } from "../../../types/enums/generalEnums";
import { PostInterface } from "../../../types/interfaces/post";
import { ErrorInterface } from "../../../types/types/generalTypes";

export interface InitialPostState {
  posts: Array<PostInterface>;
  loading: loadingStatePost;
  error: ErrorInterface | null;
}
