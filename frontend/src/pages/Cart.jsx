import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Cart() {
  const { authUserData, removeCart } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const USER_API = import.meta.env.VITE_USER_API;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${USER_API}/getCart`, {
          withCredentials: true,
        });
        setCartItems(data.cart || []);

        // Calculate total price
        let total = 0;
        if (data.cart && data.cart.length > 0) {
          data.cart.forEach((item) => {
            if (item.productId && item.productId.price) {
              total += item.productId.price;
            }
          });
        }
        setTotalPrice(total);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [USER_API, authUserData]);

  const handleRemoveFromCart = async (productId) => {
    await removeCart(productId);
  };

  if (loading) {
    return (
      <main className="w-full min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <p className="text-xl text-gray-600">Loading your cart...</p>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link to="/shop">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="cartProduct p-4 border rounded-lg hover:shadow-lg transition-all"
                >
                  <div className="product flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="productImg w-24 h-24 rounded-md overflow-hidden bg-gray-100">
                        <img
                          src={item.productId?.productPicture || ''}
                          alt={item.productId?.name || 'Product'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="name-price">
                        <h2 className="text-lg font-semibold text-gray-800">
                          {item.productId?.name || 'Product'}
                        </h2>
                        <p className="text-xl font-bold text-indigo-600">
                          ${item.productId?.price?.toFixed(2) || '0.00'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.productId?._id)}
                      className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-indigo-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <Link to="/shop">
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors">
                    Continue Shopping
                  </button>
                </Link>
                <Link to="/checkout">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
