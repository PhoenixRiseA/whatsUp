import { createSlice } from "@reduxjs/toolkit";

const initialEmailState = {
  items: [],
};

const inboxMailSlice = createSlice({
  name: "inbox",
  initialState: initialEmailState,
  reducers: {
    replace(state, action) {
      state.items = action.payload.items;
    },
    inbox(state, action) {
      const newItem = action.payload;
      state.items.push({
        sub: newItem.sub,
        toEmail: newItem.fromEmail,
        from: newItem.toEmail,
        text: newItem.text,
        seen: newItem.seen,
        date: newItem.date,
      });
    },
  },
});

export const inboxMailActions = inboxMailSlice.actions;
export default inboxMailSlice.reducer;
