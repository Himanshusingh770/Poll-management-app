// Email validation function
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isValidEmail = (email) => {
  return emailRegex.test(email);
};
