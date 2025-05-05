import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [UserData, setUserData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(UserData);
      setUserData({ email: '', password: '' });
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4">
      <div className="bg-white shadow-card rounded-2xl p-8 md:p-10 w-full max-w-md flex flex-col items-center">
        <div className="w-full text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-neutral-800">
            Welcome Back
          </h1>
          <p className="text-neutral-600">
            Sign in to your account to continue
          </p>
        </div>

        <form className="w-full space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">
            <label
              htmlFor="email"
              className="mb-1.5 text-sm font-medium text-neutral-700"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                onChange={(e) =>
                  setUserData({ ...UserData, email: e.target.value })
                }
                value={UserData.email}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
              />
              <svg
                className="absolute right-3 top-3.5 text-neutral-400"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex justify-between mb-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-neutral-700"
              >
                Password
              </label>
              <a
                href="#"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) =>
                  setUserData({ ...UserData, password: e.target.value })
                }
                value={UserData.password}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
              />
              <svg
                className="absolute right-3 top-3.5 text-neutral-400"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-neutral-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-primary-600 font-medium hover:text-primary-700"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
