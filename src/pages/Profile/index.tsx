import React from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import UserProfileOverviewPage from '@/features/profile/pages/UserProfileOverviewPage';
import UserProfileSecurityPage from '@/features/profile/pages/UserProfileSecurityPage';
import UserProfilePostsPage from '@/features/profile/pages/UserProfilePostsPage';

const ProfilePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const tab = searchParams.get('tab');

  if (tab === 'security' || location.pathname.endsWith('/security')) {
    return <UserProfileSecurityPage />;
  }

  if (tab === 'posts' || location.pathname.endsWith('/posts')) {
    return <UserProfilePostsPage />;
  }

  // Mặc định hiển thị tab Tổng quan hồ sơ sinh viên
  return <UserProfileOverviewPage />;
};

export default ProfilePage;
