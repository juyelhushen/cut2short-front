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

export const signup = async (data) => {
  try {
    const response = await AxiosInstance.post("/api/user/register", data);
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

export const clearSeassionCookie = async () => {
  try {
    const response = await AxiosInstance.post("/api/user/logout");
    return response.data;
  } catch (error) {
    console.error("errror in logout in : ", error);
  }
};

export const fetchProfileInfo = async () => {
  try {
    const response = await AxiosInstance.get("/api/user/profile/info");
    return response.data;
  } catch (error) {
    console.error("errror in logout in : ", error);
  }
};

export const updateProfie = async (data) => {
  try {
    const response = await AxiosInstance.patch(
      "/api/user/profile/update",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
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
