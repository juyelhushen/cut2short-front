import { AxiosInstance } from "./AxiosInstance";

export const makeShort = async (data) => {
  try {
    const response = await AxiosInstance.post("/api/v1/url/shorten", data, {
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
};

export const getUrlsByUserId = async (userId) => {
  try {
    const response = await AxiosInstance.get(`/api/v1/url/get/${userId}`);
    return response.data;
  } catch (error) {
    console.error("error in fetching urls", error);
  }
};

export const deleteUrlsId = async (id) => {
  try {
    const response = await AxiosInstance.delete(`/api/v1/url/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("error in deleting urls", error);
  }
};

export const createUrlShort = async (id) => {
  try {
    const response = await AxiosInstance.delete(`/api/v1/url/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("error in fetching urls", error);
  }
};
