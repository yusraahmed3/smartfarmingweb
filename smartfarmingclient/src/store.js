import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userAuth, userUpdate } from "./reducers/auth";
import {
  requestReducer,
  rejectRequest,
  approveRequest,
  sendRequest,
  deleteRequest,
} from "./reducers/request";

import { fetchChannels } from "./reducers/channel";

const storedUserInfo = localStorage.getItem("profile")
  ? JSON.parse(localStorage.getItem("profile"))
  : null;

const initialState = {
  userAuth: { userData: storedUserInfo },
};

const reducers = combineReducers({
  userAuth,
  userUpdate,
  requestReducer,
  rejectRequest,
  approveRequest,
  sendRequest,
  deleteRequest,
  fetchChannels,
});

export const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
