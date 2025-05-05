import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateAdmin = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const { isAdmin } = useContext(UserContext);
  const USER_API = import.meta.env.VITE_USER_API;

  const handleCreateFirstAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await axios.post(
        `${USER_API}/create-first-admin`,
        { email },
        { withCredentials: true }
      );
      
      toast.success(data.message);
      setEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMakeAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await axios.post(
        `${USER_API}/make-admin`,
        { email },
        { withCredentials: true }
      );
      
      toast.success(data.message);
      setEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect non-admin users (except for first admin creation)
  if (isLoggedIn && !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Admin Management</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Make a User an Admin</h2>
          <form onSubmit={isAdmin ? handleMakeAdmin : handleCreateFirstAdmin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                User Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
              } transition-colors`}
            >
              {loading ? 'Processing...' : isAdmin ? 'Make Admin' : 'Create First Admin'}
            </button>
          </form>
        </div>
        
        {!isAdmin && (
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-medium text-yellow-800 mb-2">First Admin Creation</h3>
            <p className="text-sm text-yellow-700">
              This page allows you to create the first admin user in the system. 
              This can only be done once when there are no admin users yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAdmin;
