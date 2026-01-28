import axios from "axios";

const BASE_URL = "https://swapi.dev/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log("API Request:", config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    if (__DEV__) {
      console.error("Request Error:", error);
    }
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log("API Response:", response.config.url, response.status);
    }
    return response;
  },
  (error) => {
    if (__DEV__) {
      console.error("Response Error:", error.response?.status, error.message);
    }
    if (error.response) {
      const message = error.response.data?.detail || "An error occurred";
      return Promise.reject(new Error(message));
    } else if (error.request) {
      return Promise.reject(
        new Error("Network error. Please check your connection."),
      );
    } else {
      return Promise.reject(new Error("An unexpected error occurred"));
    }
  },
);

export default apiClient;
