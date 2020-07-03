import middleware from "./middleware";
import reducer from "./reducers";
import { createStore } from "redux";

const store = createStore(reducer, middleware);

export default store;
