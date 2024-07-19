import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/User";
import channelReducer from "./reducers/Channel";

const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
  },
});

export default store;
