import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { drawerReducer } from "./drawerReducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
  drawerReducer: drawerReducer,
});

export default rootReducer;
