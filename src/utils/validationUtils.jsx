export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
// Enhanced password validation
export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(password);
};

// New validation for name fields (minimum 3 characters)
export const isValidName = (name) => {
  return name.length > 3;
};


export const validateField = (value, fieldName, formData, isSignup = false) => {
  if (!value.trim()) {
    return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
  }
  
  // Name validation  
  if ((fieldName === 'firstName') && !isValidName(value)) {
    return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least 3 characters long.`;
  }
  if (fieldName === 'email' && !isValidEmail(value)) {
    return 'Please enter a valid email address.';
  }
  if (fieldName === 'password') {
    if (!isSignup) {
      return '';
    }
    if (!isValidPassword(value)) {
      return 'Password must be at least 6 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.';
    }
  }
  if (isSignup && fieldName === 'confirmPassword') {
    if (value !== formData.password) {
      return 'Passwords do not match.';
    }
  }
  return'';
};
export const validateForm = (formData, isSignup = false) => {
  let errors = {};
  let isFormValid = true;
  Object.keys(formData).forEach((key) => {
    const errorData = validateField(formData[key], key, formData, isSignup);
    errors[key] = errorData;
    if (errorData.length) {
      isFormValid = false;
    }
  });
  return { errors, isFormValid };
};
