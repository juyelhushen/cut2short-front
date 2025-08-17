import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// For OAuth endpoints, add withCredentials
AxiosInstance.interceptors.request.use((config) => {
  if (config.url.includes("/oauth2")) {
    config.withCredentials = true;
  }
  return config;
});
