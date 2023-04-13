import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    idToken: localStorage.getItem("idToken"),
  },

  reducers: {
    login(state, action) {
      state.idToken = localStorage.setItem("idToken", action.payload);
      state.idToken = action.payload;
      state.isLogin = true;
    },
    logout(state, action) {
      state.isLogin = false;
      state.idToken = localStorage.removeItem("idToken");
    },
  },
});

export const authSliceActions = authSlice.actions;
export default authSlice;
