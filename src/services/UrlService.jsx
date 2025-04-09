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

export const getUrlsByUserId = async (userId) => {
  try {
    const response = await AxiosInstance.get(`/api/url/get/${userId}`);
    return response.data;
  } catch (error) {
    console.error("error in fetching urls", error);
  }
};


export const deleteUrlsByUserId = async (id) => {
  try {
    const response = await AxiosInstance.delete(`/api/url/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("error in fetching urls", error);
  }
};

export const createUrlShort = async (id) => {
  try {
    const response = await AxiosInstance.delete(`/api/url/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("error in fetching urls", error);
  }
};



