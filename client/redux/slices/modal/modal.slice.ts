import { createAction, createSlice } from "@reduxjs/toolkit";

const initialModalState: {
  [name: string]: {
    value: boolean;
    information: any;
  };
} = {};

type OpenModalType = {
  modalName: string;
  information: any;
};

export const addModalAction = createAction<string>("ADDMODAL");
export const openModalAction = createAction<OpenModalType>("OPENMODAL");
export const closeModalAction = createAction<string>("CLOSEMODAL");
export const toggleModalAction = createAction<string>("TOGGLEMODAL");
export const deleteModalAction = createAction<string>("DEELTEMODAL");

const modalSlice = createSlice({
  initialState: initialModalState,
  name: "modal",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addModalAction, (state, action) => {
        if (Object.hasOwn(state, action.payload)) return;

        const newObject = {
          value: false,
          information: null,
        };

        state[action.payload] = newObject;
      })
      .addCase(openModalAction, (state, action) => {
        if (!Object.hasOwn(state, action.payload.modalName)) return;
        state[action.payload.modalName].value = true;
        state[action.payload.modalName].information =
          action.payload.information;
      })
      .addCase(closeModalAction, (state, action) => {
        if (!Object.hasOwn(state, action.payload)) return;
        state[action.payload].value = false;
        state[action.payload].information = null;
      })
      .addCase(toggleModalAction, (state, action) => {
        if (!Object.hasOwn(state, action.payload)) return;
        state[action.payload].value = !state[action.payload].value;
      })
      .addCase(deleteModalAction, (state, action) => {
        if (!Object.hasOwn(state, action.payload)) return;
        delete state[action.payload];
      });
  },
});

const { reducer: modalReducer } = modalSlice;

export default modalReducer;
