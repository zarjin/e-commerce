import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const PRODUCTS_URL = import.meta.env.VITE_BACKEND_PRODUCT_URL

  const [userProducts, setUserProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])

  const handleError = (error, fallback = 'Something went wrong') => {
    const msg = error?.response?.data?.message || error.message || fallback
    toast.error(msg)
  }

  const createProduct = async (productData) => {
    try {
      await axios.post(`${PRODUCTS_URL}/create`, productData, {
        withCredentials: true,
      })
      toast.success('Product created successfully')
      getUserProducts() // optional refresh
    } catch (error) {
      handleError(error)
    }
  }

  const editProduct = async (productData, id) => {
    try {
      await axios.put(`${PRODUCTS_URL}/edit/${id}`, productData, {
        withCredentials: true,
      })
      toast.success('Product updated successfully')
      getUserProducts() // optional refresh
    } catch (error) {
      handleError(error)
    }
  }

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${PRODUCTS_URL}/delete/${id}`, {
        withCredentials: true,
      })
      toast.success('Product deleted successfully')
      getUserProducts() // optional refresh
    } catch (error) {
      handleError(error)
    }
  }

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${PRODUCTS_URL}/getall-products`, {
        withCredentials: true,
      })
      setAllProducts(data)
    } catch (error) {
      handleError(error)
    }
  }

  const getUserProducts = async () => {
    try {
      const { data } = await axios.get(`${PRODUCTS_URL}/user-products`, {
        withCredentials: true,
      })
      setUserProducts(data.products || [])
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    getUserProducts()
    getAllProducts()
  }, [])

  return (
    <ProductContext.Provider
      value={{
        createProduct,
        editProduct,
        deleteProduct,
        getAllProducts,
        getUserProducts,
        userProducts,
        allProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
