import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

export default function Home() {
  const { allProduct } = useContext(ProductContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Get 3 random products to feature
    if (allProduct.length > 0) {
      const shuffled = [...allProduct].sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 3));
    }
  }, [allProduct]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-28 px-4">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-secondary-700/90 z-0"></div>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bTEyIDEydjZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bS0yNCAwdjZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bTEyIDEydjZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bS0xMiAyNHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] z-0"></div>

        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
          <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 animate-fade-in">
            Welcome to our premium shop
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Discover Amazing Products <br className="hidden md:block" />
            <span className="text-white/90">for Your Lifestyle</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl text-white/80">
            Shop our curated collection of high-quality products at competitive
            prices. Free shipping on orders over $50!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop">
              <button className="bg-white text-primary-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-neutral-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                Shop Now
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-transparent text-white border-2 border-white/30 backdrop-blur-sm px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <span className="text-sm font-medium text-primary-600 mb-2">
              HANDPICKED FOR YOU
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-800">
              Featured Products
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <Link to={`/product/${product._id}`}>
                  <div className="h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                    <img
                      src={product.productPicture}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary-700 z-20">
                      {product.brand}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-neutral-800 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-neutral-600 mb-4 line-clamp-2 text-sm">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/shop">
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <span className="text-sm font-medium text-primary-600 mb-2">
              WHY CHOOSE US
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-800">
              The SHOP Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-card text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="16" height="16" x="4" y="4" rx="2" />
                  <path d="M9 9h6v6H9z" />
                  <path d="M15 4v2" />
                  <path d="M15 18v2" />
                  <path d="M4 15h2" />
                  <path d="M18 15h2" />
                  <path d="M4 9h2" />
                  <path d="M18 9h2" />
                  <path d="M9 4v2" />
                  <path d="M9 18v2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-800">
                Fast Delivery
              </h3>
              <p className="text-neutral-600">
                Get your products delivered to your doorstep quickly and
                securely with our premium shipping options.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-card text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 text-secondary-600 mb-6 group-hover:bg-secondary-600 group-hover:text-white transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-800">
                Quality Guarantee
              </h3>
              <p className="text-neutral-600">
                All our products are carefully selected to ensure the highest
                quality standards for our customers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-card text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
                  <path d="M17 12H7" />
                  <path d="m11 8-4 4 4 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-800">
                Easy Returns
              </h3>
              <p className="text-neutral-600">
                Not satisfied? Return your products within 30 days for a full
                refund, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
