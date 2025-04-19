import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/authSlice.jsx";

export const Store = configureStore({
  reducer: {
    userData: userReducer,
  },
});

export default Store;
