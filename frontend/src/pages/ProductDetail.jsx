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
    <main className="w-full min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="bg-gray-100 rounded-lg overflow-hidden h-80 md:h-96">
                <img
                  src={product.productPicture}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 flex flex-col">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-500 mb-2">Brand: {product.brand}</p>
              <p className="text-2xl font-bold text-indigo-600 mb-4">
                ${product.price.toFixed(2)}
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="mt-auto">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Add to Cart
                </button>

                <Link to="/shop">
                  <button className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-colors">
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
