import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  CircleUserRound,
  ShoppingBag,
  ImageUpIcon,
  Search,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    if (
      userContext &&
      userContext.authUserData &&
      userContext.authUserData.cart
    ) {
      setCartCount(userContext.authUserData.cart.length);
    }
  }, [userContext, userContext?.authUserData]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full h-20 flex items-center justify-between px-4 md:px-8 shadow-sm bg-white sticky top-0 z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-dark-green text-2xl md:text-3xl font-bold tracking-wider"
      >
        SHOP
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700 hover:text-dark-green"
        onClick={toggleMobileMenu}
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link
          to="/shop"
          className="text-gray-700 hover:text-dark-green transition-colors flex items-center gap-1"
        >
          <ShoppingBag size={22} />
          <span>Shop</span>
        </Link>

        {/* Authenticated User */}
        {isLoggedIn ? (
          <>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-dark-green transition-colors relative flex items-center gap-1"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="ml-1">Cart</span>
            </Link>

            <Link
              to="/create-product"
              className="text-gray-700 hover:text-dark-green transition-colors flex items-center gap-1"
            >
              <ImageUpIcon size={22} />
              <span>Create</span>
            </Link>

            <Link
              to="/profile"
              className="text-gray-700 hover:text-dark-green transition-colors flex items-center gap-1"
            >
              <CircleUserRound size={22} />
              <span>Profile</span>
            </Link>

            {userContext?.authUserData?.isAdmin && (
              <Link
                to="/admin"
                className="text-gray-700 hover:text-dark-green transition-colors flex items-center gap-1"
              >
                <LayoutDashboard size={22} />
                <span>Admin</span>
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <LogOut size={22} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          // Not Authenticated
          <div className="flex items-center space-x-4">
            <Link to="/register">
              <button className="bg-dark-green text-white px-5 py-2 rounded-lg font-medium hover:bg-green-800 transition-colors">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-dark-green text-white px-5 py-2 rounded-lg font-medium hover:bg-green-800 transition-colors">
                Login
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-md z-50">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to="/shop"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingBag size={20} />
              <span>Shop</span>
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-auto">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/create-product"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ImageUpIcon size={20} />
                  <span>Create Product</span>
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CircleUserRound size={20} />
                  <span>Profile</span>
                </Link>

                {userContext?.authUserData?.isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard size={20} />
                    <span>Admin Dashboard</span>
                  </Link>
                )}

                <button
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded w-full text-left"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 p-2">
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full bg-dark-green text-white px-5 py-2 rounded-lg font-medium hover:bg-green-800 transition-colors">
                    Register
                  </button>
                </Link>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full bg-dark-green text-white px-5 py-2 rounded-lg font-medium hover:bg-green-800 transition-colors">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
