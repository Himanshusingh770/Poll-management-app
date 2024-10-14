// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showError, setShowError] = useState(false); // New state to control error visibility

  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation check 

  const validateEmail = () => {
    if (!emailTouched) return '';
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = () => {
    if (!passwordTouched) return '';
    if (!password) return 'Password is required';
    return '';
  };

  const emailError = validateEmail();
  const passwordError = validatePassword();

  // Check if the form is valid (i.e., no errors and fields are not empty)
  const isFormValid = !emailError && !passwordError && emailTouched && passwordTouched;

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (isFormValid) {
      dispatch(login({ email: email.trim(), password: password.trim() }))
        .unwrap()
        .then(() => {
          navigate('/polls');
        })
        .catch(() => {
          setShowError(true); // Show error if login fails
        });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!emailTouched) setEmailTouched(true); // Mark email as touched when the user types
    setShowError(false); // Clear error when typing
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!passwordTouched) setPasswordTouched(true); // Mark password as touched when the user types
    setShowError(false); // Clear error when typing
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '30rem', borderRadius: '10px' }} className="shadow-lg p-4">
        <h2 className="text-center mb-4">Login</h2>

        {/* Error alert, only show when showError is true */}
        {showError && error && <Alert variant="danger">{error}</Alert>}

        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => setEmailTouched(true)} // Mark email as touched when focus leaves
              isInvalid={!!emailError}
              required
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => setPasswordTouched(true)} // Mark password as touched when focus leaves
              isInvalid={!!passwordError}
              required
            />
            <Form.Control.Feedback type="invalid">
              {passwordError}
            </Form.Control.Feedback>
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="mt-3 w-100" 
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
