import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import ChannelReducer from "./features/channelSlice";
import RequestReducer from "./features/requestSlice";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    channel: ChannelReducer,
    request: RequestReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
