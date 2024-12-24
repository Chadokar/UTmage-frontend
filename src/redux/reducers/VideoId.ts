import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoIdState {
  data: any;
}

const initialState: VideoIdState = {
  data: null,
};

export const videoIdSlice = createSlice({
  name: "videoId",
  initialState,
  reducers: {
    setVideoId: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setVideoId } = videoIdSlice.actions;

export default videoIdSlice.reducer;
