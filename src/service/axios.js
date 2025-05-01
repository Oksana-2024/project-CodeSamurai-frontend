import axios from "axios";

export const useAxios = (token) => {
  const baseAxios = axios.create({
    baseURL:
      import.meta.env.VITE_API_URL ||
      "https://project-codesamurai-backend.onrender.com",

    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  });

  return baseAxios;
};
