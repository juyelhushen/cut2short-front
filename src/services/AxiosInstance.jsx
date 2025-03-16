import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
