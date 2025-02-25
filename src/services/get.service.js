import { axiosInstance } from "./token.service";
const BASE_URI = import.meta.env.VITE_API;

export const getData = async (url) => {
  try {
    const res = await axiosInstance.get(`${BASE_URI}${url}`);
    return res?.data;
  } catch (error) {
    return error?.response?.status;
  }
};

