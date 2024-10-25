import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import Login from './Pages/LoginForm';
import SignUpForm from './Pages/SignUpForm';
import PollList from './Pages/PollList';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Routes/ProtectedRoutes'; 
import './App.css';

const App = () => {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
    <Navbar/>
      {/* {isAuthenticated && <Navbar />}  */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/polls" 
          element={<ProtectedRoute element={<PollList />} />} 
        />
        <Route path='/signup' element={<SignUpForm />} />
      </Routes>
    </>
  );
};

export default App;
