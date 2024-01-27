import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_APP_SERVER_API;

/**
 * instance axios pour les requetes public pas necessaire d'etre authentifié
 */
export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const adminInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const TOKEN_AUTHORIZATION = Cookies.get(import.meta.env.VITE_TOKEN_STORAGE);

adminInstance.interceptors.request.use(
  (request) => {
    request.headers.Authorization = `Bearer ${TOKEN_AUTHORIZATION?.trim()}`;
    return request;
  },
  (error) => {
    if (error.response) {
      const apiError = error.response?.data;
      return Promise.reject(apiError);
    }
    return Promise.reject(error);
  }
);
