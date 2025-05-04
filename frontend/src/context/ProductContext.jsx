import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
  const PRODUCT_API = import.meta.env.VITE_PRODUCT_API;

  const CreateProduct = async (productData) => {
    try {
      const { data } = await axios.post(
        `${PRODUCT_API}/create-product`,
        productData,
        { withCredentials: true }
      );
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const getProduct = async (productData, productId) => {
    try {
      const { data } = await axios.put(
        `${PRODUCT_API}/update-product/${productId}`,
        productData,
        { withCredentials: true }
      );
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <ProductContext.Provider value={{ CreateProduct, getProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
