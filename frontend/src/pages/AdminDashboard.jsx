import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import {
  Package,
  ShieldCheck,
  PlusCircle,
  Edit3,
  Eye,
  AlertTriangle,
  LayoutDashboard,
  UserPlus,
  UserCog,
} from 'lucide-react';

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
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg border border-red-100 animate-fade-in">
          <div className="flex justify-center mb-6">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-medium"
          >
            Refresh Page
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto animate-fade-in">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-2xl shadow-lg p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -ml-10 -mb-10"></div>

          <div className="relative z-10 flex items-center">
            <div className="mr-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <LayoutDashboard size={32} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-green-100">
                Welcome back, {authUserData?.firstName} {authUserData?.lastName}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Products Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <Package size={24} className="text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Your Products
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold text-gray-800">
                {Array.isArray(adminProduct) ? adminProduct.length : 0}
              </span>
              <Link
                to="/create-product"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
              >
                <PlusCircle size={18} className="mr-1" /> Add New
              </Link>
            </div>
          </div>

          {/* Account Status Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <ShieldCheck size={24} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Account Status
              </h2>
            </div>
            <div className="flex items-center mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Admin
              </span>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <UserCog size={24} className="text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Quick Actions
              </h2>
            </div>
            <div className="space-y-3 mt-2">
              <Link
                to="/create-product"
                className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
              >
                <PlusCircle size={18} className="mr-2" />
                <span>Create New Product</span>
              </Link>
              <Link
                to="/create-admin"
                className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
              >
                <UserPlus size={18} className="mr-2" />
                <span>Make User Admin</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
              >
                <UserCog size={18} className="mr-2" />
                <span>Edit Profile</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Package size={24} className="mr-3 text-green-600" />
            Your Products
          </h2>

          {Array.isArray(adminProduct) && adminProduct.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminProduct.map((product, index) => {
                if (!product || !product._id) {
                  return null; // Skip invalid products
                }

                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <img
                        src={product.productPicture || '/default-product.png'}
                        alt={product.name || 'Product'}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = '/default-product.png';
                        }}
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        $
                        {typeof product.price === 'number'
                          ? product.price.toFixed(2)
                          : '0.00'}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {product.name || 'Unnamed Product'}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description || 'No description available'}
                      </p>
                      <div className="flex justify-between pt-2 border-t border-gray-100">
                        <Link
                          to={`/product/${product._id}`}
                          className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                        >
                          <Eye size={18} className="mr-1" /> View
                        </Link>
                        <Link
                          to={`/edit-product/${product._id}`}
                          className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          <Edit3 size={18} className="mr-1" /> Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200 animate-fade-in">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 mb-5">
                You haven't created any products yet.
              </p>
              <Link
                to="/create-product"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center"
              >
                <PlusCircle size={18} className="mr-2" /> Create Your First
                Product
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
