import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StorageKeys } from "src/config/Enums";
import { AuthState } from "../types";

const initialState: AuthState = {
  access: sessionStorage.getItem(StorageKeys.accessToken),
  loading: false,
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, {}: PayloadAction<{ email: string; password: string }>) => {
      state.loading = true;
    },
    signInSuccess: (state, { payload }: PayloadAction<string>) => {
      state.loading = false;
      state.access = payload;
    },
    signInError: (state) => {
      state.loading = false;
    },
    signOut: (state) => {
      state.access = null;
    },
  },
});

export const AuthActions = slice.actions;

export default slice.reducer;
