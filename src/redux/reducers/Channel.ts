import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChannelState {
  data: any;
}

const initialState: ChannelState = {
  data: null,
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannel: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setChannel } = channelSlice.actions;

export default channelSlice.reducer;
