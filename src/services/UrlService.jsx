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

export const getUrlsByUserId = async (userId, page, size) => {
  try {
    const response = await AxiosInstance.get(`/api/v1/url/get/${userId}`, {
      params: {
        page: page,
        size: size,
      },
    });
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

export const createUrlShort = async (payload) => {
  try {
    const response = await AxiosInstance.post(
      `/api/v1/url/shorten/set`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("error in fetching urls", error);
  }
};

export const getUrlById = async (id) => {
  try {
    const response = await AxiosInstance.get(`/api/v1/url/${id}`);
    return response.data;
  } catch (error) {
    console.error("error in fetching urls", error);
  }
};

export const updateUrl = async (payload) => {
  try {
    const response = await AxiosInstance.patch(`/api/v1/url/update`, payload);
    return response.data;
  } catch (error) {
    console.error("error in fetching urls", error);
  }
};

export const generateQRCode = async (data) => {
  try {
    const response = await AxiosInstance.post(`/api/v1/url/generate`, data);
    return response.data;
  } catch (error) {
    console.error("error in fetching urls", error);
  }
};

export const getQRCodeList = async (userId, page = 0, size = 5) => {
  try {
    const response = await AxiosInstance.get(
      `/api/v1/url/qrcode/list/${userId}`,
      {
        params: {
          page: page,
          size: size,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("error in fetching urls", error);
  }
};
