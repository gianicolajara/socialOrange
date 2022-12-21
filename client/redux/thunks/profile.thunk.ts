import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getUserByNameService } from "../../services/user/user.services";
import { AxiosResponseProfile } from "../../types/interfaces/profile";

export const getProfileByNameThunk = createAsyncThunk(
  "getProfileByName",
  (name: string, thunkAPi) => {
    return getUserByNameService(name)
      .then((res) => {
        return thunkAPi.fulfillWithValue(res.data as AxiosResponseProfile);
      })
      .catch((err) => {
        return thunkAPi.rejectWithValue((err as AxiosError).response?.data);
      });
  }
);
