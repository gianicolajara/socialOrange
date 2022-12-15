import { UserInterface } from "../../../types/interfaces/user";
import { ErrorInterface } from "../../../types/types/generalTypes";

export interface InitialUserStateProps {
  user: UserInterface | null;
  token: string | null | undefined;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: ErrorInterface | null;
}
