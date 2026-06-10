import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  // Register user
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 30 });
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  // Login user
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 30 });
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  // Logout user
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove('token');
      localStorage.removeItem('user');
    }
  },

  // Get current user
  getCurrentUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!Cookies.get('token');
  }
};

export default api;
