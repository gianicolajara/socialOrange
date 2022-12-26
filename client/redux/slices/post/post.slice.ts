import { createSlice } from "@reduxjs/toolkit";
import { loadingStatePost } from "../../../types/enums/generalEnums";
import { PostInterface } from "../../../types/interfaces/post";
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
    resetLoading: (state) => {
      state.loading = "idle";
    },
    insertPost: (state, action) => {
      state.posts = [action.payload as PostInterface, ...state.posts];
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id
          ? { ...post, ...action.payload.updatedFields }
          : post
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.loading = loadingStatePost.SUCCEEDEDCREATED;
        state.error = initialState.error;
      })
      .addCase(createPostThunk.pending, (state, action) => {
        state.loading = loadingStatePost.PENDING;
        state.error = initialState.error;
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.loading = loadingStatePost.FAILED;
        state.error = action.payload as ErrorInterface;
      })
      .addCase(getAllPostThunk.fulfilled, (state, action) => {
        state.loading = loadingStatePost.SUCCEEDED;
        state.error = initialState.error;
        state.posts = action.payload.posts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .addCase(getAllPostThunk.pending, (state, action) => {
        state.loading = loadingStatePost.PENDING;
        state.error = initialState.error;
      })
      .addCase(getAllPostThunk.rejected, (state, action) => {
        state.loading = loadingStatePost.FAILED;
        state.error = action.payload as ErrorInterface;
      })
      .addCase(deletePostByIdThunk.fulfilled, (state, action) => {
        state.loading = loadingStatePost.SUCCEEDEDDELETED;
        state.error = initialState.error;
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

const { resetPosts, resetLoading, insertPost, deletePost, updatePost } =
  actions;

export { resetPosts, resetLoading, insertPost, deletePost, updatePost };

export default postReducer;
