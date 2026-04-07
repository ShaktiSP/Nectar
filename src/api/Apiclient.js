import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL for all API requests
export const BASE_URL = 'https://dummyjson.com';

// Create a custom Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,     // All requests will use this base URL
  timeout: 10000,        // Request timeout (10 seconds)
  headers: {
    'Content-Type': 'application/json', // Sending JSON data
    Accept: 'application/json',         // Expecting JSON response
  },
});

// ── Request Interceptor
// This runs before every API request
apiClient.interceptors.request.use(
  async config => {
    // Get access token from AsyncStorage
    const token = await AsyncStorage.getItem('accessToken');

    // If token exists, attach it to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return modified config
    return config;
  },
  error => {
    // Handle request error
    return Promise.reject(error);
  },
);

// ── Response Interceptor
// This runs after every API response
apiClient.interceptors.response.use(
  response => {
    // If response is successful, just return it
    return response;
  },
  error => {
    // Handle response errors globally (e.g., 401, 500, etc.)
    // You can add logic here like auto logout or token refresh
    return Promise.reject(error);
  },
);

export default apiClient;