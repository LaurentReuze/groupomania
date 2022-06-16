import { createSlice } from "@reduxjs/toolkit";

export const connexionsSlice = createSlice({
  name: "connexions",
  initialState: {
    connexions: null,
  },
  reducers: {
    setConnexionsData: (state, { payload }) => {
      state.connexions = payload;
    },
  },
});

export const { setConnexionsData } = connexionsSlice.actions;
export default connexionsSlice.reducer;
