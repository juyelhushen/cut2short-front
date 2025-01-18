import { AxiosInstance } from "./AxiosInstance";

export const makeShort = async (data) => {
  try {
    const response = await AxiosInstance.post("/api/url/shorten", data, {
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
};
