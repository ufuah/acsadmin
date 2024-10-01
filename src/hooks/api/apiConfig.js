// apiConfig.js
export const apiConfig = {
  baseURL: process.env.NODE_ENV === "production" 
    ? "https://api.e-palateoasis.com/api"  // Replace with your actual production API URL
    : "http://localhost:5000/api",    // Local development URL
  // Add other configurations as needed
};
