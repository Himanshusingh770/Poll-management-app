import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/LoginForm';
import SignUpForm from './Pages/SignUpForm';
import PollsPage from './Pages/PollsPage';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Routes/ProtectedRoutes';
import AddEditPoll from './Pages/AddEditPoll';
import PublicRoute from './Routes/PublicRoute';
import NotFound from './Pages/NotFound';
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
          element={<ProtectedRoute element={<PollsPage />} />}
        />
        <Route
          path="/addPoll"
          element={<ProtectedRoute Component={AddEditPoll} redirectTo="/" />}
        />
        <Route
          path="/editPoll/:id"
          element={<ProtectedRoute Component={AddEditPoll} redirectTo="/" />}
        />
         <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;