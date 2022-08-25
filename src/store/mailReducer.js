import { createSlice } from "@reduxjs/toolkit";
// this component is for sent mails only
const initialEmailState = {
  items: [],
};

const mailSlice = createSlice({
  name: "sent",
  initialState: initialEmailState,
  reducers: {
    replace(state, action) {
      console.log(action.payload);
      state.items = action.payload;
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
