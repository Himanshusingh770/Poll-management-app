// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Route for defining routes
import Login from './Pages/LoginForm';
import SignUpForm from './Pages/SignUpForm';
import PollList from './Pages/PollList';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Routes//ProtectedRoutes' // Import the ProtectedRoute component
import './App.css'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Use ProtectedRoute to protect the PollList route */}
      <Route 
        path="/polls" 
        element={<ProtectedRoute element={<PollList />} />} 
      />
      <Route path='/signup' element={<SignUpForm/>}></Route>
      <Route path='/navbar' element={<Navbar/>}></Route>
    </Routes>
  );
};

export default App;
