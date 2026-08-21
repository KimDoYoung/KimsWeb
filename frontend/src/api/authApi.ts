import axiosInstance from '../utils/axios';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  roles: string[];
}

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  refresh: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const response = await axiosInstance.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  getCurrentUser: async (): Promise<{ username: string; roles: string[] }> => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
};
