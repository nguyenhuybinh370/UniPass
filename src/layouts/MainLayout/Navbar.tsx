import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Search,
  MessageSquare,
  Bell,
  Plus,
  Sprout,
  LogIn,
} from 'lucide-react';
import { HeaderUser } from '@/types/ui/header';
import { headerCategories as defaultCategories } from '@/mocks/data/ui/header';
import { LoginModal } from '@/components/auth';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/feedback/Toast';
import { ROUTES } from '@/constants/routes';
import { UserProfile } from '@/features/profile/types';
import { UserMenuDropdown } from './UserMenuDropdown';

export interface NavbarProps {
  onSearch?: (query: string) => void;
  onPostClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, onPostClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, login, logout } = useAuth();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(defaultCategories[0]?.label || '');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Tự động mở LoginModal khi chuyển hướng từ Register hoặc có query param ?login=true
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const stateObj = location.state as { openLogin?: boolean } | null;
    if (stateObj?.openLogin || searchParams.get('login') === 'true') {
      setIsLoginModalOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location]);

  const handleOpenLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalSuccess = (loggedInUser: HeaderUser) => {
    login({
      id: loggedInUser.id || `user-${Date.now()}`,
      email: loggedInUser.email || 'sinhvien@uit.edu.vn',
      name: loggedInUser.name,
      studentId: loggedInUser.studentId,
      school: loggedInUser.school,
      reputationRating: loggedInUser.reputationRating,
      avatarInitial: loggedInUser.avatarInitial,
      role: loggedInUser.role || 'STUDENT',
    });
    setIsLoginModalOpen(false);
    showToast({
      type: 'success',
      message: `Chào mừng ${loggedInUser.name} (${loggedInUser.school}) đã đăng nhập!`,
    });
  };

  const handleLogout = () => {
    logout();
    showToast({
      type: 'info',
      message: 'Đã đăng xuất tài khoản.',
    });
  };

  const userProfile: UserProfile | null = useMemo(() => {
    if (!user) return null;
    return {
      fullName: user.name,
      email: user.email,
      campusLocation: user.school ? `KTX Khu B, ${user.school}` : 'KTX Khu B, ĐHQG',
      isVerifiedStudent: true,
      stats: {
        activePostsCount: 3,
        giftedCount: 1,
        reputationScore: user.reputationRating ? Math.round((user.reputationRating / 5) * 100) : 100,
      },
    };
  }, [user]);

  const handlePostClickAction = () => {
    if (!isAuthenticated) {
      showToast({
        type: 'info',
        message: 'Vui lòng đăng nhập để đăng tin pass đồ hoặc tặng 0đ!',
      });
      setIsLoginModalOpen(true);
      return;
    }
    if (onPostClick) {
      onPostClick();
    } else {
      navigate(ROUTES.POSTS.CREATE);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        showToast(`🔍 Tìm kiếm: "${searchQuery}"`);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-surface-card shadow-warm-xs">
      {/* Tier 1: Announcement Bar */}
      <div className="h-[28px] bg-surface-announcement border-b border-border-card text-xs">
        <div className="max-w-[1240px] h-full mx-auto px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-text-primary/80 text-[12px] truncate">
            <Sprout className="w-3.5 h-3.5 text-secondary-500 flex-shrink-0" />
            <span className="truncate">
              Chiến dịch Dọn KTX xanh: Hơn 1.200 cuốn giáo trình và đồ dùng vừa được trao đổi tuần này!
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[12px] text-text-muted flex-shrink-0">
            <a href="#safe-rules" className="hover:text-brand-primary transition-colors">
              Quy tắc an toàn
            </a>
            <span className="text-border-subtle">•</span>
            <a href="#verify-student" className="hover:text-brand-primary transition-colors">
              Xác thực thẻ SV
            </a>
            <span className="text-border-subtle">•</span>
            <a href="#help" className="hover:text-brand-primary transition-colors">
              Trợ giúp
            </a>
          </div>
        </div>
      </div>

      {/* Tier 2: Main Header */}
      <div className="h-[71px] bg-surface-card border-b border-border-divider">
        <div className="max-w-[1240px] h-full mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-orange-200/60 flex items-center justify-center text-brand-primary shadow-warm-xs group-hover:scale-105 transition-warm">
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="font-heading font-bold text-[22px] text-brand-primary tracking-tight">
              UniPass
            </span>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-[672px] h-[42px] rounded-xl border border-border-card bg-surface-announcement flex items-center pl-3.5 pr-0 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/15 transition-warm overflow-hidden"
          >
            <Search className="w-4 h-4 text-text-muted flex-shrink-0 mr-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên sách, mã môn học (VD: IT001, MA003), máy tính Casio..."
              className="w-full h-full bg-transparent text-sm text-text-primary placeholder:text-text-disabled outline-none font-body"
            />
            <button
              type="submit"
              className="h-full px-5 bg-brand-primary hover:bg-brand-600 text-white text-xs font-semibold rounded-r-xl flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
            >
              Tìm kiếm
            </button>
          </form>

          {/* User Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Icon Chat */}
            <Link
              to={ROUTES.CHAT}
              aria-label="Tin nhắn"
              className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-announcement rounded-full transition-colors relative"
            >
              <MessageSquare className="w-5 h-5" />
            </Link>

            {/* Icon Chuông thông báo */}
            <button
              type="button"
              aria-label="Thông báo"
              onClick={() => showToast('🔔 Bạn không có thông báo mới.')}
              className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-announcement rounded-full transition-colors relative cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {/* User Dropdown hoặc Nút Đăng nhập */}
            {userProfile ? (
              <UserMenuDropdown
                user={userProfile}
                onNavigate={(route) => {
                  if (route.startsWith('#')) {
                    const el = document.querySelector(route);
                    el?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate(route);
                  }
                }}
                onLogout={handleLogout}
              />
            ) : (
              <button
                type="button"
                onClick={handleOpenLogin}
                className="h-[40px] px-3.5 sm:px-4 rounded-xl border border-border-card bg-surface-card hover:bg-surface-announcement hover:border-brand-primary/40 text-text-primary text-[14px] font-semibold flex items-center gap-2 shadow-warm-xs hover-lift transition-warm flex-shrink-0 active:scale-98 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-brand-primary" />
                <span>Đăng nhập</span>
              </button>
            )}

            {/* Nút Primary CTA: + Đăng tin */}
            <button
              type="button"
              onClick={handlePostClickAction}
              className="h-[40px] px-3.5 sm:px-4 rounded-xl bg-brand-primary hover:bg-brand-600 active:scale-98 text-white text-[14px] font-semibold flex items-center gap-1.5 shadow-warm-xs hover-lift transition-warm flex-shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Đăng tin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tier 3: Category Sub-Navbar */}
      <nav className="h-[45px] bg-surface-card border-b border-border-divider">
        <div className="max-w-[1240px] h-full mx-auto px-4 sm:px-8 flex items-center overflow-x-auto no-scrollbar scroll-smooth">
          <ul className="flex items-center gap-6 text-[13.5px] font-medium text-text-primary whitespace-nowrap">
            {defaultCategories.map((category) => {
              const isActive = activeCategory === category.label;
              return (
                <li key={category.id} className="h-full flex items-center">
                  <button
                    type="button"
                    onClick={() => setActiveCategory(category.label)}
                    className={`py-2 px-1 flex items-center gap-1.5 transition-colors relative cursor-pointer ${
                      isActive
                        ? 'text-brand-primary font-semibold'
                        : 'text-text-primary hover:text-brand-primary'
                    }`}
                  >
                    <span>{category.label}</span>
                    {category.isHot && (
                      <span className="px-1.5 py-0.2 rounded-pill bg-red-500 text-white text-[10px] font-bold tracking-wider uppercase animate-pulse">
                        HOT
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary rounded-pill" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Modal Đăng nhập */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginModalSuccess}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          navigate(ROUTES.AUTH.REGISTER);
        }}
        onForgotPassword={() => {
          setIsLoginModalOpen(false);
          navigate(ROUTES.AUTH.FORGOT_PASSWORD);
        }}
      />
    </header>
  );
};
