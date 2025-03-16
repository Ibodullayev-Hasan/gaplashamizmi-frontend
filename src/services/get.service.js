// import React from "react";
import { axiosInstance } from "./token.service";
const BASE_URL = import.meta.env.VITE_API;

export const getData = async (url) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}${url}`);   
    return res?.data;
  } catch (error) {
    return error?.response?.status;
  }
};
