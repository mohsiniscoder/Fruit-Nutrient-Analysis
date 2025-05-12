import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.yourdomain.com",
  timeout: 10000,                   // 10s timeout
  withCredentials: true,            // send cookies if you use them
  headers: {
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff",    // secure header hint
  },
});

// Request interceptor: attach JWT, CSRF token, device ID, etc.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const csrf = localStorage.getItem("csrf_token");
  if (csrf) {
    config.headers["X-CSRF-Token"] = csrf;
  }
  return config;
});

export default api;
