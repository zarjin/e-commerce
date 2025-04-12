import React, { useContext } from 'react'
import { Link } from 'react-router'
import { CartContext } from '../context/CartContext'

export default function CartProduct() {
  const { CartData, removeFromCart } = useContext(CartContext)

  if (!CartData || CartData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Browse Products
            </button>
          </Link>
        </div>
      </div>
    )
  }

  // Calculate total price
  const calculateTotal = () => {
    let total = 0
    CartData.forEach((cart) => {
      cart.products.forEach((product) => {
        if (product.productId && product.productId.price) {
          total += product.productId.price
        }
      })
    })
    return total.toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
          {CartData.map((cart) => (
            <div key={cart._id}>
              {cart.products.map((item) => (
                <div key={item._id} className="border-b border-gray-200 last:border-b-0">
                  <div className="flex flex-col md:flex-row items-center p-6">
                    <div className="w-full md:w-24 h-24 bg-gray-200 rounded-lg overflow-hidden mb-4 md:mb-0 md:mr-6">
                      {item.productId &&
                      item.productId.productimages &&
                      item.productId.productimages[0] ? (
                        <img
                          src={item.productId.productimages[0].url}
                          alt={item.productId.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.productId ? item.productId.name : 'Product Not Available'}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {item.productId ? item.productId.description : ''}
                      </p>
                      <div className="text-indigo-600 font-bold">
                        ${item.productId ? item.productId.price : '0.00'}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(cart._id, item.productId._id)}
                      className="mt-4 md:mt-0 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-gray-800">Subtotal:</span>
            <span className="text-lg font-bold text-gray-800">${calculateTotal()}</span>
          </div>

          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
