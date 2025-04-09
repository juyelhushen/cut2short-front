import axios from "axios";
import { setUserData } from "../store/loginCred/LoginSlice";
import { AxiosInstance } from "./AxiosInstance";

export const getUserInfo = async () => {
  AxiosInstance.get("/api/user/info", { withCredentials: true })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log("error occured : ", error));
};

export const signup = async (data, dispatch) => {
  try {
    const response = await AxiosInstance.post("/api/user/register", data);
    const { name, username, token } = response.data.data;

    //storing
    localStorage.setItem("name", name);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);

    //dispatch
    dispatch(
      setUserData({
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

export const signin = async (data,dispatch) => {
  try {
    const response = await AxiosInstance.post("/api/user/login", data);
    const {userId, name, username, token } = response.data.data;

    //storing
    localStorage.setItem("userId", userId);
    localStorage.setItem("name", name);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);

    //dispatch
    dispatch(
      setUserData({
        userId:userId,
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
