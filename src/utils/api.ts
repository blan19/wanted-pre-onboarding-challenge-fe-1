import axios from "axios";
import { API_URL } from "../constants/api";

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("auth");
    if (token && config.headers) {
      config.headers["Content-Type"] = "application/json";
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use();

export default instance;
