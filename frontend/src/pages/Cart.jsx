import React from "react";

export default function Cart() {
  return (
    <main className="w-full min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">
          Your Cart
        </h1>

        <div className="space-y-4">
          <div className="cartProduct p-4 border rounded-lg hover:shadow-lg transition-all">
            <div className="product flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="productImg w-24 h-24 rounded-md overflow-hidden bg-gray-100">
                  <img
                    src=""
                    alt="PS5"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="name-price">
                  <h2 className="text-lg font-semibold text-gray-800">PS5</h2>
                  <p className="text-xl font-bold text-indigo-600">$500</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
