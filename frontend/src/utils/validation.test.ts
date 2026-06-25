import { describe, it, expect } from 'vitest';
import { validateLogin, validateRegister, validateCheckout } from './validation';

describe('validateLogin', () => {
  it('should return error for empty email', () => {
    const result = validateLogin('', 'password123');
    expect(result.email).toBe('Please enter a valid email address');
    expect(result.password).toBeUndefined();
  });

  it('should return error for invalid email format', () => {
    const result = validateLogin('invalid-email', 'password123');
    expect(result.email).toBe('Please enter a valid email address');
  });

  it('should return error for empty password', () => {
    const result = validateLogin('test@example.com', '');
    expect(result.password).toBe('Password is required');
    expect(result.email).toBeUndefined();
  });

  it('should return empty errors for valid inputs', () => {
    const result = validateLogin('test@example.com', 'password123');
    expect(result).toEqual({});
  });
});

describe('validateRegister', () => {
  it('should return error for empty name', () => {
    const result = validateRegister(' ', 'test@example.com', 'password123');
    expect(result.name).toBe('Name is required');
  });

  it('should return error for invalid email', () => {
    const result = validateRegister('John Doe', 'invalid', 'password123');
    expect(result.email).toBe('Please enter a valid email address');
  });

  it('should return error for short password', () => {
    const result = validateRegister('John Doe', 'test@example.com', '12345');
    expect(result.password).toBe('Password must be at least 6 characters');
  });

  it('should return empty errors for valid inputs', () => {
    const result = validateRegister('John Doe', 'test@example.com', 'password123');
    expect(result).toEqual({});
  });
});

describe('validateCheckout', () => {
  it('should return error for empty shipping address', () => {
    const result = validateCheckout('   ');
    expect(result.shippingAddress).toBe('Shipping address is required');
  });

  it('should return empty errors for valid shipping address', () => {
    const result = validateCheckout('123 Main St, Springfield');
    expect(result).toEqual({});
  });
});
