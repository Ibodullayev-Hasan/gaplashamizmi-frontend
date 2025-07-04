import axios from "axios";
const BASE_URL = import.meta.env.VITE_API;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      try {
        const rawToken = localStorage.getItem("accToken");
        if (rawToken && rawToken !== "undefined") {
          const accessToken = JSON.parse(rawToken);
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (e) {
        localStorage.removeItem("accToken");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

