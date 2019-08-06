import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import court from "./court";
import secPerson from "./secPerson";
import courtReport from "./courtReport";

export default combineReducers({
  auth,
  user,
  court,
  secPerson,
  courtReport
});
