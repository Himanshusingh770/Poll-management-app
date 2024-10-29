import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  // Redirect unauthenticated users to login, except if they're on signup
  if (!isAuthenticated && location.pathname !== '/signup') {
    return <Navigate to="/" replace />;
  }

  // Redirect to polls only if authenticated and accessing restricted routes
  if (isAuthenticated && (location.pathname === '/polls')) {
    return element;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
