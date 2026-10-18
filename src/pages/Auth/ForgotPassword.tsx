import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage';
import { ROUTES } from '@/constants/routes';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ForgotPasswordPage
      onBackToLogin={() => navigate(ROUTES.AUTH.LOGIN)}
      onSubmitSuccess={(identity: string) => {
        navigate(ROUTES.AUTH.RESET_PASSWORD, {
          state: {
            email: identity,
          },
        });
      }}
    />
  );
};

export default ForgotPassword;
