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
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Discover Amazing Products for Your Lifestyle
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Shop our curated collection of high-quality products at competitive
            prices. Free shipping on orders over $50!
          </p>
          <Link to="/shop">
            <button className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-700 hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-lg text-gray-500 mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <Link to={`/product/${product._id}`} className="w-full">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Shop With Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-green-600 text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your products delivered to your doorstep quickly and
                securely.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-green-600 text-4xl mb-4">💯</div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">
                All our products are carefully selected to ensure the highest
                quality.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-green-600 text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">
                Not satisfied? Return your products within 30 days for a full
                refund.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
