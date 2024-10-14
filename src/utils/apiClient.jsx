// src/utils/apiClient.js
import axios from 'axios';

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: "http://192.168.68.100:3000", // Your base URL here
});

// Optional: You can add interceptors for request/response logging or error handling
// apiClient.interceptors.response.use(
//   response => response,
//   error => {                                 
//     return Promise.reject(error);
//   }
// );

export default apiClient;
