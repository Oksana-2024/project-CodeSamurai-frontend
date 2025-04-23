import axios from "axios";

export const useAxios = (token) => {
  // Створюємо наш axios з параметрами
  const baseAxios = axios.create({
    baseURL:
      import.meta.env.VITE_API_URL ||
      "https://project-codesamurai-backend.onrender.com/",
    // Передаємо заголовки для авторизації, якшо авторизовані
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  });

  return baseAxios;
};