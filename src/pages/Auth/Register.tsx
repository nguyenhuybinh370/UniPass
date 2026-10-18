import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { ROUTES } from '@/constants/routes';

export const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <RegisterPage
      onNavigateLogin={() => navigate(ROUTES.AUTH.LOGIN)}
      onBackToHome={() => navigate(ROUTES.HOME)}
    />
  );
};

export default Register;
