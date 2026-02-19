import { useTokenStore } from "@/stores/token/token.store";
import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useTokenStore.getState().accessToken;

    if (token) {
      config.headers?.set("Authorization", `Bearer ${token}`);
    }

    return config;
  }
);

export default axiosInstance;
