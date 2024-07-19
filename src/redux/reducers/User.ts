import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  data: any;
}

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
