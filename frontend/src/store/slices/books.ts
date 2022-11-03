import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BookState } from "../types";

const initialState: BookState = {
  data: [],
  loading: false,
  modal: false,
};

export const slice = createSlice({
  name: "books",
  initialState,
  reducers: {
    fetch: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, { payload }: PayloadAction<Book[]>) => {
      state.data = payload;
      state.loading = false;
    },
    fetchError: (state) => {
      state.loading = false;
    },
    add: (state, {}: PayloadAction<Omit<Book, "id">>) => {
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

export const BookActions = slice.actions;

export default slice.reducer;
