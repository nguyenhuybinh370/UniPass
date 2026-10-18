import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Headphones,
  Loader2,
  AlertCircle,
  ShieldAlert,
} from 'lucide-react';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/feedback/Toast';
import { mockUsers, defaultMockUser } from '@/mocks/data/auth/mockUsers';
import { LoginPageProps } from '../types';

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigateRegister,
  onForgotPassword,
  onBackToHome,
  onLoginSuccess,
}) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleReturnHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      navigate(ROUTES.HOME);
    }
  };

  const handleGoToRegister = () => {
    if (onNavigateRegister) {
      onNavigateRegister();
    } else {
      navigate(ROUTES.AUTH.REGISTER);
    }
  };

  const handleForgotPass = () => {
    if (onForgotPassword) {
      onForgotPassword();
    } else {
      navigate(ROUTES.AUTH.FORGOT_PASSWORD);
    }
  };

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

    // Giả lập độ trễ xác thực mạng 500ms
    setTimeout(() => {
      setIsLoading(false);

      // Tìm kiếm tài khoản trong mock hoặc khởi tạo phiên đăng nhập
      const matchedUser =
        mockUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase()) || {
          ...defaultMockUser,
          email: email.trim().toLowerCase(),
          name: email.split('@')[0] || 'Sinh viên UniPass',
        };

      login(matchedUser);

      showToast({
        type: 'success',
        message: `Chào mừng ${matchedUser.name} đã quay trở lại SinhVienPass!`,
      });

      if (onLoginSuccess) {
        onLoginSuccess(matchedUser);
      }

      navigate(ROUTES.HOME);
    }, 500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login(defaultMockUser);
      showToast({
        type: 'success',
        message: 'Đăng nhập thành công bằng tài khoản Google!',
      });
      navigate(ROUTES.HOME);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF6F0] flex items-center justify-center p-0 md:p-6 lg:p-8 font-['Plus_Jakarta_Sans']">
      {/* Container chính chuẩn Figma */}
      <div className="w-full max-w-[1280px] min-h-[900px] lg:min-h-[960px] bg-white rounded-none md:rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row my-auto border border-[#E6DACD]/50">
        {/* ========================================================= */}
        {/* CỘT TRÁI: BRAND STORY & STUDENT VALUE PROPOSITION         */}
        {/* ========================================================= */}
        <div
          style={{
            background: 'linear-gradient(135deg, #C64F00 0%, #9E3D00 50%, #C64F00 100%)',
          }}
          className="lg:w-[512px] shrink-0 p-8 sm:p-10 lg:p-14 text-white flex flex-col justify-between relative overflow-hidden"
        >
          {/* Watermark hoa văn thực vật & cuốn sách (Sprout + Book Motif) */}
          <div
            aria-hidden="true"
            className="w-[320px] h-[320px] absolute -right-16 -bottom-16 opacity-10 pointer-events-none select-none text-white hidden sm:block"
          >
            <svg
              viewBox="0 0 320 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <circle cx="160" cy="160" r="140" stroke="currentColor" strokeWidth="3" strokeDasharray="8 8" />
              <path
                d="M100 140C100 115 125 105 160 105C195 105 220 115 220 140V220C220 220 190 210 160 225C130 210 100 220 100 220V140Z"
                stroke="currentColor"
                strokeWidth="4"
              />
              <line x1="160" y1="105" x2="160" y2="225" stroke="currentColor" strokeWidth="3" />
              <path
                d="M160 80C160 80 180 60 195 75C210 90 190 105 160 105C130 105 110 90 125 75C140 60 160 80 160 80Z"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </div>

          {/* Phần trên (Top Content) */}
          <div className="relative z-10">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-3.5">
              <div className="w-[44px] h-[44px] bg-white/15 backdrop-blur-md rounded-[12px] border border-white/20 shadow-sm flex items-center justify-center shrink-0">
                {/* SVG Icon SinhVienPass màu trắng */}
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 19.5V6.5C4 5.39543 4.89543 4.5 6 4.5H18C19.1046 4.5 20 5.39543 20 6.5V19.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 19.5C4 18.3954 4.89543 17.5 6 17.5H20"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 9.5L12 12.5L15 9.5"
                    stroke="#98F7B5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12.5" r="1.5" fill="#98F7B5" />
                </svg>
              </div>

              <div>
                <span className="font-['Be_Vietnam_Pro'] text-2xl font-bold text-white tracking-tight leading-tight block">
                  SinhVienPass
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-white/80 tracking-[1.1px] uppercase block mt-1">
                  UNIVERSITY MARKETPLACE
                </span>
              </div>
            </div>

            {/* Community Tag Pill (Huy hiệu cộng đồng) */}
            <div className="bg-white/15 backdrop-blur-sm px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 mt-6 border border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#98F7B5] animate-pulse shrink-0" />
              <span className="text-xs font-semibold text-white tracking-wide">
                Cộng đồng trao đổi sinh viên ĐHQG
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="font-['Be_Vietnam_Pro'] text-[30px] lg:text-[32px] font-bold leading-tight tracking-tight mt-6 text-white">
              Tiếp tục trao đổi, săn deal học tập
            </h1>

            {/* Mô tả (Sub-text) */}
            <p className="text-[15px] leading-relaxed text-white/90 mt-3 max-w-sm font-['Plus_Jakarta_Sans']">
              Đăng nhập để nhận thông báo mới về giáo trình 0đ, theo dõi trạng thái món đồ ký gửi và kết nối trực tiếp tại khuôn viên ký túc xá.
            </p>
          </div>

          {/* Phần dưới (Bottom Support Info) */}
          <div className="relative z-10 border-t border-white/20 pt-6 mt-10 lg:mt-auto">
            <span className="text-[11px] font-bold tracking-wider text-white/70 uppercase block mb-2 font-['Plus_Jakarta_Sans']">
              HỖ TRỢ SINH VIÊN
            </span>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/15 text-white shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-[#98F7B5]" />
              </div>
              <div className="text-xs text-white/90 leading-relaxed">
                <p className="font-semibold text-white">
                  Hỗ trợ xác thực thẻ SV & KTX ĐHQG | 08:00 - 21:00 hàng ngày
                </p>
                <div className="flex items-center gap-2 mt-1 text-white/80">
                  <Headphones className="w-3.5 h-3.5 text-[#FDF3E1]" />
                  <span>Kênh hỗ trợ sinh viên ĐHQG-HCM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CỘT PHẢI: FORM ĐĂNG NHẬP                                  */}
        {/* ========================================================= */}
        <div className="flex-1 bg-white p-8 lg:p-14 flex justify-center items-center overflow-y-auto">
          <div className="w-full max-w-[460px] flex flex-col gap-6 py-2">
            {/* 1. Nút quay lại (Top Back Navigation) */}
            <button
              type="button"
              onClick={handleReturnHome}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#756A63] hover:text-[#221A14] transition-colors w-fit cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Về trang chủ</span>
            </button>

            {/* 2. Tiêu đề Form (Header Titles) */}
            <div>
              <h2 className="font-['Be_Vietnam_Pro'] text-[30px] lg:text-[32px] font-bold text-[#221A14] tracking-tight">
                Đăng nhập
              </h2>
              <p className="text-[15px] text-[#756A63] leading-relaxed mt-1 font-['Plus_Jakarta_Sans']">
                Chào mừng bạn trở lại! Vui lòng nhập thông tin để truy cập tài khoản SinhVienPass.
              </p>
            </div>

            {/* Thông báo lỗi nếu có */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form trường nhập liệu */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* 3.1. Email hoặc Email trường (.edu.vn) * */}
              <div>
                <label
                  htmlFor="login-page-email"
                  className="text-sm font-semibold text-[#221A14] mb-1.5 block font-['Plus_Jakarta_Sans']"
                >
                  Email hoặc Email trường (.edu.vn) *
                </label>
                <div className="relative">
                  <input
                    id="login-page-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nguyenhuybinh370@gmail.com"
                    disabled={isLoading}
                    className="w-full h-[46px] pl-3.5 pr-10 rounded-xl border border-[#E6DACD] text-[15px] text-[#221A14] placeholder:text-[#9E928A] bg-white focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400]/20 shadow-sm transition-all outline-none font-['Plus_Jakarta_Sans'] disabled:bg-gray-50"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#756A63] pointer-events-none">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* 3.2. Mật khẩu * */}
              <div>
                <label
                  htmlFor="login-page-password"
                  className="text-sm font-semibold text-[#221A14] mb-1.5 block font-['Plus_Jakarta_Sans']"
                >
                  Mật khẩu *
                </label>
                <div className="relative">
                  <input
                    id="login-page-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    disabled={isLoading}
                    className="w-full h-[46px] pl-3.5 pr-10 rounded-xl border border-[#E6DACD] text-[15px] text-[#221A14] placeholder:text-[#9E928A] bg-white focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400]/20 shadow-sm transition-all outline-none font-['Plus_Jakarta_Sans'] disabled:bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#756A63] hover:text-[#221A14] transition-colors p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 3.3. Hàng Ghi nhớ & Quên mật khẩu */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#E6DACD] text-[#D35400] focus:ring-[#D35400] focus:ring-offset-0 cursor-pointer accent-[#D35400]"
                  />
                  <span className="text-[13px] text-[#756A63] font-['Plus_Jakarta_Sans']">
                    Ghi nhớ đăng nhập
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleForgotPass}
                  className="text-xs font-semibold text-[#D35400] hover:underline cursor-pointer"
                >
                  Quên mật khẩu?
                </button>
              </div>

              {/* 4. Nút Submit Chính (Primary Submit Button) */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#D35400] hover:bg-[#B94600] active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 transition-all mt-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Đang đăng nhập...</span>
                  </>
                ) : (
                  <>
                    <span>Đăng nhập</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* 5. Divider (Đường phân cách) */}
            <div className="relative my-1 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-[#F3E9DD]" />
              </div>
              <span className="relative z-10 bg-white px-3 text-[11px] font-medium text-[#756A63] whitespace-nowrap font-['Plus_Jakarta_Sans']">
                hoặc đăng nhập với
              </span>
            </div>

            {/* 6. Nút Google SSO */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-11 bg-white border border-[#E6DACD] hover:bg-[#FAF6F0] rounded-xl shadow-sm flex items-center justify-center gap-3 transition-colors cursor-pointer disabled:opacity-60"
            >
              {/* Logo Google 4 màu chính hãng */}
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
              <span className="text-sm font-semibold text-[#221A14] font-['Plus_Jakarta_Sans']">
                Đăng nhập bằng tài khoản Google
              </span>
            </button>

            {/* 7. Banner Nhắc nhở An toàn Sinh viên */}
            <div className="w-full p-3.5 bg-[#FDF3E1] rounded-xl flex items-start gap-3 border border-[#F5D7B2]/60 mt-1">
              <ShieldAlert className="w-4 h-4 text-[#9E3D00] shrink-0 mt-0.5" />
              <p className="text-[13px] font-semibold text-[#221A14] leading-snug font-['Plus_Jakarta_Sans']">
                Ưu tiên hẹn gặp tại sảnh KTX hoặc căn tin trường để kiểm tra đồ trực tiếp trước khi giao dịch.
              </p>
            </div>

            {/* 8. Footer Chuyển hướng Đăng ký */}
            <div className="text-center pt-2">
              <p className="text-[13px] text-[#756A63] font-['Plus_Jakarta_Sans']">
                Chưa có tài khoản?{' '}
                <button
                  type="button"
                  onClick={handleGoToRegister}
                  className="text-sm font-bold text-[#D35400] hover:underline cursor-pointer"
                >
                  Đăng ký ngay
                </button>
              </p>
              <span className="text-[11px] font-medium text-[#9E928A] text-center block mt-2 font-['Plus_Jakarta_Sans']">
                Bảo mật thông tin sinh viên theo tiêu chuẩn an toàn khuôn viên ĐHQG.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
