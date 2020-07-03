import { combineReducers } from "redux";
import userAuthed from "./userAuthed";
import screamReducer from "./screamReducer";

export default combineReducers({
  users: userAuthed,
  screams: screamReducer,
});
