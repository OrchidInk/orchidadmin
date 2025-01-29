import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://api.orchid.mn/api/v1/superadmin", // Base URL for your API
  timeout: 10000, // Timeout for API requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request/response interceptors for error handling/logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle errors globally here
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
