import { createStore, applyMiddleware, combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
  authReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
