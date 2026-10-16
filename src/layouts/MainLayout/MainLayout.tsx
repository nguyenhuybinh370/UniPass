import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface-canvas text-text-primary font-body flex flex-col">
      <Navbar />
      <main className="max-w-[1240px] w-full mx-auto px-4 sm:px-8 py-8 flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
