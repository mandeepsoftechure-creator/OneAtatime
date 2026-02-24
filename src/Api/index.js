// src/api/index.js
import axios from 'axios';
import { API_KEY, BASE_URL } from '../constant/api';
import { getUserData } from '../Data/asyncStorage';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 
    'Content-Type': 'application/json',
    'api-key': API_KEY,
  }
});

// Add an interceptor to include the Authorization header
api.interceptors.request.use(
  async config => {
    const userData = await getUserData();
    if (userData && userData.access_token) {
      config.headers.Authorization = `Bearer ${userData.access_token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;