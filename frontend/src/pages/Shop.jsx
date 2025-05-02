import React from "react";

export default function Shop() {
  return (
    <main className="w-full min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">
          Shop
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-2xl">
            <img
              src="https://via.placeholder.com/200"
              alt="Product 1"
              className="w-40 h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">
              Product 1
            </h2>
            <p className="text-lg text-gray-500 mb-4">$10.00</p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
