import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OtpVerificationPage } from '@/features/auth/pages/OtpVerificationPage';
import { ROUTES } from '@/constants/routes';

interface LocationState {
  email?: string;
  fullName?: string;
  isResetPassword?: boolean;
}

export const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState | null) || {};

  return (
    <OtpVerificationPage
      email={state.email || 'sinhvien@uit.edu.vn'}
      fullName={state.fullName || 'Sinh viên UniPass'}
      isResetPassword={Boolean(state.isResetPassword)}
      onBackToRegister={() =>
        navigate(state.isResetPassword ? ROUTES.AUTH.FORGOT_PASSWORD : ROUTES.AUTH.REGISTER)
      }
    />
  );
};

export default VerifyOtp;
