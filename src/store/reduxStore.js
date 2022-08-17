import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import inboxMailReducer from "./inboxMailReducer";
import mailReducer from "./mailReducer";
const store = configureStore({
  reducer: { auth: authReducer, sent: mailReducer, inbox: inboxMailReducer },
});
export default store;
