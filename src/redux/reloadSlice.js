import { createSlice } from "@reduxjs/toolkit";

export const reloadSlice = createSlice({
  name: "reload",
  initialState: {
    isRelaod: false,
  },
  reducers: {
    toggleReload: (state) => {
      state.isRelaod = !state.isRelaod;
    },
  },
});

export const { toggleReload } = reloadSlice.actions;

export default reloadSlice.reducer;
