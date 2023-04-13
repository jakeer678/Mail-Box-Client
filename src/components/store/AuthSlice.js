import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    idToken: localStorage.getItem("idToken"),
  },

  reducers: {
    login(state, action) {
      state.idToken = localStorage.setItem("", action.payload);
      state.idToken = action.payload;
      state.isLogin = true;
    },
    logout(state, action) {
      state.isLogin = false;
      state.idToken = localStorage.clear();
    },
  },
});

export const authSliceActions = authSlice.actions;
export default authSlice;
