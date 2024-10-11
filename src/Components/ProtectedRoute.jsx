// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useSelector((state) => state.auth); // Accessing authentication state from Redux

  return isAuthenticated ? element : <Navigate to="/" replace />; // Render element if authenticated, else redirect to login
};

export default ProtectedRoute;
