import React, { useContext } from "react";
import { Link } from "react-router"; // Corrected 'react-router' to 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 bg-gray-500 font-Roboto text-white">
      <Link to="/" className="logo text-2xl font-bold">
        Shop
      </Link>
      <div className="authButton">
        {isLoggedIn ? (
          <button
            onClick={logout}
            type="button"
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mr-4 transition duration-200"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/register"
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
