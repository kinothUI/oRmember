import { combineReducers } from "redux";

import orderReducer from "./order";

const rootReducer = combineReducers({
  orders: orderReducer,
});

export default rootReducer;
