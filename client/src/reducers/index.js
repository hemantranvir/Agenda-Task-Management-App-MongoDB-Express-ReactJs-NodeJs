import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import agendasReducer from "./agendasReducer";
import jobsReducer from "./jobsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  agendas: agendasReducer,
  jobs: jobsReducer
});
