export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedTerms: boolean;
}

export interface RegisterPageProps {
  /**
   * Callback to navigate or reopen Login Modal
   */
  onNavigateLogin?: () => void;
  /**
   * Callback to navigate back to Home Page
   */
  onBackToHome?: () => void;
  /**
   * Callback invoked after successful registration
   */
  onRegisterSuccess?: (user: { name: string; email: string; isEdu: boolean }) => void;
}

export interface RegisterResponse {
  user: {
    id: string;
    name: string;
    email: string;
    school: string;
    isVerifiedEdu: boolean;
  };
  token: string;
}

export interface OtpVerificationProps {
  email?: string;
  fullName?: string;
  isResetPassword?: boolean;
  backButtonLabel?: string;
  onVerifySuccess?: (otp: string) => void;
  onResendOtp?: () => Promise<void> | void;
  onBackToRegister?: () => void;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginPageProps {
  onNavigateRegister?: () => void;
  onForgotPassword?: () => void;
  onBackToHome?: () => void;
  onLoginSuccess?: (userData: {
    id: string;
    email: string;
    name: string;
    school: string;
    role: 'STUDENT' | 'ADMIN';
  }) => void;
}

export interface ForgotPasswordPageProps {
  onBackToLogin?: () => void;
  onSubmitSuccess?: (identity: string) => void;
}

export interface ResetPasswordPageProps {
  email?: string;
  onResetSuccess?: () => void;
  onBackToLogin?: () => void;
  onResendOtp?: () => Promise<void> | void;
}



