import { createSlice } from "@reduxjs/toolkit";
import { loadingState } from "../../../types/enums/generalEnums";
import { ErrorInterface } from "../../../types/types/generalTypes";
import {
  loginUserThunk,
  logoutThunk,
  recoveredLoginThunk,
  registerUserThunk,
} from "../../thunks/user.thunk";
import { InitialUserStateProps } from "./types";

const initialState: InitialUserStateProps = {
  user: null,
  token: null,
  loading: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    clearUserState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.error = initialState.error;
        state.user = action.payload?.user;
        state.token = action.payload?.token;
        state.loading = loadingState.SUCCEEDED;
      })
      .addCase(loginUserThunk.pending, (state, _) => {
        state.loading = loadingState.PENDING;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.user = initialState.user;
        state.token = initialState.token;
        state.loading = loadingState.FAILED;
        state.error = action.payload as ErrorInterface;
      })
      .addCase(recoveredLoginThunk.fulfilled, (state, action) => {
        state.error = initialState.error;
        state.user = action.payload?.user;
        state.token = action.payload?.token;
        state.loading = loadingState.SUCCEEDED;
      })
      .addCase(recoveredLoginThunk.rejected, (state, _) => {
        state.user = initialState.user;
        state.token = initialState.token;
        state.loading = loadingState.FAILED;
      })
      .addCase(logoutThunk.fulfilled, (state, _) => {
        state.user = initialState.user;
        state.token = initialState.token;
        state.error = initialState.error;
        state.loading = loadingState.IDLE;
      })
      .addCase(registerUserThunk.fulfilled, (state, _) => {
        state.error = initialState.error;
        state.loading = loadingState.SUCCEEDED;
      })
      .addCase(registerUserThunk.pending, (state, _) => {
        state.error = initialState.error;
        state.loading = loadingState.PENDING;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.error = action.payload as ErrorInterface;
        state.loading = loadingState.FAILED;
      });
  },
});

const { reducer: userReducer, actions } = userSlice;
const { clearUserState } = actions;

export default userReducer;
export { clearUserState };
