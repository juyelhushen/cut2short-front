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

export const signin = async (data) => {
  try {
    const response = await AxiosInstance.post("/api/user/login", data);
    return response.data;
  } catch (error) {
    console.error("errror in signing in : ", error);
  }
};

export const handleGoogleCallback = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/auth/oauth2/callback"
    );
    const token = response.data.token;
    localStorage.setItem("jwt", token);
    console.log("Logged in with token:", token);
    return token;
  } catch (error) {
    console.error("Error during login:", error);
  }
};
