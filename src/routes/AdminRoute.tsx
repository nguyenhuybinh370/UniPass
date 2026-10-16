import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/constants/routes';
import { Spinner } from '@/components/ui/Spinner';

export interface AdminRouteProps {
  children: React.ReactElement;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};

export default AdminRoute;
