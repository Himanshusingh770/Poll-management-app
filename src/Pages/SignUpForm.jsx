import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Spinner } from 'react-bootstrap';
import ToastMessage from '../Components/TostMassege';
import { signup } from '../slices/authSlice';
import { fetchRoles } from '../slices/rolesSlice'; //  using API call
import { validateField, validateForm } from '../utils/validationUtils';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import '../App.css'
// Sample static JSON data for roles
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
];
const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    roleId: '',  // Changed from role to roleId
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const roles = useSelector((state) => state.roles.roles); //  using API
  // const rolesError = useSelector((state) => state.roles.error); // when using API

  useEffect(() => {
    // dispatch(fetchRoles()); // use API call
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isFormValid } = validateForm(formData, true);
    setFormErrors(errors);

    if (!isFormValid) return;

    setIsLoading(true);
    dispatch(signup(formData))
      .unwrap()
      .then(() => {
        setShowToast(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch(() => setIsLoading(false));
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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Container className="signup-container">
      <Card className="signup-card">
        <h2 className="text-center mb-2">Sign Up</h2>

        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleValueChange}
              isInvalid={!!formErrors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.firstName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleValueChange}
              isInvalid={!!formErrors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.lastName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleValueChange}
              isInvalid={!!formErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="roleId"            // Note this change
              value={formData.roleId}  // roleId is now used
              onChange={handleValueChange}
              isInvalid={!!formErrors.roleId}
            >
              <option value="">Select Role</option>
              {rolesData.length > 0 ? (
                rolesData.map((role) => (
                  <option key={role.id} value={role.id}> {/* Use role.id */}
                    {role.name}
                  </option>
                ))
              ) : (
                <option disabled>
                  No roles available
                </option>
              )}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formErrors.roleId}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-2">
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
                className={`password-toggle-icon ${formErrors.password ? 'mx-5' : 'mx-3'}`}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </span>
            </div>
            {formErrors.password && (
              <div className="text-danger mt-1 text-error">
                {formErrors.password}
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleValueChange}
              isInvalid={!!formErrors.confirmPassword}
            />
            
            <Form.Control.Feedback type="invalid">
              {formErrors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" disabled={isLoading} className="w-100">
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
          </Button>
        </Form>
        <div className="text-center mt-2">
          Already have an account? <Link to="/">Login</Link>
        </div>
        
      </Card>
      <ToastMessage
          show={showToast}
          onClose={() => setShowToast(false)}
          message="Sign Up Successfully!!"
          variant="success"
        />

       
    </Container>
  );
};

export default SignUpForm;
