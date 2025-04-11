import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'

export default function Home() {
  const { allProducts } = useContext(ProductContext)

  return (
    <div className="w-full min-h-screen bg-gray-100 font-['Roboto'] py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col"
          >
            <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <img
                src={product.productimages[0]?.url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
              {product.name}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>

            <div className="text-indigo-600 font-bold text-md mb-4">${product.price}</div>

            <button className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
