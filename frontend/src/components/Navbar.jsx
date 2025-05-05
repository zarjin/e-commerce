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
    <header className="w-full h-20 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 shadow-soft backdrop-blur-sm bg-white/90">
      {/* Logo */}
      <Link
        to="/"
        className="text-primary-600 text-2xl md:text-3xl font-bold tracking-tight flex items-center"
      >
        <span className="bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">
          SHOP
        </span>
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-neutral-700 hover:text-primary-600 transition-colors"
        onClick={toggleMobileMenu}
      >
        {mobileMenuOpen ? (
          <X size={28} strokeWidth={1.5} />
        ) : (
          <Menu size={28} strokeWidth={1.5} />
        )}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link
          to="/shop"
          className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center gap-1.5 font-medium"
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
          <span>Shop</span>
        </Link>

        {/* Authenticated User */}
        {isLoggedIn ? (
          <>
            <Link
              to="/cart"
              className="text-neutral-700 hover:text-primary-600 transition-colors relative flex items-center gap-1.5 font-medium"
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span>Cart</span>
            </Link>

            <Link
              to="/create-product"
              className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center gap-1.5 font-medium"
            >
              <ImageUpIcon size={20} strokeWidth={1.5} />
              <span>Create</span>
            </Link>

            <Link
              to="/profile"
              className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center gap-1.5 font-medium"
            >
              <CircleUserRound size={20} strokeWidth={1.5} />
              <span>Profile</span>
            </Link>

            {userContext?.authUserData?.isAdmin && (
              <Link
                to="/admin"
                className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center gap-1.5 font-medium"
              >
                <LayoutDashboard size={20} strokeWidth={1.5} />
                <span>Admin</span>
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="text-neutral-700 hover:text-red-500 transition-colors flex items-center gap-1.5 font-medium"
            >
              <LogOut size={20} strokeWidth={1.5} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          // Not Authenticated
          <div className="flex items-center space-x-4">
            <Link to="/register">
              <button className="bg-primary-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-700 transition-all shadow-sm hover:shadow">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-white text-primary-600 border border-primary-600 px-5 py-2 rounded-lg font-medium hover:bg-primary-50 transition-all">
                Login
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-soft z-50 rounded-b-xl animate-fade-in">
          <div className="flex flex-col p-4 space-y-3">
            <Link
              to="/shop"
              className="flex items-center gap-2 p-2.5 hover:bg-neutral-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingBag
                size={20}
                strokeWidth={1.5}
                className="text-primary-500"
              />
              <span className="font-medium">Shop</span>
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 p-2.5 hover:bg-neutral-100 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingCart
                    size={20}
                    strokeWidth={1.5}
                    className="text-primary-500"
                  />
                  <span className="font-medium">Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-auto">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/create-product"
                  className="flex items-center gap-2 p-2.5 hover:bg-neutral-100 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ImageUpIcon
                    size={20}
                    strokeWidth={1.5}
                    className="text-primary-500"
                  />
                  <span className="font-medium">Create Product</span>
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-2.5 hover:bg-neutral-100 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CircleUserRound
                    size={20}
                    strokeWidth={1.5}
                    className="text-primary-500"
                  />
                  <span className="font-medium">Profile</span>
                </Link>

                {userContext?.authUserData?.isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 p-2.5 hover:bg-neutral-100 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard
                      size={20}
                      strokeWidth={1.5}
                      className="text-primary-500"
                    />
                    <span className="font-medium">Admin Dashboard</span>
                  </Link>
                )}

                <div className="h-px bg-neutral-200 my-1"></div>

                <button
                  className="flex items-center gap-2 p-2.5 hover:bg-red-50 text-red-600 rounded-lg w-full text-left transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut size={20} strokeWidth={1.5} />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 p-2 mt-2">
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-all shadow-sm hover:shadow">
                    Register
                  </button>
                </Link>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full bg-white text-primary-600 border border-primary-600 px-5 py-2.5 rounded-lg font-medium hover:bg-primary-50 transition-all">
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
