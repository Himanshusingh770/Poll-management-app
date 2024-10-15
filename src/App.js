// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Route for defining routes
import Login from './modules/Forms/Components/LoginForm';
import PollList from './modules/Forms/Components/PollList';
import ProtectedRoute from './modules/Routes/ProtectedRoutes'; // Import the ProtectedRoute component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Use ProtectedRoute to protect the PollList route */}
      <Route 
        path="/polls" 
        element={<ProtectedRoute element={<PollList />} />} 
      />
    </Routes>
  );
};

export default App;
