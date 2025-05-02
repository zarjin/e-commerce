import React from "react";
import { Link } from "react-router";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-300">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-amber-600">
          Login Account
        </h1>
        <form className="w-full space-y-5">
          <div className="flex flex-col w-full">
            <label
              htmlFor="email"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email name"
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="password"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password name"
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow transition"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-amber-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
