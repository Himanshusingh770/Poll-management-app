import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Spinner } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { validateField, validateForm } from '../utils/validationUtils'; // Ensure this utility function is set up correctly
import ToastMessage from './ToastMessage';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [formError, setFormErrors] = useState({
    email: '',
    password: ''
  });

  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const {errors, isFormValid } = validateForm(formData)
    setFormErrors(errors)
    if (!isFormValid) {
      return
    }
    dispatch(
      login({
        email: formData.email.trim(),
        password: formData.password.trim()
      })
    )
      .unwrap()
      .then(() => navigate('/polls'))
      .catch(() => setShowErrorToast(true));
  };
  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    const error = validateField(value, name);
    setFormErrors({
      ...formError,
      [name]: error
    });
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
              onChange={handleValueChange}
              isInvalid={!!formError.email} // Check for email error
            />
            <Form.Control.Feedback type="invalid">
              {formError.email} {/* Display email error */}
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
                onChange={handleValueChange}
                isInvalid={!!formError.password} // Check for password error
              />
              <span
                className={`position-absolute end-0 top-50 translate-middle-y d-flex justify-content-center align-items-center ${
                  formError.password ? 'mx-5' : 'mx-3'
                }`}
                style={{ cursor: 'pointer' }}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeFill /> : <EyeSlashFill />}
              </span>
            </div>
            {formError.password && (
              <div className="text-danger mt-1">{formError.password}</div>
            )}{' '}
            {/* Display password error */}
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
