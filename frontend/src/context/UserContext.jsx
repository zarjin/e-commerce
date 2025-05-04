import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const USER_API = import.meta.env.VITE_USER_API;
  const [authUserData, setAuthUserData] = useState();

  const updateUser = async (updateData) => {
    try {
      const { data } = await axios.put(`${USER_API}/update-user`, updateData, {
        withCredentials: true,
      });
      getUserData();
      toast.success(data.message);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user. Please try again later.');
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${USER_API}/get-user`, {
        withCredentials: true,
      });
      setAuthUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to fetch user data. Please try again later.');
    }
  };

  const deleteUser = async () => {
    try {
      const { data } = await axios.delete(`${USER_API}/delete-user`, {
        withCredentials: true,
      });
      toast.success(data.message);
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user. Please try again later.');
    }
  };

  useEffect(() => {
    getUserData();
  });

  return (
    <UserContext.Provider value={{ updateUser, authUserData, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
