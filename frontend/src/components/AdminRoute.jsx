import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { isAdmin, checkIsAdmin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      setLoading(true);
      try {
        if (isLoggedIn) {
          // Make sure checkIsAdmin is a function before calling it
          if (typeof checkIsAdmin === 'function') {
            const adminStatus = await checkIsAdmin();
            setIsAdminUser(adminStatus);
          } else {
            console.error('checkIsAdmin is not a function');
            setIsAdminUser(false);
          }
        } else {
          setIsAdminUser(false);
        }
      } catch (error) {
        console.error('Error verifying admin status:', error);
        setIsAdminUser(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [isLoggedIn, checkIsAdmin]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl text-green-600">Checking permissions...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!isAdminUser) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
