import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

export default function SingleProductDetails() {
  const { id } = useParams()
  const [productDetails, setProductDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addCart } = useContext(CartContext)
  const { userData } = useContext(AuthContext)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        const PRODUCTS_URL = import.meta.env.VITE_BACKEND_PRODUCT_URL
        const { data } = await axios.get(`${PRODUCTS_URL}/product/${id}`, {
          withCredentials: true,
        })
        setProductDetails(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching product details:', error)
        toast.error('Failed to load product details')
        setLoading(false)
      }
    }

    if (id) {
      fetchProductDetails()
    }
  }, [id])

  const handleAddToCart = () => {
    if (!userData) {
      toast.error('Please log in to add items to cart')
      return
    }

    const addCartData = {
      products: [
        {
          productId: productDetails._id,
        },
      ],
    }
    addCart(addCartData)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-50 to-pink-50 flex items-center justify-center p-6">
        <div className="text-xl font-semibold text-gray-600">Loading product details...</div>
      </div>
    )
  }

  if (!productDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-50 to-pink-50 flex items-center justify-center p-6">
        <div className="text-xl font-semibold text-gray-600">Product not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2 h-80 bg-gray-100 rounded-2xl overflow-hidden">
            {productDetails.productimages && productDetails.productimages[0] ? (
              <img
                src={productDetails.productimages[0].url}
                alt={productDetails.name}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{productDetails.name}</h1>
            <p className="text-gray-600">{productDetails.description}</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-semibold text-purple-600">
                ${productDetails.price}
              </span>
              <span className="text-sm text-gray-500">/ unit</span>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
