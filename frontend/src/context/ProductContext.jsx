import { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';

export const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
  const PRODUCT_API = import.meta.env.VITE_PRODUCT_API;
  const [allProduct, setAllProduct] = useState([]);
  const [adminProduct, setAdminProduct] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const createProduct = async (productData) => {
    try {
      const { data } = await axios.post(
        `${PRODUCT_API}/create-product`,
        productData,
        { withCredentials: true }
      );
      await getAllProduct();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  const updateProduct = async (productData, productId) => {
    try {
      const { data } = await axios.put(
        `${PRODUCT_API}/update-product/${productId}`,
        productData,
        { withCredentials: true }
      );
      await getAllProduct();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(`${PRODUCT_API}/get-all-products`);
      setAllProduct(data.products);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  const getAdminProduct = async () => {
    try {
      const { data } = await axios.get(`${PRODUCT_API}/get-admin-products`, {
        withCredentials: true,
      });
      setAdminProduct(data.products);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  const getProductById = async (productId) => {
    try {
      const { data } = await axios.get(`${PRODUCT_API}/product/${productId}`);
      return data.product;
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || 'Failed to fetch product details'
      );
      return null;
    }
  };

  useEffect(() => {
    getAllProduct();
    if (isLoggedIn) {
      getAdminProduct();
    }
  }, [isLoggedIn]);

  return (
    <ProductContext.Provider
      value={{
        createProduct,
        updateProduct,
        allProduct,
        adminProduct,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
