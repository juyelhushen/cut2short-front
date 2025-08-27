import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 🚨 ensures cookies cross-origin
});

AxiosInstance.interceptors.request.use(
  (config) => {
    // If you later add manual Authorization header
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);
