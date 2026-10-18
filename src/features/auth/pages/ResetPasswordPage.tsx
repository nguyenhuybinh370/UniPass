import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Check,
  Circle,
  Sprout,
  Loader2,
  AlertCircle,
} from 'lucide-react';

import { ROUTES } from '@/constants/routes';
import { useToast } from '@/components/feedback/Toast';
import { ResetPasswordPageProps } from '../types';

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({
  email,
  onResetSuccess,
  onBackToLogin,
  onResendOtp,
}) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [countdown, setCountdown] = useState(59);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Bộ đếm thời gian lùi (Countdown Timer 59s)
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Kiểm tra 3 tiêu chí an toàn của mật khẩu
  const hasMinLength = useMemo(() => password.length >= 8, [password]);
  const hasUpperAndNumber = useMemo(
    () => /[A-Z]/.test(password) && /[0-9]/.test(password),
    [password]
  );
  const hasSpecialChar = useMemo(
    () => /[!@#$%^&*(),.?":{}|<>]/.test(password),
    [password]
  );

  const isPasswordSecure = hasMinLength && hasUpperAndNumber && hasSpecialChar;
  const isConfirmMatch = confirmPassword.length > 0 && confirmPassword === password;
  const isFormValid = otp.length === 6 && isPasswordSecure && isConfirmMatch;

  // Xử lý gửi lại mã OTP
  const handleResend = async () => {
    if (countdown > 0 || isResending) return;

    setIsResending(true);
    setErrorMessage(null);

    try {
      if (onResendOtp) {
        await onResendOtp();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
      setCountdown(59);
      setOtp('');
      showToast({
        type: 'info',
        message: 'Mã xác thực OTP mới đã được gửi về email của bạn (Mã thử nghiệm: 123456)',
      });
    } catch {
      setErrorMessage('Không thể gửi lại mã OTP. Vui lòng thử lại sau.');
    } finally {
      setIsResending(false);
    }
  };

  // Điều hướng quay lại đăng nhập
  const handleReturnToLogin = () => {
    if (onBackToLogin) {
      onBackToLogin();
    } else {
      navigate(ROUTES.AUTH.LOGIN);
    }
  };

  // Xử lý Submit đặt lại mật khẩu
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (otp.length < 6) {
      setErrorMessage('Vui lòng nhập đầy đủ 6 chữ số của mã OTP.');
      return;
    }

    if (!isPasswordSecure) {
      setErrorMessage('Mật khẩu mới chưa đáp ứng đủ các tiêu chuẩn an toàn.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    setIsLoading(true);

    // Giả lập gọi API đặt lại mật khẩu (600ms)
    setTimeout(() => {
      setIsLoading(false);

      showToast({
        type: 'success',
        message: 'Đặt lại mật khẩu thành công! Vui lòng đăng nhập với mật khẩu mới.',
      });

      if (onResetSuccess) {
        onResetSuccess();
      } else {
        navigate(ROUTES.AUTH.LOGIN);
      }
    }, 600);
  };

  return (
    <div
      className="min-h-screen w-full bg-[#FAF6F0] flex flex-col justify-center items-center relative overflow-hidden py-12 px-4 font-['Plus_Jakarta_Sans']"
      style={{
        backgroundImage:
          'radial-gradient(80% 60% at 50% -10%, rgba(198, 79, 0, 0.08) 0%, rgba(198, 79, 0, 0) 100%)',
      }}
    >
      {/* Khối ambient mờ góc trên trái */}
      <div
        aria-hidden="true"
        className="w-80 h-80 bg-[#FFDBCD]/30 blur-3xl rounded-full absolute -top-24 -left-20 pointer-events-none"
      />

      {/* ========================================================= */}
      {/* A. KHU VỰC LOGO THƯƠNG HIỆU TRÊN CÙNG (TOP BRANDING AREA)  */}
      {/* ========================================================= */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        {/* Box Icon thương hiệu 40x40px, nền #9E3D00, bo góc 12px */}
        <div className="w-[40px] h-[40px] bg-[#9E3D00] rounded-[12px] shadow-[0px_1px_2px_rgba(144,72,0,0.2)] flex items-center justify-center shrink-0">
          <svg
            className="w-[22px] h-[18px] text-white"
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
              stroke="#FFDBCD"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12.5" r="1.5" fill="#FFDBCD" />
          </svg>
        </div>

        {/* Tên thương hiệu */}
        <div className="font-['Be_Vietnam_Pro'] text-2xl tracking-tight leading-none">
          <span className="font-semibold text-[#221A14]">SinhVien</span>
          <span className="font-bold text-[#9E3D00]">Pass</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* B. KHUNG THẺ ĐẶT LẠI MẬT KHẨU TRUNG TÂM (CENTERED CARD)     */}
      {/* ========================================================= */}
      <div className="w-full max-w-[480px] bg-white rounded-2xl p-7 sm:p-9 shadow-[0px_20px_25px_-5px_rgba(34,26,20,0.06),0px_8px_10px_-6px_rgba(34,26,20,0.06)] relative border border-[#FAF6F0] z-10">
        {/* 1. Huy hiệu góc phải: Campus Stamp Badge */}
        <div className="absolute right-6 top-6 rounded-full bg-[#FFF1E9] px-2.5 py-1 flex items-center gap-1.5 border border-[#F5D7B2]/40">
          <Sprout className="w-3.5 h-3.5 text-[#006D3B]" />
          <span className="text-[11px] font-medium text-[#756A63]">Xác thực SV</span>
        </div>

        {/* 2. Tiêu đề Form (Card Header) */}
        <div>
          <h1 className="font-['Be_Vietnam_Pro'] text-2xl font-semibold text-[#221A14]">
            Đặt lại mật khẩu
          </h1>
          <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#756A63] leading-relaxed mt-1.5 pr-14">
            {email ? (
              <>
                Mã OTP đã được gửi về email{' '}
                <span className="font-semibold text-[#221A14]">{email}</span>. Vui lòng nhập mã và thiết lập mật khẩu mới.
              </>
            ) : (
              'Mã OTP đã được gửi về email sinh viên của bạn. Vui lòng nhập mã và thiết lập mật khẩu mới.'
            )}
          </p>
        </div>

        {/* Thông báo lỗi nếu có */}
        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 3. Các trường nhập liệu (Form Fields) - Gap giữa các trường 18px */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-[18px] mt-6">
          {/* TRƯỜNG 1: MÃ OTP */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="reset-otp"
                className="text-[13px] font-semibold text-[#221A14]"
              >
                Mã OTP *
              </label>
              <span className="text-[11px] font-medium text-[#756A63]">
                {countdown > 0 ? `Gửi lại sau (${countdown}s)` : 'Mã đã hết hạn'}
              </span>
            </div>

            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#756A63] pointer-events-none">
                <Mail className="w-4 h-4" />
              </div>

              <input
                id="reset-otp"
                type="text"
                value={otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 6) {
                    setOtp(val);
                    if (errorMessage) setErrorMessage(null);
                  }
                }}
                maxLength={6}
                placeholder="Nhập mã gồm 6 số"
                disabled={isLoading}
                className="w-full h-[46px] pl-10 pr-24 rounded-[8px] border border-[#E6DACD] text-sm font-semibold tracking-widest text-[#221A14] placeholder:tracking-normal placeholder:font-normal placeholder:text-[#9E928A] bg-white focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400]/20 shadow-sm transition-all outline-none font-['Plus_Jakarta_Sans']"
              />

              {/* Nút Gửi lại mã tích hợp bên phải ô input */}
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0 || isResending || isLoading}
                className={`absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-[11px] font-bold rounded-[6px] transition-all cursor-pointer ${
                  countdown === 0 && !isResending
                    ? 'text-[#D35400] hover:bg-[#FFF1E9] active:scale-95'
                    : 'text-[#9E928A] cursor-not-allowed opacity-60'
                }`}
              >
                {isResending ? 'Đang gửi...' : 'Gửi lại mã'}
              </button>
            </div>
          </div>

          {/* TRƯỜNG 2: MẬT KHẨU MỚI */}
          <div>
            <label
              htmlFor="reset-password"
              className="text-[13px] font-semibold text-[#221A14] mb-1.5 block"
            >
              Mật khẩu mới *
            </label>

            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#756A63] pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>

              <input
                id="reset-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Nhập mật khẩu mới (tối thiểu 8 ký tự)"
                disabled={isLoading}
                className="w-full h-[46px] pl-10 pr-10 rounded-[8px] border border-[#E6DACD] text-[15px] text-[#221A14] placeholder:text-[#9E928A] bg-white focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400]/20 shadow-sm transition-all outline-none font-['Plus_Jakarta_Sans']"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#756A63] hover:text-[#221A14] transition-colors p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Hộp kiểm tra độ an toàn mật khẩu (Password Strength Dynamic Checklist) */}
            <div className="mt-2.5 p-3 bg-[#FAF6F0] rounded-[10px] border border-[#E6DACD]">
              <span className="text-xs font-bold text-[#D35400] tracking-wider uppercase block mb-2 font-['Plus_Jakarta_Sans']">
                ĐỘ AN TOÀN MẬT KHẨU:
              </span>

              <ul className="space-y-1.5">
                {/* Tiêu chí 1: Tối thiểu 8 ký tự */}
                <li
                  className={`flex items-center gap-2 text-[12px] transition-colors ${
                    hasMinLength ? 'text-[#006D3B] font-medium' : 'text-[#9E928A]'
                  }`}
                >
                  {hasMinLength ? (
                    <Check className="w-3.5 h-3.5 text-[#006D3B] shrink-0 stroke-[2.5]" />
                  ) : (
                    <Circle className="w-2.5 h-2.5 mx-0.5 text-[#9E928A] shrink-0 fill-current opacity-40" />
                  )}
                  <span>Tối thiểu 8 ký tự</span>
                </li>

                {/* Tiêu chí 2: Chứa chữ hoa và số */}
                <li
                  className={`flex items-center gap-2 text-[12px] transition-colors ${
                    hasUpperAndNumber ? 'text-[#006D3B] font-medium' : 'text-[#9E928A]'
                  }`}
                >
                  {hasUpperAndNumber ? (
                    <Check className="w-3.5 h-3.5 text-[#006D3B] shrink-0 stroke-[2.5]" />
                  ) : (
                    <Circle className="w-2.5 h-2.5 mx-0.5 text-[#9E928A] shrink-0 fill-current opacity-40" />
                  )}
                  <span>Chứa chữ hoa và số</span>
                </li>

                {/* Tiêu chí 3: Chứa ký tự đặc biệt */}
                <li
                  className={`flex items-center gap-2 text-[12px] transition-colors ${
                    hasSpecialChar ? 'text-[#006D3B] font-medium' : 'text-[#9E928A]'
                  }`}
                >
                  {hasSpecialChar ? (
                    <Check className="w-3.5 h-3.5 text-[#006D3B] shrink-0 stroke-[2.5]" />
                  ) : (
                    <Circle className="w-2.5 h-2.5 mx-0.5 text-[#9E928A] shrink-0 fill-current opacity-40" />
                  )}
                  <span>Chứa ký tự đặc biệt (@, #, $...)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* TRƯỜNG 3: NHẬP LẠI MẬT KHẨU MỚI */}
          <div>
            <label
              htmlFor="reset-confirm-password"
              className="text-[13px] font-semibold text-[#221A14] mb-1.5 block"
            >
              Nhập lại mật khẩu mới *
            </label>

            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#756A63] pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>

              <input
                id="reset-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Nhập lại mật khẩu mới"
                disabled={isLoading}
                className={`w-full h-[46px] pl-10 pr-10 rounded-[8px] border text-[15px] text-[#221A14] placeholder:text-[#9E928A] bg-white shadow-sm transition-all outline-none font-['Plus_Jakarta_Sans'] ${
                  confirmPassword && !isConfirmMatch
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-[#E6DACD] focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400]/20'
                }`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#756A63] hover:text-[#221A14] transition-colors p-1 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Thông báo nếu mật khẩu nhập lại không trùng khớp */}
            {confirmPassword && !isConfirmMatch && (
              <p className="text-xs text-red-500 font-medium mt-1 flex items-center gap-1 animate-in fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Mật khẩu nhập lại không trùng khớp.</span>
              </p>
            )}
          </div>

          {/* 4. NÚT HÀNH ĐỘNG & ĐIỀU HƯỚNG */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full h-12 bg-[#D35400] hover:bg-[#B94600] active:scale-[0.99] text-white font-semibold text-[15px] rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Đang cập nhật mật khẩu...</span>
              </>
            ) : (
              <>
                <span>Đặt lại mật khẩu</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Liên kết quay lại Đăng nhập */}
          <button
            type="button"
            onClick={handleReturnToLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-[#756A63] hover:text-[#221A14] py-1 transition-colors mt-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại đăng nhập</span>
          </button>
        </form>
      </div>

      {/* ========================================================= */}
      {/* C. THÔNG BÁO BẢO MẬT CỘNG ĐỒNG (PEER SUPPORT MICRO NOTICE) */}
      {/* ========================================================= */}
      <div className="mt-6 flex items-center justify-center gap-1.5 text-center relative z-10">
        <Sprout className="w-3.5 h-3.5 text-[#006D3B] shrink-0" />
        <span className="text-[11px] font-medium text-[#756A63]">
          Ưu tiên hỗ trợ sinh viên ĐHQG & xác thực an toàn trong khuôn viên trường
        </span>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
