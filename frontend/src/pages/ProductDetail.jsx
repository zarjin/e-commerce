import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ProductContext } from '../context/ProductContext';

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addCart } = useContext(UserContext);
  const { getProductById } = useContext(ProductContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(productId);
        if (productData) {
          setProduct(productData);
        } else {
          setError('Product not found');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId, getProductById]);

  const handleAddToCart = () => {
    addCart(productId);
  };

  if (loading) {
    return (
      <main className="w-full min-h-screen py-10 flex justify-center items-center">
        <p className="text-xl text-gray-600">Loading product details...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="w-full min-h-screen py-10 flex flex-col justify-center items-center">
        <p className="text-xl text-red-600 mb-4">{error}</p>
        <Link to="/shop">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Back to Shop
          </button>
        </Link>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="w-full min-h-screen py-10 flex flex-col justify-center items-center">
        <p className="text-xl text-gray-600 mb-4">Product not found</p>
        <Link to="/shop">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Back to Shop
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-card p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="bg-neutral-50 rounded-xl overflow-hidden h-80 md:h-[500px] relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={product.productPicture}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary-700 z-20">
                  {product.brand}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 flex flex-col">
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {product.brand}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                    In Stock
                  </span>
                </div>
                <p className="text-3xl font-bold text-primary-600 mb-6">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3 text-neutral-800">
                  Description
                </h2>
                <p className="text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-xl mb-8">
                <h3 className="text-sm font-medium text-neutral-500 uppercase mb-3">
                  Product Details
                </h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-neutral-600">Brand</span>
                    <span className="font-medium text-neutral-800">
                      {product.brand}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-neutral-600">ID</span>
                    <span className="font-medium text-neutral-800">
                      {product._id.substring(0, 8)}...
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-xl font-medium transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
                >
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
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to Cart
                </button>

                <Link to="/shop" className="block">
                  <button className="w-full bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
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
                      <path d="m12 19-7-7 7-7" />
                      <path d="M19 12H5" />
                    </svg>
                    Back to Shop
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
