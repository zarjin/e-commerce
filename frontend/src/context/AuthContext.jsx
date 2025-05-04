import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const AuthContext = createContext();

const AUTH_API = import.meta.env.VITE_AUTH_API;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const register = async (userData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/register`, userData, {
        withCredentials: true,
      });

      setIsLoggedIn(true);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const login = async (userData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/login`, userData, {
        withCredentials: true,
      });

      setIsLoggedIn(true);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/logout`, {
        withCredentials: true,
      });

      setIsLoggedIn(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/check-auth`, {
        withCredentials: true,
      });

      setIsLoggedIn(data.authentication);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ register, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
