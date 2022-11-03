import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../types";

const initialState: UserState = {
  data: [],
  loading: false,
  modal: false,
};

export const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetch: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, { payload }: PayloadAction<User[]>) => {
      state.data = payload;
      state.loading = false;
    },
    fetchError: (state) => {
      state.loading = false;
    },
    add: (state, {}: PayloadAction<Omit<User, "id">>) => {
      state.loading = true;
    },
    addSuccess: (state) => {
      state.loading = false;
      state.modal = false;
    },
    addError: (state) => {
      state.loading = false;
    },
    remove: (state, {}: PayloadAction<number>) => {
      state.loading = true;
    },
    removeSuccess: (state) => {
      state.loading = false;
    },
    removeError: (state) => {
      state.loading = false;
    },
    setModal: (state, { payload }: PayloadAction<boolean>) => {
      state.modal = payload;
    },
  },
});

export const UserActions = slice.actions;

export default slice.reducer;
