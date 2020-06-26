import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import logger from "./loggerMiddleware";


export default applyMiddleware(thunk, logger);
