import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ProductContext } from '../context/ProductContext'

export default function EditProducts() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { editProduct } = useContext(ProductContext)
  const PRODUCTS_URL = import.meta.env.VITE_BACKEND_PRODUCT_URL

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [stock, setStock] = useState('')
  const [productImage, setProductImage] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch product data when component mounts
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${PRODUCTS_URL}/product/${id}`, {
          withCredentials: true,
        })

        // Populate form fields with existing data
        setName(data.name || '')
        setDescription(data.description || '')
        setPrice(data.price || '')
        setCategory(data.category || '')
        setBrand(data.brand || '')
        setStock(data.stock || '')
        setLoading(false)
      } catch (error) {
        console.error('Error fetching product data:', error)
        alert('Failed to load product data. Please try again.')
        navigate('/')
      }
    }

    if (id) {
      fetchProductData()
    }
  }, [id, PRODUCTS_URL, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', Number(price))
    formData.append('category', category)
    formData.append('brand', brand)
    formData.append('stock', stock)
    if (productImage) {
      formData.append('productimages', productImage)
    }

    try {
      await editProduct(formData, id)
      setName('')
      setBrand('')
      setCategory('')
      setDescription('')
      setPrice('')
      setStock('')
      setProductImage(null)
      navigate('/')
    } catch (error) {
      console.error(error)
      alert('Something went wrong while editing the product. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading product data...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 space-y-6 border border-purple-100"
      >
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center mb-8">
          Edit Product
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition duration-200 bg-white/50 backdrop-blur-sm"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition duration-200 bg-white/50 backdrop-blur-sm"
          />
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition duration-200 bg-white/50 backdrop-blur-sm"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition duration-200 bg-white/50 backdrop-blur-sm"
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition duration-200 bg-white/50 backdrop-blur-sm"
          />
        </div>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition duration-200 h-24 bg-white/50 backdrop-blur-sm resize-none"
        />

        <div className="relative">
          <input
            type="file"
            onChange={(e) => setProductImage(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer bg-white/50 rounded-xl border border-purple-200 backdrop-blur-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Update Product
        </button>
      </form>
    </div>
  )
}
