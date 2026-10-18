import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage';
import { ROUTES } from '@/constants/routes';

interface LocationState {
  email?: string;
}

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState | null) || {};

  return (
    <ResetPasswordPage
      email={state.email}
      onResetSuccess={() => navigate(ROUTES.AUTH.LOGIN)}
      onBackToLogin={() => navigate(ROUTES.AUTH.LOGIN)}
    />
  );
};

export default ResetPassword;
