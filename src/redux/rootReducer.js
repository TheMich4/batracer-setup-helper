import { combineReducers } from "redux";

import setupHistoryReducer from "./SetupHistory/setupHistory.reducer";

const rootReducer = combineReducers({
  setupHistory: setupHistoryReducer,
});

export default rootReducer;
