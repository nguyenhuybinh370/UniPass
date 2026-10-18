import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { ROUTES } from '@/constants/routes';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LoginPage
      onNavigateRegister={() => navigate(ROUTES.AUTH.REGISTER)}
      onForgotPassword={() => navigate(ROUTES.AUTH.FORGOT_PASSWORD)}
      onBackToHome={() => navigate(ROUTES.HOME)}
    />
  );
};

export default Login;
