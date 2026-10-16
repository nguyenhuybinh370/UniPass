import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/constants/routes';
import { Spinner } from '@/components/ui/Spinner';

export interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`${ROUTES.AUTH.LOGIN}?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
