import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/LoginForm';
import SignUpForm from './Pages/SignUpForm';
import PollsPage from './Pages/PollsPage';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Routes/ProtectedRoutes';
import PublicRoute from './Routes/PublicRoute';
import './App.css';

const App = () => {

  return (
    <>
      {/* Show Navbar only when the user is authenticated */}
      {<Navbar />}
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
          element={<ProtectedRoute element={<PollsPage/>} />}
        />
      </Routes>
    </>
  );
};

export default App;
