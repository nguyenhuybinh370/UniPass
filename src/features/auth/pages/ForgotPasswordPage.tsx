import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  Clock,
  ShieldAlert,
  ShieldCheck,
  Headphones,
  Loader2,
  AlertCircle,
} from 'lucide-react';

import { ROUTES } from '@/constants/routes';
import { useToast } from '@/components/feedback/Toast';
import { isValidEmail } from '@/utils/validators';
import { ForgotPasswordPageProps } from '../types';

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
  onBackToLogin,
  onSubmitSuccess,
}) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [identity, setIdentity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Nhận diện kiểu nhập (Email hay Số điện thoại) để đổi icon tương ứng
  const isPhoneNumber = useMemo(() => {
    const trimmed = identity.trim();
    return /^[0-9+ ]+$/.test(trimmed) && trimmed.length > 2;
  }, [identity]);

  const isValidInput = useMemo(() => {
    const trimmed = identity.trim();
    if (!trimmed) return false;
    if (isPhoneNumber) {
      // Số điện thoại Việt Nam tối thiểu 10 chữ số
      return /^(0|\+84)[0-9]{9,10}$/.test(trimmed.replace(/\s/g, ''));
    }
    return isValidEmail(trimmed);
  }, [identity, isPhoneNumber]);

  const handleReturnToLogin = () => {
    if (onBackToLogin) {
      onBackToLogin();
    } else {
      navigate(ROUTES.AUTH.LOGIN);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedIdentity = identity.trim();

    if (!trimmedIdentity) {
      setErrorMessage('Vui lòng nhập email trường hoặc số điện thoại của bạn.');
      return;
    }

    if (!isValidInput) {
      if (isPhoneNumber) {
        setErrorMessage('Số điện thoại không đúng định dạng (Ví dụ: 0901234567).');
      } else {
        setErrorMessage('Địa chỉ email không đúng định dạng.');
      }
      return;
    }

    setIsLoading(true);

    // Giả lập gửi mã xác thực OTP (500ms)
    setTimeout(() => {
      setIsLoading(false);

      showToast({
        type: 'info',
        message: `Mã OTP khôi phục mật khẩu đã được gửi đến ${trimmedIdentity}!`,
      });

      if (onSubmitSuccess) {
        onSubmitSuccess(trimmedIdentity);
      } else {
        // Chuyển hướng sang trang đặt lại mật khẩu kèm email
        navigate(ROUTES.AUTH.RESET_PASSWORD, {
          state: {
            email: trimmedIdentity,
          },
        });
      }
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF6F0] flex items-center justify-center p-0 md:p-6 lg:p-8 font-['Plus_Jakarta_Sans']">
      {/* Container chính chuẩn Figma */}
      <div className="w-full max-w-[1280px] min-h-[900px] lg:min-h-[960px] bg-white rounded-none md:rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row my-auto border border-[#E6DACD]/50">
        {/* ========================================================= */}
        {/* CỘT TRÁI: BRAND & STUDENT COMMUNITY BENEFITS              */}
        {/* ========================================================= */}
        <div className="lg:w-[448px] shrink-0 bg-[#9E3D00] p-8 sm:p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Hoa văn Campus Graphic SVG mờ đặt tuyệt đối với opacity 0.1 */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-10 pointer-events-none select-none"
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 448 960"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="380" cy="220" r="180" stroke="white" strokeWidth="2" strokeDasharray="8 8" />
              <circle cx="80" cy="680" r="220" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
              <line x1="40" y1="120" x2="400" y2="480" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="400" y1="350" x2="60" y2="850" stroke="white" strokeWidth="1.5" strokeDasharray="6 6" />
              <rect x="60" y="320" width="120" height="120" rx="24" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
            </svg>
          </div>

          {/* Khối nhận diện thương hiệu & Thông điệp (Top Section) */}
          <div className="relative z-10">
            {/* Logo Platform */}
            <div className="flex items-center gap-3">
              <div className="w-[36px] h-[36px] bg-white/20 backdrop-blur-sm rounded-[12px] border border-white/25 flex items-center justify-center shrink-0">
                {/* SVG Icon màu trắng */}
                <svg
                  className="w-5 h-5 text-white"
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

              <span className="font-['Be_Vietnam_Pro'] text-2xl font-semibold text-white tracking-tight leading-tight">
                SinhVienPass
              </span>
            </div>

            {/* Khối Headline */}
            <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-white/80 tracking-wider uppercase block mt-8">
              CỘNG ĐỒNG SINH VIÊN PASS ĐỒ
            </span>

            <h1 className="font-['Be_Vietnam_Pro'] text-[30px] lg:text-[32px] font-bold leading-tight tracking-tight mt-2 text-white">
              Trao đổi văn minh, sẻ chia ký túc xá
            </h1>

            <p className="font-['Plus_Jakarta_Sans'] text-[15px] leading-relaxed text-white/90 mt-3 max-w-sm">
              Khôi phục tài khoản để tiếp tục nhận đồ 0đ, pass giáo trình kỳ mới và kết nối cùng hơn 45.000 bạn sinh viên nội ngoại trú.
            </p>
          </div>

          {/* Bottom Section */}
          <div className="relative z-10 border-t border-white/20 pt-6 mt-10 lg:mt-auto">
            <span className="text-[11px] font-bold tracking-wider text-white/70 uppercase block mb-2 font-['Plus_Jakarta_Sans']">
              HỖ TRỢ SINH VIÊN
            </span>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/15 text-white shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-[#FFDBCD]" />
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
        {/* CỘT PHẢI: KHUNG CARD KHÔI PHỤC TÀI KHOẢN                  */}
        {/* ========================================================= */}
        <div className="flex-1 bg-[#FAF6F0] p-6 sm:p-10 lg:p-12 flex justify-center items-center overflow-y-auto">
          {/* Card trắng đặt chính giữa */}
          <div className="w-full max-w-[460px] bg-white rounded-2xl p-7 sm:p-8 shadow-[0px_8px_24px_rgba(45,36,30,0.06)] border border-[#E6DACD]/60 flex flex-col gap-5">
            {/* 1. Card Icon Graphic: Hộp icon 48x48px nền vàng kem #FDF3E1 bo góc 12px */}
            <div className="w-[48px] h-[48px] rounded-[12px] bg-[#FDF3E1] border border-[#F5D7B2]/50 flex items-center justify-center shrink-0">
              <KeyRound className="w-6 h-6 text-[#9E3D00]" />
            </div>

            {/* 2. Tiêu đề Form (Form Titles) */}
            <div>
              <h2 className="font-['Be_Vietnam_Pro'] text-2xl font-semibold text-[#221A14] tracking-tight">
                Quên mật khẩu?
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#756A63] leading-relaxed mt-1.5">
                Nhập email sinh viên (@*.edu.vn) hoặc số điện thoại đã đăng ký, hệ thống sẽ gửi mã xác thực OTP an toàn để đặt lại mật khẩu.
              </p>
            </div>

            {/* Thông báo lỗi nếu có */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 3. Trường nhập liệu (Recovery Form Field) */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="recovery-identity"
                  className="text-sm font-semibold text-[#221A14] mb-1.5 block font-['Plus_Jakarta_Sans']"
                >
                  Email sinh viên hoặc số điện thoại *
                </label>

                <div className="relative">
                  {/* Icon bên trái: Mail hoặc Phone */}
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#756A63] pointer-events-none">
                    {isPhoneNumber ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  </div>

                  <input
                    id="recovery-identity"
                    type="text"
                    value={identity}
                    onChange={(e) => {
                      setIdentity(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="vd: nguyen.van.a@uit.edu.vn hoặc 0901234567"
                    disabled={isLoading}
                    className="w-full h-[46px] pl-11 pr-4 rounded-[8px] border border-[#E6DACD] text-[15px] text-[#221A14] placeholder:text-[#9E928A] bg-white focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400]/20 shadow-sm transition-all outline-none font-['Plus_Jakarta_Sans'] disabled:bg-gray-50"
                  />
                </div>

                {/* Dòng nhắc nhở phụ (Micro-helper) */}
                <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-medium text-[#756A63]">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>Mã OTP sẽ được gửi ngay lập tức và có hiệu lực trong vòng 5 phút</span>
                </div>
              </div>

              {/* 4. Nút gửi mã OTP (Primary Submit Button) */}
              <button
                type="submit"
                disabled={!identity.trim() || isLoading}
                className="w-full h-[46px] bg-[#D35400] hover:bg-[#B94600] active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Đang gửi mã xác thực...</span>
                  </>
                ) : (
                  <>
                    <span>Gửi mã xác thực</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* 5. Nút quay lại Đăng nhập */}
              <button
                type="button"
                onClick={handleReturnToLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-[#756A63] hover:text-[#221A14] py-1 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại đăng nhập</span>
              </button>
            </form>

            {/* 6. Banner Lưu ý An toàn (Campus Safety Micro-Alert) */}
            <div className="w-full p-3.5 bg-[#FDF3E1] rounded-lg flex items-start gap-2.5 border border-[#F5D7B2]/70 mt-1">
              <ShieldAlert className="w-4 h-4 text-[#9E3D00] shrink-0 mt-0.5" />
              <p className="font-['Plus_Jakarta_Sans'] text-[13px] font-semibold text-[#D35400] leading-snug">
                Lưu ý an toàn: SinhVienPass tuyệt đối không bao giờ yêu cầu bạn cung cấp mật khẩu cá nhân hay mã OTP qua Facebook, Zalo hoặc tin nhắn riêng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
