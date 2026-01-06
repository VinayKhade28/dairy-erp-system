import axios from 'axios';
import { authService } from './authService';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE_URL); // Add this for debugging

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor - Add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        console.log('Attempting token refresh...');
        const refreshed = await authService.refreshToken();
        
        if (refreshed && refreshed.token) {
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${refreshed.token}`;
          return api(originalRequest);
        } else {
          // If refresh fails, logout user
          console.log('Token refresh failed, logging out...');
          authService.logout();
          window.location.href = '/login';
          return Promise.reject(new Error('Session expired. Please login again.'));
        }
      } catch (refreshError) {
        console.error('Token refresh error:', refreshError);
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response) {
      // Server responded with error
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url
      });
      
      // Extract error message
      let errorMessage = 'An error occurred';
      if (error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      }
      
      // Create user-friendly error
      const userError = new Error(errorMessage);
      userError.name = `HTTP_${error.response.status}`;
      return Promise.reject(userError);
      
    } else if (error.request) {
      // Request was made but no response
      console.error('Network Error:', error.request);
      return Promise.reject(new Error('Network error. Please check your internet connection.'));
    } else {
      // Something else happened
      console.error('Request Setup Error:', error.message);
      return Promise.reject(error);
    }
  }
);

// Helper functions for common HTTP methods
export const apiService = {
  // GET request
  get: async <T>(url: string, params?: any): Promise<T> => {
    const response = await api.get<T>(url, { params });
    return response.data;
  },

  // POST request
  post: async <T>(url: string, data?: any): Promise<T> => {
    const response = await api.post<T>(url, data);
    return response.data;
  },

  // PUT request
  put: async <T>(url: string, data?: any): Promise<T> => {
    const response = await api.put<T>(url, data);
    return response.data;
  },

  // DELETE request
  delete: async <T>(url: string): Promise<T> => {
    const response = await api.delete<T>(url);
    return response.data;
  },

  // PATCH request
  patch: async <T>(url: string, data?: any): Promise<T> => {
    const response = await api.patch<T>(url, data);
    return response.data;
  },

  // Upload file
  upload: async <T>(url: string, file: File, fieldName: string = 'file'): Promise<T> => {
    const formData = new FormData();
    formData.append(fieldName, file);
    
    const response = await api.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default api;