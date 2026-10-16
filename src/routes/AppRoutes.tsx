import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ROUTES } from '@/constants/routes';
import { Spinner } from '@/components/ui/Spinner';

// Lazy loading pages
const HomePage = lazy(() => import('@/pages/Home'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

const PageLoader: React.FC = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <Spinner size="lg" />
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* MainLayout Routes */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
