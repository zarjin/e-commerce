import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const CART_API = import.meta.env.VITE_BACKEND_CART_URL
  const [cartData, setCartData] = useState([])

  const addCart = async (CartAddData) => {
    try {
      await axios.post(`${CART_API}/add`, CartAddData, { withCredentials: true })
      toast.success('Added to Cart Successfully')
      getAllCart() // Refresh cart data after adding
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Failed to add to cart')
    }
  }

  const removeFromCart = async (cartId, productId) => {
    try {
      await axios.delete(`${CART_API}/remove-item/${cartId}/${productId}`, {
        withCredentials: true,
      })
      toast.success('Item removed from cart')
      getAllCart() // Refresh cart data after removing
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Failed to remove item')
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

  return (
    <CartContext.Provider value={{ addCart, removeFromCart, cartData, getAllCart }}>
      {children}
    </CartContext.Provider>
  )
}
