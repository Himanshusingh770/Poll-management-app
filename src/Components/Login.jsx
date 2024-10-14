import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Spinner, ToastContainer, Toast } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons'; // Eye icons

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showErrorToast, setShowErrorToast] = useState(false); // State to control toast visibility

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
          setShowErrorToast(true); // Show error toast if login fails
        });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!emailTouched) setEmailTouched(true); // Mark email as touched when the user types
    setShowErrorToast(false); // Clear error when typing
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!passwordTouched) setPasswordTouched(true); // Mark password as touched when the user types
    setShowErrorToast(false); // Clear error when typing
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle between show and hide
  };

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
              onBlur={() => setEmailTouched(true)} // Mark email as touched when focus leaves
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
  <Form.Label>Password</Form.Label>
  <div className="position-relative">
    <Form.Control
      type={showPassword ? 'text' : 'password'} // Toggle between text and password
      placeholder="Password"
      value={password}
      onChange={handlePasswordChange}
      onBlur={() => setPasswordTouched(true)} // Mark password as touched when focus leaves
      isInvalid={!!passwordError}
      style={{ paddingRight: '2.5rem' }} // Add enough padding for the eye icon
    />
    {/* Eye icon for toggling password visibility */}
    <span
      className={`position-absolute end-0 top-50 translate-middle-y d-flex justify-content-center align-items-center ${ passwordError ? 'mx-5' : 'mx-3'}`} // Centered vertically, margin-right adjusted
      style={{ cursor: 'pointer' }} // Make the icon clickable
      onClick={togglePasswordVisibility}
    >
      {showPassword ? <EyeFill className='p-5' /> : <EyeSlashFill />}
    </span>
  </div>
  
  {/* Separate div for the password error */}
  {passwordError && <div className="text-danger mt-1">{passwordError}</div>}
</Form.Group>


          <Button 
            variant={isLoading ? 'secondary' : 'primary'} // Change color when loading
            type="submit" 
            className="mt-3 w-100 d-flex justify-content-center align-items-center" 
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? <Spinner animation="border" size="md" /> : 'Login'} {/* Show loader */}
          </Button>
        </Form>
      </Card>

      {/* Toast to display login error, placed outside the card */}
      <ToastContainer 
  position="bottom-center" 
  style={{ 
    position: 'fixed', 
    left: '50%', 
    transform: 'translateX(-50%)',  /* Ensure it's centered */
    marginBottom: '40px',           /* Add bottom margin */
    marginRight: '20px'             /* Add right margin */
  }}
>
  <Toast 
    show={showErrorToast} 
    onClose={() => setShowErrorToast(false)} 
    delay={3000} 
    autohide 
    bg="danger"
  >
    <Toast.Body className="text-light">{error}</Toast.Body>
  </Toast>
</ToastContainer>


    </Container>
  );
};

export default Login;
