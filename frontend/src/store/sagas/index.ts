import { all } from "redux-saga/effects";
import users from "./users";
import auth from "./auth";
import books from "./books";

export default function* rootSaga() {
  yield all([auth, users, books].flat());
}
