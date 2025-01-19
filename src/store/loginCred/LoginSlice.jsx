import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "user",
  initialState: {
    name: localStorage.getItem('name') || '',
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
  },
  reducers: {
    setUserData: (state, action) => {
      const { name, username, token } = action.payload;
      state.name = name;
      state.username = username;
      state.token = token;
    },
    clearUserData: (state) => {
      state.name = null;
      state.username = null;
      state.token = null;
    },
  },
});

export const { setUserData, clearUserData } = loginSlice.actions;
export default loginSlice.reducer;
