import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/LoginForm';
import SignUpForm from './Pages/SignUpForm';
import PollList from './Pages/PollList';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Routes/ProtectedRoutes';
import PublicRoute from './Routes/PublicRoute';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<PublicRoute element={<Login />} />}
        />
        <Route
          path="/signup"
          element={<PublicRoute element={<SignUpForm />} />}
        />
        <Route
          path="/polls"
          element={<ProtectedRoute element={<PollList />} />}
        />
      </Routes>
    </>
  );
};

export default App;
