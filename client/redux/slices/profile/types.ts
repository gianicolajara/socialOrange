import { loadingStateProfile } from "../../../types/enums/generalEnums";
import { UserInterface } from "../../../types/interfaces/user";
import { ErrorInterface } from "../../../types/types/generalTypes";

export interface ProfileStateSliceInterface {
  user: UserInterface | null;
  loading: loadingStateProfile;
  error: ErrorInterface | null;
}
