import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./loginCred/LoginSlice.jsx";

export const Store = configureStore({
  reducer: {
    userData: userReducer,
  },
});

export default Store;
