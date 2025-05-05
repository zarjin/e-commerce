import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { UserContext } from '../context/UserContext';
import { Search, ShoppingCart } from 'lucide-react';

export default function Shop() {
  const { allProduct } = useContext(ProductContext);
  const { addCart } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on search term
  const filteredProducts = allProduct.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="w-full min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-800 tracking-tight">
            Our Products
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Browse our collection of high-quality products curated just for you.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <Search
                className="absolute left-4 top-3.5 text-neutral-400"
                size={18}
                strokeWidth={2}
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-card overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                <Link to={`/product/${product._id}`} className="block">
                  <div className="h-56 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                    <img
                      src={product.productPicture}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary-700 z-20">
                      {product.brand}
                    </div>
                  </div>
                </Link>

                <div className="p-6">
                  <Link to={`/product/${product._id}`}>
                    <h2 className="text-xl font-semibold mb-2 text-neutral-800 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h2>
                  </Link>

                  <p className="text-neutral-600 mb-4 line-clamp-2 text-sm">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">
                      ${product.price.toFixed(2)}
                    </span>

                    <div className="flex space-x-2">
                      <Link to={`/product/${product._id}`}>
                        <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-2 rounded-lg font-medium transition-colors">
                          Details
                        </button>
                      </Link>
                      <button
                        onClick={() => addCart(product._id)}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-1.5"
                      >
                        <ShoppingCart size={16} strokeWidth={2} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-neutral-600 text-lg">
                No products found matching your search.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
