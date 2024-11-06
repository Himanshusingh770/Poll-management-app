import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, Component, redirectTo }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  // Redirect unauthenticated users to login, except if they're on signup
  if (!isAuthenticated && location.pathname !== '/signup') {
    return <Navigate to="/" replace />;
  }

  // For authenticated users, render either the `element` or the `Component`
  if (isAuthenticated) {
    if (element) {
      return element;
    }
    if (Component) {
      return <Component />;
    }
  }

  // Default redirect if none of the conditions above are met
  return <Navigate to={redirectTo || "/"} replace />;
};

export default ProtectedRoute;