import { call, put, takeLatest } from "redux-saga/effects";
import api from "src/services/api";
import { UserActions } from "../slices/users";

function* fetch({}: ReturnType<typeof UserActions.fetch>) {
  try {
    const { data } = yield call(api.get, "/users");

    yield put(UserActions.fetchSuccess(data));
  } catch (error: any) {
    yield put(UserActions.fetchError());
  }
}

function* add({ payload }: ReturnType<typeof UserActions.add>) {
  try {
    console.log(payload);

    yield call(api.post, `/users`, payload);

    yield put(UserActions.addSuccess());

    yield put(UserActions.fetch());
  } catch (error: any) {
    yield put(UserActions.addError());
  }
}

function* remove({ payload }: ReturnType<typeof UserActions.remove>) {
  try {
    yield call(api.delete, `/users/${payload}`);

    yield put(UserActions.removeSuccess());

    yield put(UserActions.fetch());
  } catch (error: any) {
    yield put(UserActions.removeError());
  }
}

export default [
  takeLatest(UserActions.fetch.type, fetch),
  takeLatest(UserActions.add.type, add),
  takeLatest(UserActions.remove.type, remove),
];
