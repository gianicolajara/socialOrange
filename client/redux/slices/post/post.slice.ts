import { createSlice } from "@reduxjs/toolkit";
import { loadingStatePost } from "../../../types/enums/generalEnums";
import { ErrorInterface } from "../../../types/types/generalTypes";
import {
  createPostThunk,
  deletePostByIdThunk,
  getAllPostThunk,
  updatePostByIdThunk,
} from "../../thunks/post.thunk";
import { InitialPostState } from "./type";

const initialState: InitialPostState = {
  error: null,
  loading: "idle",
  posts: [],
};

//learn rtk query
const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    resetPosts: (state) => {
      state.error = null;
      state.loading = "idle";
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.error = initialState.error;
        state.loading = loadingStatePost.SUCCEEDEDCREATED;
        state.posts = [...state.posts, action.payload.post];
      })
      .addCase(createPostThunk.pending, (state, action) => {
        state.error = initialState.error;
        state.loading = loadingStatePost.PENDING;
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.loading = loadingStatePost.FAILED;
        state.error = action.payload as ErrorInterface;
      })
      .addCase(getAllPostThunk.fulfilled, (state, action) => {
        state.error = initialState.error;
        state.loading = loadingStatePost.SUCCEEDED;
        state.posts = action.payload.posts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .addCase(getAllPostThunk.pending, (state, action) => {
        state.error = initialState.error;
        state.loading = loadingStatePost.PENDING;
      })
      .addCase(getAllPostThunk.rejected, (state, action) => {
        state.loading = loadingStatePost.FAILED;
        state.error = action.payload as ErrorInterface;
      })
      .addCase(deletePostByIdThunk.fulfilled, (state, action) => {
        state.loading = loadingStatePost.SUCCEEDEDDELETED;
        state.error = initialState.error;
        state.posts = state.posts.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deletePostByIdThunk.pending, (state, action) => {
        state.error = initialState.error;
        state.loading = loadingStatePost.PENDING;
      })
      .addCase(deletePostByIdThunk.rejected, (state, action) => {
        state.loading = loadingStatePost.FAILED;
        state.error = action.payload as ErrorInterface;
      })
      .addCase(updatePostByIdThunk.fulfilled, (state, action) => {
        state.loading = loadingStatePost.SUCCEEDEDUPDATED;
        state.error = initialState.error;
        state.posts = state.posts.map((item) =>
          item.id === action.payload.post.id ? action.payload.post : item
        );
      })
      .addCase(updatePostByIdThunk.pending, (state, action) => {
        state.error = initialState.error;
        state.loading = loadingStatePost.PENDING;
      })
      .addCase(updatePostByIdThunk.rejected, (state, action) => {
        state.loading = loadingStatePost.FAILED;
        state.error = action.payload as ErrorInterface;
      });
  },
});

const { actions, reducer: postReducer } = postSlice;

const { resetPosts } = actions;

export { resetPosts };

export default postReducer;
