import axios from "axios";
import Cookies from "js-cookie";
import { apiConfig } from "./apiConfig"; // Adjust according to your file structure

// Create an instance of axios
const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  withCredentials: true, // Ensures cookies (like auth tokens) are sent with every request
});

// Add interceptors if needed (optional but useful for token handling)
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken"); // Changed to accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Bearer token to headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optionally, you can add a response interceptor to handle errors globally
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized errors (token expired or invalid)
//       Cookies.remove("accessToken");
//       window.location.href = "/login"; // Redirect to login page or handle accordingly
//     }
//     return Promise.reject(error);
//   }
// );

// API methods for GET, POST, PUT, DELETE using async/await pattern

export const apiGet = async (endpoint, config = {}) => {
  const response = await apiClient.get(endpoint, config);
  return response;
};

export const apiPost = async (endpoint, data, config = {}) => {
  const response = await apiClient.post(endpoint, data, {
    ...config,
    withCredentials: true,
  });
  return response;
};

export const apiPut = async (endpoint, data, config = {}) => {
  const response = await apiClient.put(endpoint, data, {
    ...config,
    withCredentials: true,
  });
  return response;
};

export const apiDelete = async (endpoint, config = {}) => {
  const response = await apiClient.delete(endpoint, {
    ...config,
    withCredentials: true,
  });
  return response;
};
