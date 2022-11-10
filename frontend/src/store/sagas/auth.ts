import { call, put, takeLatest } from "redux-saga/effects";
import { StorageKeys } from "src/config/Enums";
import api from "src/services/api";
import { AuthActions } from "../slices/auth";

function* signIn({ payload }: ReturnType<typeof AuthActions.signIn>) {
  try {
    const { data } = yield call<any>(api.post, "/auth/login", {
      email: payload.email,
      password: payload.password,
    });

    yield put(AuthActions.signInSuccess(data.token));

    sessionStorage.setItem(StorageKeys.accessToken, data.token);
  } catch (error) {
    yield put(AuthActions.signInError());
  }
}

function* signOut() {
  sessionStorage.removeItem(StorageKeys.accessToken);
}

export default [
  takeLatest(AuthActions.signIn.type, signIn),
  takeLatest(AuthActions.signOut.type, signOut),
];
