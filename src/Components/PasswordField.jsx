// PasswordField.js
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

const PasswordField = ({
  label,
  name,
  value,
  onChange,
  isInvalid,
  errorMessage,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group className="mb-3 px-4">
      <Form.Label>{label}</Form.Label>
      <div className="position-relative">
        <Form.Control
          className="pe-5"
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          isInvalid={isInvalid}
        />
        <span
          className={`password-toggle-icon ${isInvalid ? 'mx-5' : 'mx-3'}`}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <EyeFill /> : <EyeSlashFill />}
        </span>
      </div>
      {isInvalid && (
        <div className="invalid-feedback d-block">
          {errorMessage}
        </div>
      )}
    </Form.Group>
  );
};

export default PasswordField;
