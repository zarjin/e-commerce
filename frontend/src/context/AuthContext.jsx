import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const AUTH_API = import.meta.env.VITE_BACKEND_AUTH_URL;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const register = async (formData) => {
    try {
      await axios.post(`${AUTH_API}/register`, formData, {
        withCredentials: true,
      });
      toast.success("User registered successfully");
      setIsLoggedIn(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      setIsLoggedIn(false);
    }
  };

  const login = async (formData) => {
    try {
      await axios.post(`${AUTH_API}/login`, formData, {
        withCredentials: true,
      });
      toast.success("User login success");
      setIsLoggedIn(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      setIsLoggedIn(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${AUTH_API}/logout`, { withCredentials: true });
      toast.success("Logout success");
      setIsLoggedIn(false);
      setUserData(null);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/user`, {
        withCredentials: true,
      });

      setUserData(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/check-auth`, {
        withCredentials: true,
      });
      setIsLoggedIn(data.authenticated);
    } catch (error) {
      toast.error(error.message);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ register, login, logout, isLoggedIn, fetchUserData, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
