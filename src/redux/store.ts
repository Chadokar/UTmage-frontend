import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/User";
import channelReducer from "./reducers/Channel";
import videoReducer from "./reducers/Video";
import videoIdReducer from "./reducers/VideoId";

const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
    video: videoReducer,
    videoId: videoIdReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>; // Define the RootState type
