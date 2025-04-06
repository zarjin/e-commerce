import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,

  register: async (registerUserData) => {
    set({ isLoading: true });
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_AUTH_URL}/register`,
        registerUserData,
        { withCredentials: true },
      );
      set({ isAuthenticated: true, error: null });
    } catch (error) {
      console.error('Registration error:', error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          'Registration failed',
      });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (loginUserData) => {
    set({ isLoading: true });
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_AUTH_URL}/login`,
        loginUserData,
        { withCredentials: true },
      );
      set({ isAuthenticated: true, error: null });
    } catch (error) {
      console.error('Login error:', error);
      set({
        error: error.response?.data?.message || error.message || 'Login failed',
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_AUTH_URL}/logout`,
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ isAuthenticated: false, error: null });
    }
  },
}));

export default useAuthStore;
