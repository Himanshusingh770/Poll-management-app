import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  // Allow access to the signup page even if not authenticated
  if (!isAuthenticated) {
    if (location.pathname === '/signup') {
      return element;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // Redirect authenticated users away from login and signup pages
  if (isAuthenticated && (location.pathname === '/' || location.pathname === '/signup')) {
    return <Navigate to="/polls" replace />;
  }

  return element;
};

export default ProtectedRoute;
