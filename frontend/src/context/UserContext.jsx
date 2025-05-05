import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const USER_API = import.meta.env.VITE_USER_API;
  const [authUserData, setAuthUserData] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

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

  const addCart = async (productId) => {
    try {
      const { data } = await axios.put(
        `${USER_API}/add-cart/${productId}`,
        {},
        { withCredentials: true }
      );
      getUserData(); // Refresh user data to update cart
      toast.success(data.message);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart. Please try again later.');
    }
  };

  const removeCart = async (productId) => {
    try {
      const { data } = await axios.post(
        `${USER_API}/remove-cart/${productId}`,
        {},
        { withCredentials: true }
      );
      getUserData(); // Refresh user data to update cart
      toast.success(data.message);
    } catch (error) {
      console.error('Error removing product from cart:', error);
      toast.error(
        'Failed to remove product from cart. Please try again later.'
      );
    }
  };

  const checkIsAdmin = async () => {
    try {
      const { data } = await axios.post(
        `${USER_API}/isAdmin`,
        {},
        {
          withCredentials: true,
        }
      );

      // Make sure we have a valid response with isAdmin property
      if (data && typeof data.isAdmin === 'boolean') {
        setIsAdmin(data.isAdmin);
        return data.isAdmin;
      } else {
        console.error('Invalid admin status response:', data);
        setIsAdmin(false);
        return false;
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      return false;
    }
  };

  useEffect(() => {
    getUserData();
    checkIsAdmin();
  }, []);

  return (
    <UserContext.Provider
      value={{
        updateUser,
        authUserData,
        deleteUser,
        addCart,
        removeCart,
        isAdmin,
        checkIsAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
