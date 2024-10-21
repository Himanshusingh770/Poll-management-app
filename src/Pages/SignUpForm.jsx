import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form,  Container, Card } from 'react-bootstrap';
import ToastMessage from '../Components/TostMassege'; // Ensure the path is correct
import { signup } from '../slices/authSlice';
import { fetchRoles } from '../slices/rolesSlice'; // Using API call
import { validateField, validateForm } from '../utils/validationUtils';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import '../App.css';
import SuccessModal from '../Components/SucessModel';
import CustomButton from '../Button/CustomButton';
// Simple JSON Data when Api Run Remove this

const rolesData = [
  {
    id: 1,
    name: 'Admin',
    description: 'Admin of the company',
    createdAt: '2024-10-14T05:17:30.000Z',
    updatedAt: '2024-10-14T05:17:30.000Z'
  },
  {
    id: 2,
    name: 'Employee',
    description: 'Employee of the company',
    createdAt: '2024-10-14T05:17:13.000Z',
    updatedAt: '2024-10-14T05:17:13.000Z'
  },
  {
    id: 3,
    name: 'HR',
    description: 'HR of the company',
    createdAt: '2024-10-14T05:17:21.000Z',
    updatedAt: '2024-10-14T05:17:21.000Z'
  },
  {
    id: 5,
    name: 'pilot',
    description:
      'A pilot is trained to operate aircraft. As part of their duties, they file flight plans, perform maintenance checks and ensure the craft is ready for departure',
    createdAt: '2024-10-18T10:23:44.000Z',
    updatedAt: '2024-10-18T10:23:44.000Z'
  }
];

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    roleId: '', // Changed from role to roleId
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(''); // for internal server 500 error
  const [toastVariant, setToastVariant] = useState('success'); // Variant state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Uncomment this line to use API roles fetching
  // useEffect(() => { dispatch(fetchRoles()); }, [dispatch]);
  useEffect(() => {
    // dispatch(fetchRoles()); // use API call
  }, [dispatch]);


  return (
    <div className="signup-main-container">
      <Container className="signup-container">
        <Card className="signup-card">
          <h2 className="text-center mb-1">Sign Up</h2>

          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-1 px-4">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleValueChange}
                isInvalid={!!formErrors.firstName}
                isValid={formErrors.firstName === ''}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-1 px-4">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleValueChange}
                isInvalid={!!formErrors.lastName}
                isValid={formErrors.lastName === ''}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-1 px-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleValueChange}
                isInvalid={!!formErrors.email}
                isValid={formErrors.email === ''}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-1 px-4">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="roleId"
                value={formData.roleId}
                onChange={handleValueChange}
                isInvalid={!!formErrors.roleId}
                isValid={formErrors.roleId === ''}
              >
                <option value="">Select Role</option>
                {rolesData.length > 0 ? (
                  rolesData.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No roles available</option>
                )}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.roleId}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-1 px-4">
              <Form.Label>Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  className="pe-5"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleValueChange}
                  isInvalid={!!formErrors.password}
                />
                <span
                  className={`password-toggle-icon ${
                    formErrors.password ? 'mx-5' : 'mx-3'
                  }`}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeFill /> : <EyeSlashFill />}
                </span>
              </div>
              {formErrors.password && (
                <div className="text-danger text-extra-small">
                  {formErrors.password}
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3 px-4">
              <Form.Label>Confirm Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  className="pe-5"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleValueChange}
                  isInvalid={!!formErrors.confirmPassword}
                />
                <span
                  className={`password-toggle-icon ${
                    formErrors.confirmPassword ? 'mx-5' : 'mx-3'
                  }`}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <EyeFill /> : <EyeSlashFill />}
                </span>
              </div>
              {formErrors.confirmPassword && (
                <div className="invalid-feedback d-block">
                  {formErrors.confirmPassword}
                </div>
              )}
            </Form.Group>

            <div className="px-4">
              <CustomButton
                type="submit"
                isLoading={isLoading}
                variant="success"
                className="signup-button" 
              >
                Sign Up
              </CustomButton>
            </div>
          </Form>
          <div className="text-center mt-3 mb-4">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </Card>

        {/* Updated ToastMessage with the correct variant */}

        <ToastMessage
          show={showToast}
          onClose={() => setShowToast(false)}
          message={toastMessage}
          variant={toastVariant} 
        />
        <SuccessModal show={showModal} onClose={() => setShowModal(false)} />
      </Container>
    </div>
  );
};

export default SignUpForm;
