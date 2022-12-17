import { PostInterface } from "../../../types/interfaces/post";
import { ErrorInterface } from "../../../types/types/generalTypes";

export interface InitialPostState {
  posts: Array<PostInterface>;
  loading:
    | "idle"
    | "pending"
    | "succeeded"
    | "succeededCreated"
    | "succeededDeleted"
    | "succeededUpdated"
    | "failed";
  error: ErrorInterface | null;
}
