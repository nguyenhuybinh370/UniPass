import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EyeOff,
  LayoutDashboard,
  Tag,
  Repeat,
  UserCheck,
  LogOut,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/feedback/Toast';

export interface ProfileSidebarProps {
  fullName: string;
  phone: string;
  postsCount?: number;
  isVerified?: boolean;
  activeTab?: 'overview' | 'posts' | 'offers' | 'profile-security';
  onTabChange?: (tab: 'overview' | 'posts' | 'offers' | 'profile-security') => void;
  onLogout?: () => void;
  className?: string;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  fullName,
  phone,
  postsCount = 4,
  isVerified = true,
  activeTab = 'overview',
  onTabChange,
  onLogout,
  className = '',
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { showToast } = useToast();

  // Chữ cái đại diện avatar (VD: "Nguyễn Huy Bình" -> "NB")
  const avatarInitials = useMemo(() => {
    if (!fullName) return 'SV';
    const words = fullName.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    const first = words[0][0];
    const last = words[words.length - 1][0];
    return `${first}${last}`.toUpperCase();
  }, [fullName]);

  // Số điện thoại ẩn danh (VD: "0901 234 567" -> "09****4567")
  const maskedPhone = useMemo(() => {
    const cleaned = phone.replace(/\s+/g, '');
    if (cleaned.length < 6) return cleaned;
    const prefix = cleaned.slice(0, 2);
    const suffix = cleaned.slice(-4);
    return `${prefix}****${suffix}`;
  }, [phone]);

  const handleLogoutAction = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
      showToast({
        type: 'info',
        message: 'Đã đăng xuất khỏi hệ thống UniPass.',
      });
      navigate(ROUTES.HOME);
    }
  };

  const handleNavClick = (tab: 'overview' | 'posts' | 'offers' | 'profile-security') => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      if (tab === 'overview') {
        navigate('/profile/me?tab=overview');
      } else if (tab === 'profile-security') {
        navigate('/profile/me?tab=security');
      } else if (tab === 'posts') {
        navigate('/profile/me?tab=posts');
      } else if (tab === 'offers') {
        navigate(ROUTES.OFFERS.MY_OFFERS);
      }
    }
  };

  return (
    <aside
      className={`w-full lg:w-[300px] shrink-0 bg-white rounded-[14px] p-5 shadow-[0px_2px_8px_rgba(45,36,30,0.05)] border border-[#E6DACD] flex flex-col gap-3 ${className}`}
    >
      {/* Profile Header Summary */}
      <div className="flex flex-col items-center pt-2">
        {/* Avatar với Badge xác thực */}
        <div className="relative">
          <div className="w-[54px] h-[54px] bg-[#9E3D00] text-white font-heading font-bold text-lg flex items-center justify-center rounded-full shadow-[0px_2px_6px_rgba(211,84,0,0.25)] ring-2 ring-[#9E3D00]/15">
            {avatarInitials}
          </div>
          {isVerified && (
            <div className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center absolute -bottom-0.5 -right-0.5 border border-white">
              <Check className="w-3 h-3 text-[#006D3B] stroke-[3]" />
            </div>
          )}
        </div>

        {/* Tên sinh viên */}
        <h3 className="font-heading font-bold text-base text-[#221A14] text-center mt-2.5">
          {fullName}
        </h3>

        {/* Huy hiệu SV chính quy (Overlay Pill) */}
        {isVerified && (
          <div className="px-2.5 py-0.5 bg-[#98F7B5]/40 rounded-full flex items-center justify-center gap-1.5 mt-1 border border-[#98F7B5]/60">
            <ShieldCheck className="w-3 h-3 text-[#006D3B] stroke-[2.2]" />
            <span className="font-body text-[11px] font-semibold text-[#006D3B]">
              Đã xác thực SV
            </span>
          </div>
        )}

        {/* SĐT ẩn danh */}
        <div className="text-[13px] text-[#756A63] tracking-wider flex items-center justify-center gap-1.5 mt-1 font-body">
          <span>{maskedPhone}</span>
          <EyeOff className="w-3.5 h-3.5 text-[#9E928A]" />
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-[#E6DACD] my-1" />

      {/* Vertical Navigation Menu */}
      <nav className="flex flex-col gap-1 font-body">
        {/* Item 1: Tổng quan */}
        {activeTab === 'overview' ? (
          <div className="w-full bg-[#FDF3E1] shadow-[0px_1px_4px_rgba(158,61,0,0.08)] border-l-[3px] border-[#9E3D00] rounded-[10px] p-2.5 px-3.5 flex items-center gap-3 select-none">
            <LayoutDashboard className="w-4 h-4 text-[#9E3D00]" />
            <span className="font-semibold text-sm text-[#9E3D00]">
              Tổng quan
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => handleNavClick('overview')}
            className="w-full text-sm font-semibold p-2.5 px-3.5 rounded-[10px] flex items-center gap-3 transition-colors text-left text-[#756A63] hover:text-[#221A14] hover:bg-[#FAF6F0] cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4 text-[#756A63]" />
            <span>Tổng quan</span>
          </button>
        )}

        {/* Item 2: Quản lý bài đăng pass */}
        {activeTab === 'posts' ? (
          <div className="w-full bg-[#FDF3E1] shadow-[0px_1px_4px_rgba(158,61,0,0.08)] border-l-[3px] border-[#9E3D00] rounded-[10px] p-2.5 px-3.5 flex items-center justify-between select-none">
            <div className="flex items-center gap-3">
              <Tag className="w-4 h-4 text-[#9E3D00]" />
              <span className="font-semibold text-sm text-[#9E3D00]">
                Quản lý bài đăng pass
              </span>
            </div>
            <span className="bg-[#FAF6F0] text-[#9E3D00] text-[11px] font-semibold px-2 py-0.5 rounded-full border border-[#E6DACD]/50">
              {postsCount} tin
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => handleNavClick('posts')}
            className="w-full text-sm font-semibold p-2.5 px-3.5 rounded-[10px] flex items-center justify-between transition-colors text-left cursor-pointer text-[#756A63] hover:text-[#221A14] hover:bg-[#FAF6F0]"
          >
            <div className="flex items-center gap-3">
              <Tag className="w-4 h-4 text-[#756A63]" />
              <span>Quản lý bài đăng pass</span>
            </div>
            <span className="bg-[#FDF3E1] text-[#9E3D00] text-[11px] font-semibold px-2 py-0.5 rounded-full border border-[#E6DACD]/50">
              {postsCount} tin
            </span>
          </button>
        )}

        {/* Item 3: Đồ 0đ & Đổi đồ đã nhận */}
        <button
          type="button"
          onClick={() => handleNavClick('offers')}
          className={`w-full text-sm font-semibold p-2.5 px-3.5 rounded-[10px] flex items-center gap-3 transition-colors text-left cursor-pointer ${
            activeTab === 'offers'
              ? 'bg-[#FDF3E1] text-[#9E3D00] border-l-[3px] border-[#9E3D00]'
              : 'text-[#756A63] hover:text-[#221A14] hover:bg-[#FAF6F0]'
          }`}
        >
          <Repeat className="w-4 h-4 text-[#756A63]" />
          <span>Đồ 0đ &amp; Đổi đồ đã nhận</span>
        </button>

        {/* Item 4: Thông tin cá nhân & KTX */}
        {activeTab === 'profile-security' ? (
          <div className="w-full bg-[#FDF3E1] shadow-[0px_1px_4px_rgba(158,61,0,0.08)] border-l-[3px] border-[#9E3D00] rounded-[10px] p-2.5 px-3.5 flex items-center gap-3 select-none">
            <UserCheck className="w-4 h-4 text-[#9E3D00]" />
            <span className="font-semibold text-sm text-[#9E3D00]">
              Thông tin cá nhân &amp; KTX
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => handleNavClick('profile-security')}
            className="w-full text-sm font-semibold p-2.5 px-3.5 rounded-[10px] flex items-center gap-3 transition-colors text-left text-[#756A63] hover:text-[#221A14] hover:bg-[#FAF6F0] cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-[#756A63]" />
            <span>Thông tin cá nhân &amp; KTX</span>
          </button>
        )}

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#E6DACD] my-1" />

        {/* Item 5: Đăng xuất */}
        <button
          type="button"
          onClick={handleLogoutAction}
          className="w-full text-sm font-medium text-[#756A63] hover:text-[#C0392B] hover:bg-[#FBECEB] p-2.5 px-3.5 rounded-[10px] flex items-center gap-3 transition-colors text-left cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Đăng xuất</span>
        </button>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
