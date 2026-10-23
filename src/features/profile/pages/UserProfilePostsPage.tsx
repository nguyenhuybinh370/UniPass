import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/context/AuthContext';
import { ProfileSidebar, PostManagementTab } from '../components';
import { mockOverviewStats } from '@/mocks/data/profile';

export const UserProfilePostsPage: React.FC = () => {
  const { user } = useAuth();

  // Thông tin sinh viên
  const studentInfo = useMemo(() => {
    return {
      fullName: user?.name || 'Nguyễn Huy Bình',
      phone: '0901 234 567',
    };
  }, [user]);

  return (
    <div className="min-h-screen w-full bg-[#FAF6F0] flex flex-col items-center py-6 px-4 md:px-8 font-body">
      {/* Khung container chuẩn Figma: w-full max-w-[1180px] flex flex-col gap-5 */}
      <div className="w-full max-w-[1180px] flex flex-col gap-5">
        {/* A. Thanh điều hướng Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[13px] text-[#756A63] font-body h-5"
        >
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-1.5 hover:text-[#221A14] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Trang chủ</span>
          </Link>
          <span className="text-[#9E928A] select-none">&gt;</span>
          <Link
            to="/profile/me?tab=overview"
            className="hover:text-[#221A14] transition-colors"
          >
            Tài khoản sinh viên
          </Link>
          <span className="text-[#9E928A] select-none">&gt;</span>
          <span className="font-semibold text-[#221A14]">Quản lý bài đăng pass</span>
        </nav>

        {/* B. Khung bố cục 2 cột (Two-Column Dashboard Grid: Gap 24px) */}
        <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
          {/* CỘT TRÁI: SIDEBAR TÀI KHOẢN (w-[300px]) */}
          <ProfileSidebar
            fullName={studentInfo.fullName}
            phone={studentInfo.phone}
            postsCount={mockOverviewStats.posts.active}
            isVerified={true}
            activeTab="posts"
          />

          {/* CỘT PHẢI: KHUNG QUẢN LÝ BÀI ĐĂNG (w-[808px] / flex-1) */}
          <main className="flex-1 w-full min-w-0">
            <PostManagementTab />
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePostsPage;
