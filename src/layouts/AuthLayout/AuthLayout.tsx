import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-0 md:p-6 lg:p-8 font-['Plus_Jakarta_Sans']">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
