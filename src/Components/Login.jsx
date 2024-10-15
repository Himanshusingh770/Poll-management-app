import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Spinner, ToastContainer, Toast } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const isFormValid = !emailError && !passwordError && emailTouched && passwordTouched;

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (isFormValid) {
      dispatch(login({ email: email.trim(), password: password.trim() }))
        .unwrap()
        .then(() => navigate('/polls'))
        .catch(() => setShowErrorToast(true));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!emailTouched) setEmailTouched(true);
    setShowErrorToast(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!passwordTouched) setPasswordTouched(true);
    setShowErrorToast(false);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '30rem', borderRadius: '10px', backgroundColor: '#f8f9fa' }} className="shadow-lg p-4">
        <h2 className="text-center mb-4">Login</h2>

        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => setEmailTouched(true)}
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => setPasswordTouched(true)}
                isInvalid={!!passwordError}
                style={{ paddingRight: '2.5rem' }}
              />
              <span
                className={`position-absolute end-0 top-50 translate-middle-y d-flex justify-content-center align-items-center ${passwordError ? 'mx-5' : 'mx-3'}`}
                style={{ cursor: 'pointer' }}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeFill /> : <EyeSlashFill />}
              </span>
            </div>
            {passwordError && <div className="text-danger mt-1">{passwordError}</div>}
          </Form.Group>

          <Button
            variant={isLoading ? 'secondary' : 'primary'}
            type="submit"
            className="mt-3 w-100 d-flex justify-content-center align-items-center"
            disabled={isLoading}
          >
            {isLoading ? <Spinner animation="border" size="md" /> : 'Login'}
          </Button>
        </Form>
      </Card>

      <ToastContainer
        position="bottom-center"
        style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '40px',
        }}
      >
        <Toast
          show={showErrorToast}
          onClose={() => setShowErrorToast(false)}
          delay={6000}
          autohide
          bg="danger"
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body className="text-light">{error}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Login;
