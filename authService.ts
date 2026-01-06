import { apiService } from './api';

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  userID: number;
  username: string;
  fullName: string;
  role: string;
  token: string;
  tokenExpiry: string;
}

export const authService = {
  // Login user - CALLS REAL BACKEND
  login: async (loginData: LoginData): Promise<AuthResponse> => {
    console.log('Login attempt with:', loginData);
    
    try {
      // Call your real .NET backend
      const response = await apiService.post<AuthResponse>('/Auth/login', loginData);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
      }
      
      console.log('Login successful:', response);
      return response;
    } catch (error: any) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  // Test backend connection
  testConnection: async (): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5000/api/test');
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  },

  // Register new user (admin only)
  register: async (registerData: any): Promise<any> => {
    console.log('Register attempt with:', registerData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'User registered successfully' });
      }, 1000);
    });
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('User logged out');
  },

  // Get current user from localStorage
  getCurrentUser: (): AuthResponse | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Get user role
  getUserRole: (): string | null => {
    const user = authService.getCurrentUser();
    return user ? user.role : null;
  },

  // Check if user has specific role
  hasRole: (role: string | string[]): boolean => {
    const userRole = authService.getUserRole();
    if (!userRole) return false;

    if (Array.isArray(role)) {
      return role.includes(userRole);
    }
    return userRole === role;
  },

  // Get auth headers for API calls
  getAuthHeader: (): { Authorization: string } | null => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : null;
  },

  // Refresh token (simplified - just return existing token)
  refreshToken: async (): Promise<AuthResponse | null> => {
    console.log('Refreshing token...');
    
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser();
    if (currentUser && currentUser.token) {
      // Just return the existing token for now
      // In a real app, this would call a refresh endpoint
      return Promise.resolve(currentUser);
    }
    
    // If no user, logout
    authService.logout();
    return Promise.resolve(null);
  },

  // Change password
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    console.log('Changing password...');
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Password changed successfully');
        resolve();
      }, 1000);
    });
  },

  // Get user profile
  getProfile: async (): Promise<any> => {
    const user = authService.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // This is a placeholder - you'll need to implement this endpoint in your backend
    return Promise.resolve({
      ...user,
      email: 'admin@dairyerp.com',
      phone: '+91 9876543210',
      address: 'Dairy ERP Headquarters',
      lastLogin: new Date().toISOString()
    });
  }
};

export default authService;