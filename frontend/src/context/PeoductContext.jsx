import { createContext } from "react";

export const ProductContext = createContext();

export const ProdcutProvider = ({ children }) => {
  return (
    <ProductContext.Provider value={{}}>{children}</ProductContext.Provider>
  );
};
