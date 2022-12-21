import { createSlice } from "@reduxjs/toolkit";
import { loadingStateProfile } from "../../../types/enums/generalEnums";
import { ErrorInterface } from "../../../types/types/generalTypes";
import { getProfileByNameThunk } from "../../thunks/profile.thunk";
import { ProfileStateSliceInterface } from "./types";

const initialProfileState: ProfileStateSliceInterface = {
  user: null,
  loading: loadingStateProfile.IDLE,
  error: null,
};

const profileSlice = createSlice({
  initialState: initialProfileState,
  name: "profile",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileByNameThunk.fulfilled, (state, action) => {
        state.error = initialProfileState.error;
        state.user = action.payload.user;
        state.loading = loadingStateProfile.SUCCEEDED;
      })
      .addCase(getProfileByNameThunk.pending, (state, action) => {
        state.error = initialProfileState.error;
        state.loading = loadingStateProfile.PENDING;
      })
      .addCase(getProfileByNameThunk.rejected, (state, action) => {
        state.error = action.payload as ErrorInterface;
        state.loading = loadingStateProfile.FAILED;
      });
  },
});

const { reducer: profileReducer } = profileSlice;

export default profileReducer;
