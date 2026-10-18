/**
 * Utility functions for input and credential validations in UniPass.
 */

/**
 * Checks if the given email has a valid general format.
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Checks if the email is a verified university/educational email (.edu.vn).
 */
export const isEduEmail = (email: string): boolean => {
  const eduRegex = /@([a-zA-Z0-9-]+\.)*edu\.vn$/i;
  return eduRegex.test(email.trim());
};

/**
 * Password safety check breakdown for live checklist UI.
 */
export interface PasswordCriteriaResult {
  hasMinLength: boolean;
  hasUpperAndNumber: boolean;
  hasSpecialChar: boolean;
  isValid: boolean;
}

/**
 * Validates password against the 3 security criteria:
 * 1. Minimum 8 characters
 * 2. Contains uppercase letter and number
 * 3. Contains special character (@, #, $, etc.)
 */
export const checkPasswordCriteria = (password: string): PasswordCriteriaResult => {
  const hasMinLength = password.length >= 8;
  const hasUpperAndNumber = /[A-Z]/.test(password) && /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=[\]~`/\\]/.test(password);

  return {
    hasMinLength,
    hasUpperAndNumber,
    hasSpecialChar,
    isValid: hasMinLength && hasUpperAndNumber && hasSpecialChar,
  };
};
