export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLogin = (email: string, password: string) => {
  const errors: { email?: string; password?: string } = {};
  if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (!password) {
    errors.password = 'Password is required';
  }
  return errors;
};

export const validateRegister = (name: string, email: string, password: string) => {
  const errors: { name?: string; email?: string; password?: string } = {};
  if (!name.trim()) {
    errors.name = 'Name is required';
  }
  if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  return errors;
};

export const validateCheckout = (shippingAddress: string) => {
  const errors: { shippingAddress?: string } = {};
  if (!shippingAddress.trim()) {
    errors.shippingAddress = 'Shipping address is required';
  }
  return errors;
};
