import { createSlice } from "@reduxjs/toolkit";

const mailboxSlice = createSlice({
  name: "mailBox",
  initialState: {
    mails: [],
  },
  reducers: {
    mailSending(state, action) {
      state.mails = [...action.payload];
    },
    marksAsread(state, action) {
      const mailId = action.payload;
      const mail = state.mails.find((mail) => mail.id === mailId);
      if (mail) {
        mail.read = true;
      }
    },
  },
});

export const mailSliceActions = mailboxSlice.actions;
export default mailboxSlice;
