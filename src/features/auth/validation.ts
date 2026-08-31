const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OMAN_PHONE = /^\+968\d{8}$/;

export function validateEmail(email: string): string | null {
  const value = email.trim();
  if (!value) return 'Enter your email.';
  if (!EMAIL.test(value)) return 'Enter a valid email address.';
  return null;
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return 'Password must be at least 8 characters.';
  return null;
}

export function validateDisplayName(name: string): string | null {
  if (name.trim().length < 2) return 'Enter your name.';
  return null;
}

export function validatePhone(phone: string): string | null {
  const value = phone.replace(/\s/g, '');
  if (!value) return 'Enter your phone number.';
  if (!OMAN_PHONE.test(value) && !/^\+\d{8,15}$/.test(value)) {
    return 'Enter a phone number with country code, e.g. +9689xxxxxxx.';
  }
  return null;
}

export function validateOtp(code: string): string | null {
  if (!/^\d{6}$/.test(code.trim())) return 'Enter the 6-digit code.';
  return null;
}

export function normalizePhone(phone: string): string {
  return phone.replace(/\s/g, '');
}
