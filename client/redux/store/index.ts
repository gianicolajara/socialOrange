import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer from "../slices/user/user.slice";
import postReducer from "../slices/post/post.slice";
import modalReducer from "../slices/modal/modal.slice";

const store = configureStore({
  reducer: {
    userReducer,
    postReducer,
    modalReducer,
  },
  middleware: (middleware) => middleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
