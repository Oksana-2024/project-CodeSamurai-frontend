import axios from "axios";

export const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000"
});

export const setAuthHeader = (token) => {
  baseAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  baseAxios.defaults.headers.common.Authorization = "";
};