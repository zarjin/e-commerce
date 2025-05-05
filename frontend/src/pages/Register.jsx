import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation check
    const { firstName, lastName, email, password } = userData;
    if (!firstName || !lastName || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await register(userData);
      setUserData({ firstName: '', lastName: '', email: '', password: '' });
      navigate('/');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4">
      <div className="bg-white shadow-card rounded-2xl p-8 md:p-10 w-full max-w-md flex flex-col items-center">
        <div className="w-full text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-neutral-800">
            Create Account
          </h1>
          <p className="text-neutral-600">Join our community of shoppers</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col w-full">
              <label
                htmlFor="firstName"
                className="mb-1.5 text-sm font-medium text-neutral-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                value={userData.firstName}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="lastName"
                className="mb-1.5 text-sm font-medium text-neutral-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                value={userData.lastName}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

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
                  setUserData({ ...userData, email: e.target.value })
                }
                value={userData.email}
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
            <label
              htmlFor="password"
              className="mb-1.5 text-sm font-medium text-neutral-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a strong password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                value={userData.password}
                autoComplete="new-password"
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
            <p className="mt-1 text-xs text-neutral-500">
              Password must be at least 8 characters long
            </p>
          </div>

          <div className="mt-2">
            <button
              type="submit"
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-neutral-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-600 font-medium hover:text-primary-700"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
