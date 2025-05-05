import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { authUserData } = useContext(UserContext);
  const { adminProduct, getAdminProduct } = useContext(ProductContext);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setError(null);

      try {
        if (typeof getAdminProduct === 'function') {
          await getAdminProduct();
        } else {
          console.error('getAdminProduct is not a function');
          setError(
            'Failed to load admin products. Please try refreshing the page.'
          );
        }
      } catch (error) {
        console.error('Error fetching admin products:', error);
        setError(
          'Failed to load admin products. Please try refreshing the page.'
        );
      }
    };

    fetchProducts();
  }, [getAdminProduct]);

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {authUserData?.firstName} {authUserData?.lastName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Your Products
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-800">
                {Array.isArray(adminProduct) ? adminProduct.length : 0}
              </span>
              <Link
                to="/create-product"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add New
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Account Status
            </h2>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-gray-800">Admin</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Link
                to="/create-product"
                className="block text-green-600 hover:text-green-800 transition-colors"
              >
                Create New Product
              </Link>
              <Link
                to="/create-admin"
                className="block text-green-600 hover:text-green-800 transition-colors"
              >
                Make User Admin
              </Link>
              <Link
                to="/profile"
                className="block text-green-600 hover:text-green-800 transition-colors"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-green-800 mb-6">
            Your Products
          </h2>

          {Array.isArray(adminProduct) && adminProduct.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminProduct.map((product) => {
                if (!product || !product._id) {
                  return null; // Skip invalid products
                }

                return (
                  <div
                    key={product._id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img
                      src={product.productPicture || '/default-product.png'}
                      alt={product.name || 'Product'}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = '/default-product.png';
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {product.name || 'Unnamed Product'}
                      </h3>
                      <p className="text-green-600 font-medium mb-2">
                        $
                        {typeof product.price === 'number'
                          ? product.price.toFixed(2)
                          : '0.00'}
                      </p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description || 'No description available'}
                      </p>
                      <div className="flex justify-between">
                        <Link
                          to={`/product/${product._id}`}
                          className="text-green-600 hover:text-green-800 transition-colors"
                        >
                          View
                        </Link>
                        <Link
                          to={`/edit-product/${product._id}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600 mb-4">
                You haven't created any products yet.
              </p>
              <Link
                to="/create-product"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Your First Product
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
