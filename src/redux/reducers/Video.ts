import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Video {
  id: string;
  working: boolean;
  url: string | null;
  title: string;
  writer: string;
  yt_channel: string;
  description: string;
  desiger: string;
  content: string | null | undefined;
  last_update_by: string | null;
  backend_name: string | null;
}

interface VideoState {
  data: {
    video: Video | null | undefined;
    success: boolean;
  };
}

const initialState: VideoState = {
  data: {
    video: null,
    success: false,
  },
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideo: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setVideo } = videoSlice.actions;

export default videoSlice.reducer;
