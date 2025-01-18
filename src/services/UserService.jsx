import { AxiosInstance } from "./AxiosInstance";

export const getUserInfo = async () => {
  AxiosInstance.get("/api/user/info", { withCredentials: true })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log("error occured : ", error));
};

export const getHelloWorld = () => {
  
}
