import { UserBase, UserWithID, UserCreateUpdate } from '../types/user';

// Simple email validation regex (basic)
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate user creation/update input
export function validateUserInput(user: UserCreateUpdate): { [key: string]: string } {
  const errors: { [key: string]: string } = {};

  if (!user.username || user.username.trim() === '') {
    errors.username = 'Username is required';
  }

  if (!user.email || !isValidEmail(user.email)) {
    errors.email = 'Valid email is required';
  }

  if (user.password !== undefined && user.password.length <= 8) {
    errors.password = 'Password must be longer than 8 characters';
  }

  return errors;
}

// Convert UserBase to a display string, e.g. "username (email)"
export function formatUserDisplay(user: UserBase): string {
  return `${user.username} (${user.email})`;
}
