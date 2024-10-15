export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
// Function to validate the password field
export const validateField = (value, fieldName) => {
  if (!value.trim()) {
    return `${fieldName} is required.`;
  }
  if (fieldName === 'email' && !isValidEmail(value)) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validateForm = (formData) => {
  let errors = {};
  let isFormValid = true;
  Object.keys(formData).forEach((key) => {
    const errorData = validateField(formData[key], key);
    errors[key] = errorData;
    if (errorData.length) {
      isFormValid = false;
    }
  });
  return { errors, isFormValid };
};
