import middleware from "./middleware";
import userAuthed from "./reducers/userAuthed";
import { createStore } from "redux";

const store = createStore(userAuthed, middleware);

export default store;
