import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const AUTH_API = import.meta.env.VITE_BACKEND_AUTH_URL;

const handleError = (error, fallback = "Something went wrong!") => {
  console.error(error);
  toast.error(error?.response?.data?.message || error.message || fallback);
};

const Store = create((set) => ({
  isLoggedIn: false,

  register: async (userData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/register`, userData, {
        withCredentials: true,
      });
      toast.success(data.message || "Registration successful!");
      set({ isLoggedIn: true });
    } catch (error) {
      handleError(error, "Registration failed!");
      set({ isLoggedIn: false });
    }
  },

  login: async (userData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/login`, userData, {
        withCredentials: true,
      });
      toast.success(data.message || "Login successful!");
      set({ isLoggedIn: true });
    } catch (error) {
      handleError(error, "Login failed!");
      set({ isLoggedIn: false });
    }
  },

  logout: async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/logout`, {
        withCredentials: true,
      });
      toast.success(data.message || "Logout successful!");
      set({ isLoggedIn: false });
    } catch (error) {
      handleError(error, "Logout failed!");
    }
  },

  checkAuth: async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/check-auth`, {
        withCredentials: true,
      });
      set({ isLoggedIn: data?.isLoggedIn || false });
    } catch (error) {
      set({ isLoggedIn: false });
      handleError(error, "Failed to check login status!");
    }
  },
}));

export default Store;
