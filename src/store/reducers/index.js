import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import court from "./court";

export default combineReducers({
  auth,
  user,
  court
});
