


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,  // User data
  accessToken: null, // JWT Token
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.accessToken = action.payload;
      console.log("user from redux:",state.user);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
