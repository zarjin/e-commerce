import React, { useContext } from 'react'
import { Link } from 'react-router'
import { ProductContext } from '../context/ProductContext'

export default function UserCreateProducts() {
  const { userProducts, deleteProduct } = useContext(ProductContext)

  if (!Array.isArray(userProducts)) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500">Loading products...</div>
    )
  }

  if (userProducts.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500">
        No products found. Create your first product!
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen">
      {userProducts.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
        >
          <img
            src={product.productimages[0]?.url || '/placeholder-image.jpg'}
            alt={product.name || 'Product image'}
            className="h-48 w-full object-cover"
          />

          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
              {product.name || 'Untitled Product'}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {product.description || 'No description available'}
            </p>

            <span className="text-indigo-600 font-medium mb-4">
              {product.price ? `$${product.price.toFixed(2)}` : 'Price: N/A'}
            </span>

            <div className="mt-auto flex gap-2">
              <Link to={`/edit-products/${product._id}`}>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm transition">
                  Edit
                </button>
              </Link>

              <button
                onClick={() => deleteProduct(product._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
