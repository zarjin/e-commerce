import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { UserContext } from '../context/UserContext';

export default function Shop() {
  const { allProduct } = useContext(ProductContext);
  const { addCart } = useContext(UserContext);
  console.log(allProduct);
  return (
    <main className="w-full min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">
          Shop
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {allProduct.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <Link to={`/product/${product._id}`} className="block mb-4">
                <img
                  src={product.productPicture}
                  alt={product.name}
                  className="w-40 h-40 object-cover rounded-lg"
                />
              </Link>
              <Link to={`/product/${product._id}`} className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700 hover:text-green-600 transition-colors">
                  {product.name}
                </h2>
              </Link>
              <p className="text-lg text-gray-500 mb-4">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex space-x-2 w-full">
                <Link to={`/product/${product._id}`} className="flex-1">
                  <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors">
                    Details
                  </button>
                </Link>
                <button
                  onClick={() => addCart(product._id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
