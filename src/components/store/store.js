import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import mailboxSlice from "./mailBoxSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    mailBox: mailboxSlice.reducer,
  },
});

export default store;
