import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { LoginModalProps } from '@/types/auth';
import { defaultMockUser, mockUsers } from '@/mocks/data/auth/mockUsers';

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
  onForgotPassword,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // 1. Khóa cuộn trang khi Modal mở (Scroll Lock)
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Tự động focus vào ô email khi mở
      const timer = setTimeout(() => {
        emailInputRef.current?.focus();
      }, 150);

      return () => {
        document.body.style.overflow = originalOverflow;
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setErrorMessage(null);
    setIsLoading(false);
    onClose();
  }, [onClose]);

  // 2. Lắng nghe phím Escape để đóng Modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  // Xử lý gửi Form Đăng nhập
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Vui lòng nhập địa chỉ email của bạn.');
      return;
    }

    if (!password) {
      setErrorMessage('Vui lòng nhập mật khẩu.');
      return;
    }

    setIsLoading(true);

    // Giả lập độ trễ xác thực mạng 600ms
    setTimeout(() => {
      setIsLoading(false);

      // Tìm kiếm trong mock users hoặc dùng default
      const matchedUser =
        mockUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase()) ||
        defaultMockUser;

      if (onLoginSuccess) {
        onLoginSuccess(matchedUser);
      }
      onClose();
    }, 600);
  };

  // Giả lập Đăng nhập bằng Google
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess(defaultMockUser);
      }
      onClose();
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D241E]/40 backdrop-blur-[2px] transition-opacity duration-200 animate-in fade-in"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      {/* Khung Modal Container (Chặn click lan truyền ra ngoài) */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[440px] sm:max-w-[460px] bg-white rounded-[20px] border border-[#EFE6DC] shadow-[0_12px_36px_rgba(45,36,30,0.18)] p-6 sm:p-8 animate-in zoom-in-95 duration-200 ease-out"
      >
        {/* Nút đóng (Close Button ở góc trên bên phải) */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Đóng cửa sổ đăng nhập"
          className="absolute top-5 right-5 p-1.5 text-[#786D65] hover:text-[#2D241E] hover:bg-[#FAF8F5] rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tiêu đề Modal (H2) */}
        <h2
          id="login-modal-title"
          className="text-center text-[24px] font-bold text-[#2D241E] font-heading mb-2"
        >
          Đăng nhập
        </h2>

        {/* Mô tả ngắn (Subtitle) */}
        <p className="text-center text-[13px] leading-relaxed text-[#786D65] font-body mb-6">
          Vui lòng đăng nhập để trao đổi, nhận đồ 0đ và tương tác cùng cộng đồng sinh viên.
        </p>

        {/* Thông báo lỗi nếu có */}
        {errorMessage && (
          <div className="mb-4 p-2.5 rounded-[10px] bg-red-50 border border-red-200 text-red-600 text-xs font-medium animate-in fade-in">
            {errorMessage}
          </div>
        )}

        {/* Form Đăng nhập */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* 1. Trường Email */}
          <div>
            <label
              htmlFor="login-email"
              className="block font-bold text-[13px] text-[#2D241E] mb-1.5"
            >
              Email
            </label>
            <input
              ref={emailInputRef}
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn (ưu tiên email @...edu.vn)"
              disabled={isLoading}
              className="w-full h-[42px] px-3.5 py-2.5 text-[14px] text-[#2D241E] placeholder:text-[#9E928A] bg-white border border-[#EBE3D8] rounded-[10px] focus:border-[#D9531E] focus:ring-2 focus:ring-[#D9531E]/20 outline-none transition-all"
            />
          </div>

          {/* 2. Trường Mật khẩu */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="login-password"
                className="font-bold text-[13px] text-[#2D241E]"
              >
                Mật khẩu
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-[12px] font-medium text-[#D9531E] hover:underline cursor-pointer"
              >
                Quên mật khẩu?
              </button>
            </div>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                disabled={isLoading}
                className="w-full h-[42px] pl-3.5 pr-10 py-2.5 text-[14px] text-[#2D241E] placeholder:text-[#9E928A] bg-white border border-[#EBE3D8] rounded-[10px] focus:border-[#D9531E] focus:ring-2 focus:ring-[#D9531E]/20 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E928A] hover:text-[#2D241E] transition-colors p-1 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Nút Primary CTA: Đăng nhập */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[44px] mt-2 bg-[#D9531E] hover:bg-[#B94600] active:scale-[0.99] text-white font-bold text-[15px] rounded-[10px] shadow-warm-xs transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Đang xử lý...</span>
              </>
            ) : (
              <span>Đăng nhập</span>
            )}
          </button>
        </form>

        {/* Divider: "hoặc đăng nhập với" */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-[#EBE3D8]" />
          <span className="relative bg-white px-3 text-[12px] text-[#9E928A] font-medium">
            hoặc đăng nhập với
          </span>
        </div>

        {/* Nút Social Login: Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full h-[42px] bg-white border border-[#EBE3D8] hover:bg-[#FAF8F5] hover:border-[#D9531E]/40 text-[#2D241E] font-semibold text-[13px] rounded-[10px] transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.99] cursor-pointer disabled:opacity-70"
        >
          {/* Google SVG đa sắc chính thức */}
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Đăng nhập bằng tài khoản Google</span>
        </button>

        {/* Footer Text */}
        <p className="text-center text-[13px] text-[#786D65] mt-6">
          Chưa có tài khoản?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-bold text-[#D9531E] hover:underline cursor-pointer"
          >
            Đăng ký tài khoản mới
          </button>
        </p>
      </div>
    </div>
  );
};
