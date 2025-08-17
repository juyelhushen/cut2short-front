import axios from "axios";
import { AxiosInstance } from "./AxiosInstance";
import { setUserData } from "../store/slices/authSlice";

export const getUserInfo = async () => {
  try {
    const response = await AxiosInstance.get("/api/user/me", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("errror in fetching userdata", error);
  }
};

export const signup = async (data, dispatch) => {
  try {
    const response = await AxiosInstance.post("/api/user/register", data);
    const { name, username, token, userId } = response.data.data;

    //storing
    localStorage.setItem("userId", userId);
    localStorage.setItem("name", name);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);

    //dispatch
    dispatch(
      setUserData({
        userId: userId,
        name: name,
        username: username,
        token: token,
      })
    );

    return response.data;
  } catch (error) {
    console.error("errror in signing up : ", error);
  }
};

export const signin = async (data, dispatch) => {
  try {
    const response = await AxiosInstance.post("/api/user/login", data);
    const { userId, name, username, token } = response.data.data;

    //storing
    localStorage.setItem("userId", userId);
    localStorage.setItem("name", name);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);

    //dispatch
    dispatch(
      setUserData({
        userId: userId,
        name: name,
        username: username,
        token: token,
      })
    );

    return response.data;
  } catch (error) {
    console.error("errror in signing in : ", error);
  }
};
export const getTest = async () => {
  try {
    const response = await AxiosInstance.get("/api/user");
    return response;
  } catch (error) {
    console.error("errror in signing in : ", error);
  }
};
