import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  withCredentials: true
});

// Diagnostic logging
api.interceptors.request.use((config) => {
  console.log(`[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const fullUrl = `${error.config?.baseURL}${error.config?.url}`;
  console.error(`[API Error] Destination: ${fullUrl}`);
  console.error(`[API Error] Message: ${error.message}`);
  return Promise.reject(error);
});

// We'll manually set the header when we have the token
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
