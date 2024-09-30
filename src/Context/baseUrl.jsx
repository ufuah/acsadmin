import axios from 'axios';

// Create an instance of axios with a base URL
const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
});

// Export the axios instance
export default axiosInstance;
