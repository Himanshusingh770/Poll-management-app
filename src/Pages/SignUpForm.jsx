import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Container, Card } from 'react-bootstrap';
import ToastMessage from '../Components/TostMassege'; // Ensure the path is correct
import { signup } from '../slices/authSlice';
import { fetchRoles } from '../slices/rolesSlice'; // Using API call
import { validateField, validateForm } from '../utils/validationUtils';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import '../App.css';
import SuccessModal from '../Components/SucessModel';
import CustomButton from '../Components/ButtonModel/CustomButtonModel';

// Simple JSON Data when API runs, remove this when using API
const rolesData = [
  {
    id: 1,
    name: 'Admin',
    description: 'Admin of the company',
    createdAt: '2024-10-14T05:17:30.000Z',
    updatedAt: '2024-10-14T05:17:30.000Z',
  },
  {
    id: 2,
    name: 'Employee',
    description: 'Employee of the company',
    createdAt: '2024-10-14T05:17:13.000Z',
    updatedAt: '2024-10-14T05:17:13.000Z',
  },
  {
    id: 3,
    name: 'HR',
    description: 'HR of the company',
    createdAt: '2024-10-14T05:17:21.000Z',
    updatedAt: '2024-10-14T05:17:21.000Z',
  },
  {
    id: 5,
    name: 'pilot',
    description:
      'A pilot is trained to operate aircraft. As part of their duties, they file flight plans, perform maintenance checks and ensure the craft is ready for departure',
    createdAt: '2024-10-18T10:23:44.000Z',
    updatedAt: '2024-10-18T10:23:44.000Z',
  },
];

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    roleId: '', // Changed from role to roleId
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' }); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOkModal, setshowOkModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Uncomment this line to use API roles fetching
  // useEffect(() => { dispatch(fetchRoles()); }, [dispatch]);
  useEffect(() => {
    // dispatch(fetchRoles()); // use API call
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isFormValid } = validateForm(formData, true);
    setFormErrors(errors);

    if (!isFormValid) return;

    setIsLoading(true);
    try {
      await dispatch(signup(formData)).unwrap();
      setshowOkModal(true);
    } catch (error) {
      setToast({
        show: true,
        message: error?.message || 'Email Alredy Exist Try with another email.',
        variant: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validateField(value, name, { ...formData, [name]: value }, true);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleModalOkClick = () => {
    navigate('/'); 
    setshowOkModal(false);
  };

  return (
    <div className="signup-main-container">
      <Container className="signup-container">
        <Card className="signup-card">
          <h2 className="text-center mb-1">Sign Up</h2>

          <Form noValidate onSubmit={handleSubmit}>
            {/* First Name Field */}
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

            {/* Last Name Field */}
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

            {/* Email Field */}
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

            {/* Role Selection */}
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

            {/* Password Field */}
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
                  onClick={() => togglePasswordVisibility('password')}
                >
                  {showPassword ? <EyeFill /> : <EyeSlashFill />}
                </span>
              </div>
              {formErrors.password && (
                <div className="text-danger password-error">
                  {formErrors.password}
                </div>
              )}
            </Form.Group>

            {/* Confirm Password Field */}
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
                  onClick={() => togglePasswordVisibility('confirmPassword')}
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

            {/* Submit Button */}
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

          {/* Link to Login */}
          <div className="text-center mt-3 mb-4">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </Card>

        {/* Toast Message for Error Handling */}
        <ToastMessage
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          message={toast.message}
          variant={toast.variant}
        />

        {/* Success Modal */}
        <SuccessModal
          show={showOkModal}
          onClose={() => setshowOkModal(false)}
          message="Sign Up Successfully!!"
          okButton="OK"
          onOkClick={handleModalOkClick}
        />
      </Container>
    </div>
  );
};

export default SignUpForm;

