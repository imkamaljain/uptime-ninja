import axios from "axios";

// Create an Axios instance with base config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage or cookies (adjust as needed)
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Optional: response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle 401/403 errors here, redirect to login, etc.
    return Promise.reject(error);
  },
);

export default api;
