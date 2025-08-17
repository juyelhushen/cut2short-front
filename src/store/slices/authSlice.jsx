import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // token: localStorage.getItem("token") || null,
    userId: "",
    name: "",
    username: "",
    profile: "",
  },
  reducers: {
    setUserData: (state, action) => {
      const { userId, name, username, profile } = action.payload;
      state.userId = userId;
      state.name = name;
      state.username = username;
      // state.token = token;
      state.profile = profile;
    },
    clearUserData: (state) => {
      state.userId = null;
      state.name = null;
      state.username = null;
      // state.token = null;
      state.profile = null;
    },
  },
});

export const { setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;
