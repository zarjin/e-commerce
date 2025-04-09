import React, { useContext, useEffect } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout, loading, fetchUserData, userData } =
    useContext(AuthContext);

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <nav className="w-full h-16 px-6 flex items-center justify-between bg-gray-800 text-white font-Roboto">
        <div className="animate-pulse h-6 w-24 bg-gray-600 rounded"></div>
        <div className="flex gap-3">
          <div className="h-10 w-20 bg-gray-600 rounded"></div>
          <div className="h-10 w-20 bg-gray-600 rounded"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full h-16 px-6 flex items-center justify-between bg-gray-900 text-white font-Roboto shadow-md">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-indigo-400 transition"
      >
        🛍️ Shop
      </Link>

      {/* Auth Section */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Link to="/profile">
              <div className="flex items-center gap-2">
                <img
                  src={userData.profile || "/default-profile.png"}
                  alt={`${userData.username || "User"}'s profile`}
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                />
                <span className="hidden sm:block text-sm font-medium">
                  Hi, {userData?.username || "User"}
                </span>
              </div>
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-sm font-semibold py-2 px-4 rounded transition duration-200"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-sm font-semibold py-2 px-4 rounded transition duration-200"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
