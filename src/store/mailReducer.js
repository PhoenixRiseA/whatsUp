import { createSlice } from "@reduxjs/toolkit";
// this component is for sent mails only
const initialEmailState = {
  items: [],
};

const mailSlice = createSlice({
  name: "mail",
  initialState: initialEmailState,
  reducers: {
    replace(state, action) {
      state.items = action.payload.items;
    },
    mail(state, action) {
      const newItem = action.payload;
      state.items.push({
        sub: newItem.sub,
        toEmail: newItem.toEmail,
        from: newItem.fromEmail,
        text: newItem.text,
        seen: newItem.seen,
        date: newItem.date,
      });
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
