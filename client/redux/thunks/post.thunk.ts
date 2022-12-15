import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import {
  createPostService,
  getAllPostService,
} from "../../services/post/post.services";
import {
  PostFormInterface,
  ResponseAxiosCreatePost,
  ResponseAxiosGetAllPosts,
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
