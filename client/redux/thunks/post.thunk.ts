import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import {
  createPostService,
  deletePostByIdService,
  getAllPostService,
  updatePostByIdService,
} from "../../services/post/post.services";
import {
  PostFormInterface,
  ResponseAxiosCreatePost,
  ResponseAxiosDeletePost,
  ResponseAxiosGetAllPosts,
  ResponseAxiosUpdatePost,
} from "../../types/interfaces/post";

export const createPostThunk = createAsyncThunk(
  "create/post",
  async (post: PostFormInterface, thunkApi) => {
    return createPostService({
      post,
    })
      .then((res) => {
        return res.data as ResponseAxiosCreatePost;
      })
      .catch((err) => {
        return thunkApi.rejectWithValue((err as AxiosError).response?.data);
      });
  }
);

export const getAllPostThunk = createAsyncThunk(
  "getAll/posts",
  async (_, thunkApi) => {
    return getAllPostService()
      .then((res) => res.data as ResponseAxiosGetAllPosts)
      .catch((err) => {
        return thunkApi.rejectWithValue((err as AxiosError).response?.data);
      });
  }
);

export const deletePostByIdThunk = createAsyncThunk(
  "delete/post",
  async (id: string, thunkApi) => {
    return deletePostByIdService(id)
      .then((res) => res.data as ResponseAxiosDeletePost)
      .catch((err) => {
        return thunkApi.rejectWithValue((err as AxiosError).response?.data);
      });
  }
);

export const updatePostByIdThunk = createAsyncThunk(
  "update/post",
  async (
    { post = {}, id = "" }: { post: PostFormInterface | {}; id: string },
    thunkApi
  ) => {
    return updatePostByIdService(id, post as PostFormInterface)
      .then((res) => res.data as ResponseAxiosUpdatePost)
      .catch((err) => {
        return thunkApi.rejectWithValue((err as AxiosError).response?.data);
      });
  }
);
