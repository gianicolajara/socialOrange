import { createSlice } from "@reduxjs/toolkit";
import { ErrorInterface } from "../../../types/types/generalTypes";
import { createPostThunk, getAllPostThunk } from "../../thunks/post.thunk";
import { InitialPostState } from "./type";

const initialState: InitialPostState = {
  error: null,
  loading: "idle",
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.error = initialState.error;
        state.loading = "succeeded";
        state.posts = [...state.posts, action.payload.post];
      })
      .addCase(createPostThunk.pending, (state, action) => {
        state.error = initialState.error;
        state.loading = "pending";
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as ErrorInterface;
      })
      .addCase(getAllPostThunk.fulfilled, (state, action) => {
        state.error = initialState.error;
        state.loading = "succeeded";
        state.posts = action.payload.posts;
      })
      .addCase(getAllPostThunk.pending, (state, action) => {
        state.error = initialState.error;
        state.loading = "pending";
      })
      .addCase(getAllPostThunk.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as ErrorInterface;
      });
  },
});

const { reducer: postReducer } = postSlice;

export default postReducer;
