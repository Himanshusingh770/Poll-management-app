import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Spinner } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { isValidEmail } from '../../../utils/validationUtils';
import ToastMessage from '../Components/ToastMessage';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formFieldTouched, setFormFieldTouched] = useState({
    email: false,
    password: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validate email using the utility function
  const validateEmail = () => {
    if (!formFieldTouched.email) return '';
    if (!formData.email) return 'Email is required';
    if (!isValidEmail(formData.email))
      return 'Please enter a valid email address';
    return '';
  };

  // Validate password
  const validatePassword = () => {
    if (!formFieldTouched.password) return '';
    if (!formData.password) return 'Password is required';
    return '';
  };

  const emailError = validateEmail();
  const passwordError = validatePassword();

  const isFormValid =
    !emailError && !passwordError && formFieldTouched.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormFieldTouched({ ...formFieldTouched, password: true, email: true });

    if (isFormValid) {
      dispatch(
        login({
          email: formData.email.trim(),
          password: formData.password.trim()
        })
      )
        .unwrap()
        .then(() => navigate('/polls'))
        .catch(() => setShowErrorToast(true));
    }
  };
  // Single handlePasswordEmailChange function for both email and password
  const handlePasswordEmailChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormFieldTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    setShowErrorToast(false);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card
        style={{
          width: '30rem',
          borderRadius: '10px',
          backgroundColor: '#f8f9fa'
        }}
        className="shadow-lg p-4"
      >
        <h2 className="text-center mb-4">Login</h2>

        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handlePasswordEmailChange}
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="position-relative">
              <Form.Control
                className="pe-3"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handlePasswordEmailChange}
                onBlur={() =>
                  setFormFieldTouched((prevTouched) => ({
                    ...prevTouched,
                    password: true
                  }))
                }
                isInvalid={!!passwordError}
                // style={{ paddingRight: '2.5rem' }}
              />
              <span
                className={`position-absolute end-0 top-50 translate-middle-y d-flex justify-content-center align-items-center ${
                  passwordError ? 'mx-5' : 'mx-3'
                }`}
                style={{ cursor: 'pointer' }}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeFill /> : <EyeSlashFill />}
              </span>
            </div>
            {passwordError && (
              <div className="text-danger mt-1">{passwordError}</div>
            )}
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

      <ToastMessage
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        message={error || 'An error occurred'}
        variant="danger"
      />
    </Container>
  );
};

export default Login;
