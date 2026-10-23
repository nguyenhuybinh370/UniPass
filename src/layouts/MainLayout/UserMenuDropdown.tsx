import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  ChevronDown,
  ShieldCheck,
  Package,
  UserCheck,
  KeyRound,
  ShieldAlert,
  LogOut,
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { AccountDropdownProps } from '@/types/ui/header';
import { useClickOutside } from '@/hooks/useClickOutside';

export type { UserProfile } from '@/features/profile/types';
export type { AccountDropdownProps, UserMenuDropdownProps } from '@/types/ui/header';

export const UserMenuDropdown: React.FC<AccountDropdownProps> = ({
  user,
  onNavigate,
  onLogout,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi nhấp ra ngoài
  useClickOutside(containerRef, () => {
    if (isOpen) setIsOpen(false);
  });

  // Đóng dropdown khi nhấn phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Chữ cái đại diện avatar nếu không có ảnh
  const avatarInitial = useMemo(() => {
    if (!user.fullName) return 'U';
    const parts = user.fullName.trim().split(/\s+/);
    return parts[parts.length - 1]?.charAt(0).toUpperCase() || 'U';
  }, [user.fullName]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = useCallback(
    (route: string) => {
      setIsOpen(false);
      onNavigate(route);
    },
    [onNavigate]
  );

  const handleLogoutClick = useCallback(() => {
    setIsOpen(false);
    onLogout();
  }, [onLogout]);

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* 1. Trigger Button on Header */}
      <button
        ref={triggerRef}
        id="user-menu-button"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="user-menu-dropdown"
        onClick={toggleDropdown}
        className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover:bg-[#FAF6F0] border border-transparent hover:border-[#E6DACD] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D35400]/20"
      >
        {/* Avatar */}
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            className="w-9 h-9 rounded-full object-cover border-2 border-[#D35400]/20 flex-shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[#F3E9DD] text-[#D35400] font-heading font-bold text-sm flex items-center justify-center border-2 border-[#D35400]/20 flex-shrink-0">
            {avatarInitial}
          </div>
        )}

        {/* Tên & Ký túc xá / Phân hiệu */}
        <div className="flex flex-col text-left hidden sm:flex">
          <span className="text-xs font-bold text-[#2D241E] leading-tight font-heading">
            {user.fullName}
          </span>
          <span className="text-[11px] font-medium text-[#756A63] leading-tight font-body">
            {user.campusLocation || 'KTX Khu B, ĐHQG'}
          </span>
        </div>

        {/* ChevronDown icon xoay 180° khi mở */}
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#756A63] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#D35400]' : ''
          }`}
        />
      </button>

      {/* 2. Floating Dropdown Panel */}
      <div
        ref={menuRef}
        id="user-menu-dropdown"
        role="menu"
        aria-labelledby="user-menu-button"
        aria-orientation="vertical"
        className={`absolute right-0 top-full mt-2.5 w-80 bg-white rounded-2xl border border-[#E6DACD] shadow-[0px_8px_24px_rgba(45,36,30,0.12)] z-50 overflow-hidden transform origin-top-right transition-all duration-150 ease-out ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* A. Header tóm tắt hồ sơ (User Profile Quick Card) */}
        <div className="p-4 bg-gradient-to-b from-[#FAF6F0] to-white border-b border-[#E6DACD]/60">
          <div className="flex items-center gap-3">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="w-12 h-12 rounded-full ring-2 ring-[#D35400]/20 object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#F3E9DD] text-[#D35400] font-heading font-bold text-lg flex items-center justify-center ring-2 ring-[#D35400]/20 flex-shrink-0 shadow-warm-xs">
                {avatarInitial}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <h4 className="font-heading text-sm font-bold text-[#2D241E] truncate">
                {user.fullName}
              </h4>
              <span className="text-xs text-[#756A63] truncate max-w-[170px] font-body">
                {user.email}
              </span>
              {user.isVerifiedStudent && (
                <span className="text-[10px] font-semibold text-[#1E824C] bg-[#E8F5E9] py-0.5 px-2 rounded-full inline-flex items-center gap-1 mt-1 self-start font-body">
                  <ShieldCheck className="w-3 h-3 text-[#1E824C] stroke-[2.2]" />
                  Đã xác thực SV ĐHQG
                </span>
              )}
            </div>
          </div>

          {/* Mini Stats Strip */}
          <div className="mt-3 p-2 bg-white rounded-xl border border-[#E6DACD]/50 flex items-center justify-around text-center shadow-warm-xs">
            <div className="flex flex-col flex-1">
              <span className="font-bold text-xs text-[#D35400] font-heading">
                {user.stats?.activePostsCount ?? 3}
              </span>
              <span className="text-[10px] text-[#756A63] font-body">Đang pass</span>
            </div>
            <div className="h-6 w-[1px] bg-[#E6DACD]" />
            <div className="flex flex-col flex-1">
              <span className="font-bold text-xs text-[#1E824C] font-heading">
                {user.stats?.giftedCount ?? 1}
              </span>
              <span className="text-[10px] text-[#756A63] font-body">Tặng 0đ</span>
            </div>
            <div className="h-6 w-[1px] bg-[#E6DACD]" />
            <div className="flex flex-col flex-1">
              <span className="font-bold text-xs text-[#2D241E] font-heading">
                {user.stats?.reputationScore ?? 100}%
              </span>
              <span className="text-[10px] text-[#756A63] font-body">Uy tín</span>
            </div>
          </div>
        </div>

        {/* B. Nhóm Menu - Quản lý hoạt động sinh viên (Activity Group) */}
        <div className="p-2">
          <div className="text-[10px] font-bold tracking-wider text-[#9E928A] px-2.5 py-1 uppercase font-body">
            HOẠT ĐỘNG PASS ĐỒ
          </div>
          <div className="space-y-0.5 mt-0.5">
            <button
              type="button"
              role="menuitem"
              onClick={() => handleItemClick('/profile/me?tab=posts')}
              className="w-full h-[38px] px-2.5 rounded-xl hover:bg-[#FAF6F0] flex items-center justify-between transition-colors text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-[#756A63] group-hover:text-[#D35400] transition-colors" />
                <span className="text-xs font-semibold text-[#2D241E] font-body">
                  Quản lý đồ đang pass & tặng
                </span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF6F0] text-[#D35400] border border-[#E6DACD]/60 font-body">
                {user.stats?.activePostsCount ?? 3}
              </span>
            </button>
          </div>
        </div>

        {/* C. Nhóm Menu - Tài khoản & Khuôn viên KTX (Account & Campus Group) */}
        <div className="border-t border-[#F3E9DD] my-1" />
        <div className="p-2 pt-1">
          <div className="text-[10px] font-bold tracking-wider text-[#9E928A] px-2.5 py-1 uppercase font-body">
            TÀI KHOẢN & AN TOÀN
          </div>
          <div className="space-y-0.5 mt-0.5">
            <button
              type="button"
              role="menuitem"
              onClick={() => handleItemClick(ROUTES.PROFILE.ME)}
              className="w-full h-[38px] px-2.5 rounded-xl hover:bg-[#FAF6F0] flex items-center gap-2.5 transition-colors text-left group cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#756A63] group-hover:text-[#D35400] transition-colors" />
              <span className="text-xs font-semibold text-[#2D241E] font-body">
                Hồ sơ & Khu KTX sinh viên
              </span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => handleItemClick('/profile/me?tab=security')}
              className="w-full h-[38px] px-2.5 rounded-xl hover:bg-[#FAF6F0] flex items-center gap-2.5 transition-colors text-left group cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-[#756A63] group-hover:text-[#D35400] transition-colors" />
              <span className="text-xs font-semibold text-[#2D241E] font-body">
                Đổi mật khẩu tài khoản
              </span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => handleItemClick('#safe-rules')}
              className="w-full h-[38px] px-2.5 rounded-xl hover:bg-[#FAF6F0] flex items-center gap-2.5 transition-colors text-left group cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-[#D35400] group-hover:scale-105 transition-transform" />
              <span className="text-xs font-semibold text-[#2D241E] font-body">
                Quy tắc hẹn gặp an toàn
              </span>
            </button>
          </div>
        </div>

        {/* D. Footer Đăng xuất (Logout Action) */}
        <div className="border-t border-[#F3E9DD] p-2 pt-1">
          <button
            type="button"
            role="menuitem"
            onClick={handleLogoutClick}
            className="w-full h-[38px] px-2.5 rounded-xl hover:bg-[#FBECEB] flex items-center gap-2.5 text-[#C0392B] transition-colors text-left group cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-[#C0392B] group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-xs font-semibold text-[#C0392B] font-body">
              Đăng xuất tài khoản
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Alias export to support both UserMenuDropdown and AccountDropdown naming
export const AccountDropdown = UserMenuDropdown;
export default UserMenuDropdown;
