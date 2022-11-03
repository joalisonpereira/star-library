import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import books from "./books";

const rootReducer = combineReducers({
  auth,
  users,
  books,
});

export default rootReducer;
