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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-300">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-amber-600">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="flex flex-col w-full">
            <label
              htmlFor="firstName"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
              value={userData.firstName}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="lastName"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
              value={userData.lastName}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>

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
              placeholder="Enter your email"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              value={userData.email}
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
              placeholder="Enter your password"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              value={userData.password}
              autoComplete="new-password"
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-amber-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
