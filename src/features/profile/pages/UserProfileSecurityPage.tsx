import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/context/AuthContext';
import {
  ProfileSidebar,
  StudentInfoSection,
  SecurityPasswordSection,
  StudentInfoData,
} from '../components';

export const UserProfileSecurityPage: React.FC = () => {
  const { user } = useAuth();

  // Dữ liệu ban đầu từ AuthContext hoặc Mock mặc định
  const initialStudentInfo: StudentInfoData = useMemo(() => {
    const rawSchool = user?.school || 'ĐH Công nghệ Thông tin';
    const rawMssv = user?.studentId || '22520148';
    return {
      fullName: user?.name || 'Nguyễn Huy Bình',
      mssv: `${rawMssv} (${rawSchool})`,
      eduEmail: user?.email || 'nguyenhuybinh@uit.edu.vn',
      phone: '0901 234 567',
    };
  }, [user]);

  return (
    <div className="min-h-screen w-full bg-[#FAF6F0] flex flex-col items-center py-6 px-4 md:px-8 font-body">
      {/* Container căn giữa chuẩn Figma: max-w-[1180px] */}
      <div className="w-full max-w-[1180px] flex flex-col gap-6">
        {/* A. Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[13px] text-[#756A63] font-body"
        >
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-1.5 hover:text-[#221A14] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Trang chủ</span>
          </Link>
          <span className="text-[#9E928A] select-none">&gt;</span>
          <span className="hover:text-[#221A14] transition-colors cursor-pointer">
            Tài khoản sinh viên
          </span>
          <span className="text-[#9E928A] select-none">&gt;</span>
          <span className="font-semibold text-[#221A14]">
            Thông tin cá nhân &amp; Bảo mật
          </span>
        </nav>

        {/* B. Main 2-Column Dashboard Grid: Gap 24px */}
        <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
          {/* 1. LEFT SIDEBAR (ProfileSidebar) */}
          <ProfileSidebar
            fullName={initialStudentInfo.fullName}
            phone={initialStudentInfo.phone}
            postsCount={4}
            activeTab="profile-security"
          />

          {/* 2. RIGHT MAIN CONTENT CARD */}
          <main className="flex-1 w-full bg-white rounded-[14px] p-6 sm:p-8 shadow-[0px_2px_8px_rgba(45,36,30,0.05)] border border-[#E6DACD]/40 flex flex-col gap-8">
            {/* Phần 1: Thông tin sinh viên */}
            <StudentInfoSection initialData={initialStudentInfo} />

            {/* Divider giữa 2 phần */}
            <div className="h-[1px] w-full bg-[#E6DACD]" />

            {/* Phần 2: Bảo mật & Đổi mật khẩu */}
            <SecurityPasswordSection />
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSecurityPage;
