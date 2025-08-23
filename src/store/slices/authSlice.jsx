import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: "",
    name: "",
    username: "",
    profile: "",
    email: '',
  },
  reducers: {
    setUserData: (state, action) => {
      const { userId, name, username, profile, email } = action.payload;
      state.userId = userId;
      state.name = name;
      state.username = username;
      state.profile = profile;
      state.email = email;
    },
    clearUserData: (state) => {
      state.userId = null;
      state.name = null;
      state.username = null;
      state.profile = null;
      state.email = null;
    },
  },
});

export const { setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;
