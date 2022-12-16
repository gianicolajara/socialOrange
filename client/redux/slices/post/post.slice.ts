import { createSlice } from "@reduxjs/toolkit";
import { loadingState } from "../../../types/enums/generalEnums";
import { ErrorInterface } from "../../../types/types/generalTypes";
import { createPostThunk, deletePostByIdThunk, getAllPostThunk } from "../../thunks/post.thunk";
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
        state.loading = loadingState.SUCCEEDED;
        state.posts = [...state.posts, action.payload.post];
      })
      .addCase(createPostThunk.pending, (state, action) => {
        state.error = initialState.error;
        state.loading = loadingState.PENDING;
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.loading = loadingState.FAILED;
        state.error = action.payload as ErrorInterface;
      })
      .addCase(getAllPostThunk.fulfilled, (state, action) => {
        state.error = initialState.error;
        state.loading = loadingState.SUCCEEDED;
        state.posts = action.payload.posts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      })
      .addCase(getAllPostThunk.pending, (state, action) => {
        state.error = initialState.error;
        state.loading = loadingState.PENDING;
      })
      .addCase(getAllPostThunk.rejected, (state, action) => {
        state.loading = loadingState.FAILED;
        state.error = action.payload as ErrorInterface;
      })
      .addCase(deletePostByIdThunk.fulfilled, (state, action) => {
        state.loading = loadingState.SUCCEEDED;
        state.error = initialState.error;
        state.posts = state.posts.filter((item) => item.id !== action.payload.id)
      }).addCase(deletePostByIdThunk.pending, (state, action) => {
        state.error = initialState.error;
        state.loading = loadingState.PENDING
      }).addCase(deletePostByIdThunk.rejected, (state, action) => {
        state.loading = loadingState.FAILED;
        state.error = action.payload as ErrorInterface;
      })
  },
});

const { reducer: postReducer } = postSlice;

export default postReducer;
