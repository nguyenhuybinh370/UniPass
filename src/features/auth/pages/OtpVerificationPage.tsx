import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sprout,
  Loader2,
  AlertCircle,
  RefreshCw,
  BookOpen,
} from 'lucide-react';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/feedback/Toast';
import { OtpVerificationProps } from '../types';

export const OtpVerificationPage: React.FC<OtpVerificationProps> = ({
  email = 'sinhvien@uit.edu.vn',
  fullName = 'Sinh viên UniPass',
  isResetPassword = false,
  backButtonLabel,
  onVerifySuccess,
  onResendOtp,
  onBackToRegister,
}) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(59);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus ô OTP khi tải trang
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Bộ đếm thời gian lùi (Countdown Timer)
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Xử lý nhập OTP chỉ nhận 6 chữ số
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, ''); // chỉ lấy chữ số
    if (rawVal.length <= 6) {
      setOtp(rawVal);
      if (errorMessage) setErrorMessage(null);
    }
  };

  // Xử lý gửi lại OTP
  const handleResend = async () => {
    if (countdown > 0 || isResending) return;

    setIsResending(true);
    setErrorMessage(null);

    try {
      if (onResendOtp) {
        await onResendOtp();
      } else {
        // Giả lập độ trễ gửi lại mã
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      setCountdown(59);
      setOtp('');
      showToast({
        type: 'info',
        message: 'Đã gửi mã OTP mới về email của bạn (Mã thử nghiệm: 123456)',
      });
      inputRef.current?.focus();
    } catch {
      setErrorMessage('Không thể gửi lại mã OTP. Vui lòng thử lại sau.');
    } finally {
      setIsResending(false);
    }
  };

  // Xử lý submit xác thực OTP
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (otp.length < 6) {
      setErrorMessage('Vui lòng nhập đầy đủ 6 chữ số của mã OTP.');
      return;
    }

    setIsLoading(true);

    // Giả lập xác thực mạng (600ms)
    setTimeout(() => {
      setIsLoading(false);

      if (onVerifySuccess) {
        onVerifySuccess(otp);
      } else {
        // Tự động đăng nhập người dùng vào AuthContext
        const verifiedUser = {
          id: `user-${Date.now()}`,
          name: fullName,
          email: email.toLowerCase(),
          school: email.includes('.edu.vn') ? 'ĐHQG-HCM' : 'Sinh viên',
          reputationRating: 5.0,
          avatarInitial: fullName.charAt(0).toUpperCase() || 'S',
          role: 'STUDENT' as const,
        };

        login(verifiedUser);

        showToast({
          type: 'success',
          message: `Xác thực tài khoản thành công! Chào mừng ${verifiedUser.name} đến với UniPass.`,
        });

        navigate(ROUTES.HOME);
      }
    }, 600);
  };

  const handleBack = () => {
    if (onBackToRegister) {
      onBackToRegister();
    } else {
      navigate(ROUTES.AUTH.REGISTER);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'radial-gradient(80% 60% at 50% -10%, rgba(198, 79, 0, 0.08) 0%, transparent 100%)',
      }}
      className="min-h-screen w-full bg-[#FAF6F0] flex flex-col justify-center items-center relative overflow-hidden py-10 px-4 font-['Plus_Jakarta_Sans']"
    >
      {/* Quả cầu mờ trang trí góc trên bên trái */}
      <div
        aria-hidden="true"
        className="w-80 h-80 bg-[#FFDBCD]/30 blur-3xl rounded-full absolute -top-24 -left-20 pointer-events-none"
      />

      {/* ========================================================= */}
      {/* A. KHU VỰC LOGO THƯƠNG HIỆU TRÊN CÙNG (TOP BRANDING AREA)  */}
      {/* ========================================================= */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-[40px] h-[40px] bg-[#9E3D00] rounded-[12px] shadow-[0px_1px_2px_rgba(144,72,0,0.2)] flex items-center justify-center shrink-0 text-white">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div className="flex items-center font-['Be_Vietnam_Pro'] text-2xl tracking-tight">
          <span className="font-semibold text-[#221A14]">Uni</span>
          <span className="font-bold text-[#9E3D00]">Pass</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* B. KHUNG THẺ XÁC THỰC TRUNG TÂM (VERIFICATION CARD)       */}
      {/* ========================================================= */}
      <div className="w-full max-w-[480px] bg-white rounded-2xl p-7 sm:p-9 shadow-[0px_20px_25px_-5px_rgba(34,26,20,0.06),0px_8px_10px_-6px_rgba(34,26,20,0.06)] relative border border-[#FAF6F0] z-10">
        {/* Huy hiệu góc phải (Decorative Campus Stamp) */}
        <div className="absolute top-7 right-7 sm:top-9 sm:right-9">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF1E9] border border-[#E6DACD]/40">
            <ShieldCheck className="w-3.5 h-3.5 text-[#006D3B]" />
            <span className="text-[11px] font-medium text-[#756A63]">Xác thực SV</span>
          </div>
        </div>

        {/* Card Header */}
        <div className="pr-24">
          <h1 className="text-2xl font-semibold text-[#221A14] font-['Be_Vietnam_Pro'] tracking-tight">
            Nhập OTP
          </h1>
        </div>

        <p className="text-[13px] text-[#756A63] leading-relaxed mt-2 font-['Plus_Jakarta_Sans']">
          Mã OTP đã được gửi về email sinh viên của bạn. Vui lòng kiểm tra hộp thư (cả mục Spam) và nhập mã để xác thực tài khoản.
        </p>

        {/* Pill hiển thị email nhận mã */}
        <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FAF6F0] border border-[#E6DACD]/60 text-xs font-semibold text-[#221A14]">
          <Mail className="w-3.5 h-3.5 text-[#9E3D00]" />
          <span>{email}</span>
        </div>

        {/* Thông báo lỗi nếu có */}
        {errorMessage && (
          <div className="mt-4 p-2.5 rounded-[10px] bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form nhập OTP */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            {/* Hàng Label: Bên trái tên trường, Bên phải đếm ngược */}
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="otp-input"
                className="text-[13px] font-semibold text-[#221A14] font-['Plus_Jakarta_Sans']"
              >
                Mã OTP *
              </label>

              {countdown > 0 ? (
                <span className="text-[12px] text-[#756A63] font-medium font-['Plus_Jakarta_Sans']">
                  Gửi lại sau <span className="font-semibold text-[#9E3D00]">({countdown}s)</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-[12px] font-bold text-[#D35400] hover:text-[#9E3D00] hover:underline cursor-pointer flex items-center gap-1"
                >
                  {isResending && <RefreshCw className="w-3 h-3 animate-spin" />}
                  <span>Gửi lại ngay</span>
                </button>
              )}
            </div>

            {/* Ô nhập liệu mã OTP */}
            <div className="relative">
              {/* Icon bức thư phía trước */}
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#756A63] pointer-events-none">
                <Mail className="w-4 h-4" />
              </div>

              <input
                ref={inputRef}
                id="otp-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={otp}
                onChange={handleOtpChange}
                placeholder="Nhập mã gồm 6 số"
                disabled={isLoading}
                className={`w-full h-[46px] pl-10 pr-24 rounded-[8px] border text-[16px] font-semibold text-[#221A14] bg-white transition-all outline-none font-['Plus_Jakarta_Sans'] shadow-sm ${
                  otp
                    ? 'tracking-[0.25em]'
                    : 'tracking-normal placeholder:tracking-normal placeholder:font-normal placeholder:text-[#9E928A]'
                } ${
                  errorMessage
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-[#E6DACD] focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400]/20'
                }`}
              />

              {/* Nút gửi lại mã tích hợp bên phải ô input */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={countdown > 0 || isResending}
                  className={`text-[11px] font-bold p-1.5 rounded-md transition-colors ${
                    countdown === 0 && !isResending
                      ? 'text-[#D35400] hover:text-[#9E3D00] hover:bg-[#FFF1E9] cursor-pointer'
                      : 'text-[#9E928A] cursor-not-allowed opacity-60'
                  }`}
                >
                  {isResending ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D35400]" />
                  ) : (
                    <span>Gửi lại mã</span>
                  )}
                </button>
              </div>
            </div>

            {/* Gợi ý nhập nhanh mã thử nghiệm */}
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#756A63]">
              <span>Nhập 6 chữ số được gửi trong email</span>
              <button
                type="button"
                onClick={() => setOtp('123456')}
                className="text-[#D35400] font-semibold hover:underline cursor-pointer"
              >
                Điền mã mẫu (123456)
              </button>
            </div>
          </div>

          {/* Nút xác nhận chính */}
          <button
            type="submit"
            disabled={otp.length !== 6 || isLoading}
            className="w-full h-12 bg-[#D35400] hover:bg-[#B94600] active:scale-[0.99] text-white font-semibold text-[15px] rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 transition-all mt-4 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Đang kiểm tra mã...</span>
              </>
            ) : (
              <>
                <span>Xác nhận mã OTP</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Liên kết quay lại */}
          <button
            type="button"
            onClick={handleBack}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-[#756A63] hover:text-[#221A14] mt-2 py-1 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>
              {backButtonLabel ||
                (isResetPassword ? 'Quay lại đặt lại mật khẩu' : 'Quay lại đăng ký tài khoản')}
            </span>
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

export default OtpVerificationPage;
