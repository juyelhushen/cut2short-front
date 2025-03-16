import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "user",
  initialState: {
    userId: localStorage.getItem("userId") || "",
    name: localStorage.getItem("name") || "",
    username: localStorage.getItem("username") || "",
    token: localStorage.getItem("token") || "",
  },
  reducers: {
    setUserData: (state, action) => {
      const { userId, name, username, token } = action.payload;
      state.userId = userId;
      state.name = name;
      state.username = username;
      state.token = token;
    },
    clearUserData: (state) => {
      state.userId = null;
      state.name = null;
      state.username = null;
      state.token = null;
    },
  },
});

export const { setUserData, clearUserData } = loginSlice.actions;
export default loginSlice.reducer;
