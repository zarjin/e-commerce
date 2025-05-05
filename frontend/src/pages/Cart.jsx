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
      <main className="w-full min-h-screen bg-neutral-50 py-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
          <p className="text-xl text-neutral-600">Loading your cart...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-neutral-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">
            Your Shopping Cart
          </h1>
          <Link
            to="/shop"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-card p-12 text-center">
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-400"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-neutral-800 mb-3">
              Your cart is empty
            </h2>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/shop">
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-sm hover:shadow">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <div className="grid grid-cols-12 text-sm font-medium text-neutral-500 uppercase">
                <div className="col-span-6 md:col-span-7">Product</div>
                <div className="col-span-3 md:col-span-3 text-right">Price</div>
                <div className="col-span-3 md:col-span-2 text-right">
                  Actions
                </div>
              </div>
            </div>

            <div className="divide-y divide-neutral-200">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="p-6 hover:bg-neutral-50 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-6 md:col-span-7">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                          <img
                            src={item.productId?.productPicture || ''}
                            alt={item.productId?.name || 'Product'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-neutral-800 mb-1">
                            {item.productId?.name || 'Product'}
                          </h3>
                          <p className="text-sm text-neutral-500">
                            {item.productId?.brand || 'Brand'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-3 md:col-span-3 text-right">
                      <span className="font-semibold text-lg text-primary-600">
                        ${item.productId?.price?.toFixed(2) || '0.00'}
                      </span>
                    </div>

                    <div className="col-span-3 md:col-span-2 text-right">
                      <button
                        onClick={() =>
                          handleRemoveFromCart(item.productId?._id)
                        }
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-neutral-50 border-t border-neutral-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-neutral-600">Subtotal:</span>
                    <span className="font-semibold text-neutral-800 ml-12">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-neutral-600">Shipping:</span>
                    <span className="font-semibold text-neutral-800 ml-12">
                      $0.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-neutral-200 mt-2">
                    <span className="text-lg font-medium text-neutral-800">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-primary-600 ml-12">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <Link to="/checkout" className="block w-full md:w-auto">
                    <button className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-sm hover:shadow flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          width="18"
                          height="11"
                          x="3"
                          y="11"
                          rx="2"
                          ry="2"
                        />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
