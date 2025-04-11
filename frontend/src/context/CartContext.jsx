import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const CartContext = createContext()

export const CartProcider = ({ children }) => {
  const CART_API = import.meta.env.VITE_BACKEND_CART_URL
  const [CartData, setCartData] = useState([])
  const addCart = async (CartAddData) => {
    try {
      await axios.post(`${CART_API}/add`, CartAddData, { withCredentials: true })
      toast.success('Add Cart SuccessFully')
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getAllCart = async () => {
    try {
      const { data } = await axios.get(`${CART_API}/get-cart`, { withCredentials: true })

      setCartData(data)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getAllCart()
  }, [])

  return <CartContext.Provider value={{ addCart, CartData }}>{children}</CartContext.Provider>
}
