import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useSelector((state) => state.auth); 
  const location = useLocation(); // Get the current location
  if (!isAuthenticated) {
    // If not authenticated and not on the signup page, redirect to login
    return location.pathname === '/signup' ? element : <Navigate to="/" replace />;
  }

  return element; // Render the protected element if authenticated
};

export default ProtectedRoute;
