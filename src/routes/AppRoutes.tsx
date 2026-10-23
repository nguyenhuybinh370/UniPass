import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ROUTES } from '@/constants/routes';
import { Spinner } from '@/components/ui/Spinner';

import { ProtectedRoute } from '@/routes/ProtectedRoute';

// Lazy loading pages
const HomePage = lazy(() => import('@/pages/Home'));
const RegisterPage = lazy(() => import('@/pages/Auth/Register'));
const LoginPage = lazy(() => import('@/pages/Auth/Login'));
const VerifyOtpPage = lazy(() => import('@/pages/Auth/VerifyOtp'));
const ForgotPasswordPage = lazy(() => import('@/pages/Auth/ForgotPassword'));
const ResetPasswordPage = lazy(() => import('@/pages/Auth/ResetPassword'));
const ProfilePage = lazy(() => import('@/pages/Profile'));
const MyPostDetailPage = lazy(() => import('@/pages/MyPostDetail'));
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
        {/* Auth Routes */}
        <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path={ROUTES.AUTH.VERIFY_OTP} element={<VerifyOtpPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path={ROUTES.AUTH.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path={ROUTES.AUTH.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* MainLayout Routes */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PROFILE.ME} element={<ProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/overview" element={<ProfilePage />} />
          <Route path="/profile/security" element={<ProfilePage />} />
          <Route
            path={ROUTES.PROFILE.MY_POST_DETAIL()}
            element={
              <ProtectedRoute>
                <MyPostDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/my-posts/:id"
            element={
              <ProtectedRoute>
                <MyPostDetailPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
