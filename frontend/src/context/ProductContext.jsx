import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ProductContext = createContext();

export const ProdcutProvider = ({ children }) => {
  const PRODUCTS_URL = import.meta.env.VITE_BACKEND_PRODUCT_URL;

  const createProducts = async (productData) => {
    try {
      await axios.post(`${PRODUCTS_URL}/create`, productData, {
        withCredentials: true,
      });
      toast.success("Prodects Create successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <ProductContext.Provider value={{ createProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
