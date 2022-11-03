import { call, put, takeLatest } from "redux-saga/effects";
import api from "src/services/api";
import { BookActions } from "../slices/books";

function* fetch({}: ReturnType<typeof BookActions.fetch>) {
  try {
    const { data } = yield call(api.get, "/books");

    yield put(BookActions.fetchSuccess(data));
  } catch (error: any) {
    yield put(BookActions.fetchError());
  }
}

function* add({ payload }: ReturnType<typeof BookActions.add>) {
  try {
    yield call(api.post, `/books`, payload);

    yield put(BookActions.addSuccess());

    yield put(BookActions.fetch());
  } catch (error: any) {
    yield put(BookActions.addError());
  }
}

function* remove({ payload }: ReturnType<typeof BookActions.remove>) {
  try {
    yield call(api.delete, `/books/${payload}`);

    yield put(BookActions.removeSuccess());

    yield put(BookActions.fetch());
  } catch (error: any) {
    yield put(BookActions.removeError());
  }
}

export default [
  takeLatest(BookActions.fetch.type, fetch),
  takeLatest(BookActions.add.type, add),
  takeLatest(BookActions.remove.type, remove),
];
