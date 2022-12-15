import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { recoveredLoginThunk } from "../../redux/thunks/user.thunk";
import { loadingState } from "../../types/enums/generalEnums";

interface UserRegenerationProps {
  children: React.ReactNode;
}

const UserRegeneration = ({ children }: UserRegenerationProps) => {
  const { user, loading } = useSelector(
    (state: RootState) => state.userReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user && loading === loadingState.IDLE) {
      dispatch(recoveredLoginThunk());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
};

export default UserRegeneration;
