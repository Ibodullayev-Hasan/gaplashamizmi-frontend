import { axiosInstance } from "./token.service";


const BASE_URI = import.meta.env.VITE_API;

export const getData = async (url) => {
  try {
    const accessToken = localStorage.getItem("access_token"); // localStorage'dan token olish

    const res = await axiosInstance.get(`${BASE_URI}${url}`, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      withCredentials: true, // Cookie o‘rniga localStorage ishlatilmoqda, lekin credentials yuborish kerak bo‘lsa qoldiramiz
    });

    return res?.data;
  } catch (error) {
    return error?.response?.status;
  }
};