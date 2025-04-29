import axios from "axios";

export const monoAPI = axios.create({
  baseURL: "https://api.monobank.ua/",
});
