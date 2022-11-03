import { all } from "redux-saga/effects";
import users from "./users";
import auth from "./auth";

export default function* rootSaga() {
  yield all([auth, users].flat());
}
