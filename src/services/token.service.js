import axios from "axios";

const BASE_URL = import.meta.env.VITE_API;

// Axios instance yaratish
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor – access_token localStorage'dan olinadi
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – access_token yangilash
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // API ga refresh request yuborish
        const { data } = await axiosInstance.post(`${BASE_URI}auth/refresh`);

        // Yangi tokenlarni localStorage'da saqlash
        localStorage.setItem("access_token", data.accToken);
        localStorage.setItem("refresh_token", data.refToken);

        originalRequest.headers.Authorization = `Bearer ${data.accToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Token yangilashda xatolik:", err);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
