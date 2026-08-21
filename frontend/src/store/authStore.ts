import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  roles: string[];
  accessToken: string | null;
  refreshToken: string | null;

  // Actions
  login: (accessToken: string, refreshToken: string, username: string, roles: string[]) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: null,
  roles: [],
  accessToken: null,
  refreshToken: null,

  login: (accessToken, refreshToken, username, roles) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    set({
      isAuthenticated: true,
      accessToken,
      refreshToken,
      username,
      roles,
    });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({
      isAuthenticated: false,
      username: null,
      roles: [],
      accessToken: null,
      refreshToken: null,
    });
  },

  setAccessToken: (token) => {
    localStorage.setItem('accessToken', token);
    set({ accessToken: token });
  },
}));
