import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const AUTH_API = import.meta.env.VITE_BACKEND_AUTH_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const register = async (formData) => {
    try {
      await axios.post(`${AUTH_API}/register`, formData, {
        withCredentials: true,
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Registration failed:", error.message);
      setIsLoggedIn(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${AUTH_API}/logout`, { withCredentials: true });
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ register, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
