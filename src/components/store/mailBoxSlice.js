import { createSlice } from "@reduxjs/toolkit";

const mailboxSlice = createSlice({
  name: "mailBox",
  initialState: {
    mails: [],
  },
  reducers: {
    mailSending(state, action) {
      state.mails = [...action.payload];
      console.log(action.payload, "llll");
      console.log(state.mails, "pppp");
    },
  },
});

export const mailSliceActions = mailboxSlice.actions;
export default mailboxSlice;
