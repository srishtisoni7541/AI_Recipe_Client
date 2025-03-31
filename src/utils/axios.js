import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api', 
  withCredentials: true, 
  "Cache-Control": "no-cache",
});

// Request Interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor 
API.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.error('API Error:', error.response?.data?.message || error.message);
  return Promise.reject(error);
});

export default API;
