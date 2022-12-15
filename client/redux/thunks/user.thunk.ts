import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  loginUserService,
  logoutService,
  recoveredLoginService,
  registerUserService,
} from "../../services/auth/auth.services";
import {
  AxiosResponseLoginUser,
  AxiosResponseLogout,
  AxiosResponseRecoveryUser,
  AxiosResponseRegisterUser,
  UserForm,
  UserInterface,
} from "../../types/interfaces/user";

export const loginUserThunk = createAsyncThunk(
  "loginUser",
  async (userForm: UserForm, thunkApi) => {
    return loginUserService({
      username: userForm.username,
      password: userForm.password,
    })
      .then((res) => {
        return res.data as AxiosResponseLoginUser;
      })
      .catch((err) => {
        return thunkApi.rejectWithValue((err as AxiosError).response?.data);
      });
  }
);

export const recoveredLoginThunk = createAsyncThunk(
  "recoveredLogin",
  async (_, thunkApi) => {
    return recoveredLoginService()
      .then((res) => {
        return res.data as AxiosResponseRecoveryUser;
      })
      .catch((err) => {
        return thunkApi.rejectWithValue((err as AxiosError).response?.data);
      });
  }
);

export const logoutThunk = createAsyncThunk("logout", async (_, thunkApi) => {
  return logoutService().then((res) => {
    return res.data as AxiosResponseLogout;
  });
});

export const registerUserThunk = createAsyncThunk(
  "registerUser",
  async (user: UserInterface, thunkApi) => {
    return registerUserService(user)
      .then((res) => {
        return res.data as AxiosResponseRegisterUser;
      })
      .catch((err) => {
        return thunkApi.rejectWithValue((err as AxiosError).response?.data);
      });
  }
);
