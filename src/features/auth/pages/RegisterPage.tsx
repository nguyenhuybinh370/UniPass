import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  CheckCircle2,
  Headphones,
  ShieldCheck,
  Loader2,
  AlertCircle,
  GraduationCap,
} from 'lucide-react';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/feedback/Toast';
import { checkPasswordCriteria, isEduEmail, isValidEmail } from '@/utils/validators';
import { RegisterPageProps } from '../types';

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onNavigateLogin,
  onBackToHome,
  onRegisterSuccess,
}) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  // 1. Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  // 2. UI interaction state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // 3. Derived validations & live checks
  const isNameValid = useMemo(() => fullName.trim().length >= 2, [fullName]);
  const isEdu = useMemo(() => isEduEmail(email), [email]);
  const isEmailValidFormat = useMemo(() => isValidEmail(email), [email]);

  const passwordCriteria = useMemo(() => checkPasswordCriteria(password), [password]);

  const isPasswordMatch = useMemo(() => {
    if (!confirmPassword) return false;
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const isConfirmPasswordInvalid = useMemo(() => {
    return Boolean(confirmPassword && password !== confirmPassword);
  }, [password, confirmPassword]);

  // Form can submit when required fields are valid and terms are agreed
  const canSubmit = useMemo(() => {
    return (
      isNameValid &&
      isEmailValidFormat &&
      passwordCriteria.isValid &&
      isPasswordMatch &&
      agreedTerms &&
      !isLoading
    );
  }, [
    isNameValid,
    isEmailValidFormat,
    passwordCriteria.isValid,
    isPasswordMatch,
    agreedTerms,
    isLoading,
  ]);

  // Handlers
  const handleReturnHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      navigate(ROUTES.HOME);
    }
  };

  const handleGoToLogin = () => {
    if (onNavigateLogin) {
      onNavigateLogin();
    } else {
      navigate(ROUTES.AUTH.LOGIN);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!isNameValid) {
      setFormError('Vui lòng nhập họ và tên hợp lệ (tối thiểu 2 ký tự).');
      return;
    }

    if (!isEmailValidFormat) {
      setFormError('Địa chỉ email không đúng định dạng.');
      return;
    }

    if (!passwordCriteria.isValid) {
      setFormError('Mật khẩu chưa đáp ứng đủ 3 tiêu chuẩn bảo mật.');
      return;
    }

    if (!isPasswordMatch) {
      setFormError('Mật khẩu nhập lại không trùng khớp.');
      return;
    }

    if (!agreedTerms) {
      setFormError('Vui lòng đồng ý với Quy chế hoạt động & Điều khoản bảo mật.');
      return;
    }

    setIsLoading(true);

    // Giả lập kết nối mạng gửi mã OTP xác thực (500ms)
    setTimeout(() => {
      setIsLoading(false);

      showToast({
        type: 'info',
        message: `Mã OTP đã được gửi đến email ${email.trim()}! Vui lòng kiểm tra hộp thư.`,
      });

      if (onRegisterSuccess) {
        onRegisterSuccess({
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          isEdu,
        });
      }

      // Chuyển hướng sang trang xác thực OTP
      navigate(ROUTES.AUTH.VERIFY_OTP, {
        state: {
          email: email.trim().toLowerCase(),
          fullName: fullName.trim(),
        },
      });
    }, 500);
  };

  const handleGoogleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const googleUser = {
        id: `user-google-${Date.now()}`,
        name: fullName.trim() || 'Sinh viên Google',
        email: email.trim().toLowerCase() || 'sinhvien@student.edu.vn',
        school: 'ĐHQG-HCM',
        reputationRating: 5.0,
        avatarInitial: 'G',
        role: 'STUDENT' as const,
      };

      login(googleUser);

      showToast({
        type: 'success',
        message: 'Đăng ký thành công bằng tài khoản Google!',
      });

      navigate(ROUTES.HOME);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-0 md:p-6 lg:p-8 font-['Plus_Jakarta_Sans']">
      {/* Container chính kích thước chuẩn */}
      <div className="w-full max-w-[1240px] bg-white rounded-none md:rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row my-auto border border-[#E6DACD]/50">
        {/* ========================================================= */}
        {/* CỘT TRÁI: BRAND HERO PANEL                                */}
        {/* ========================================================= */}
        <div
          style={{
            background: 'linear-gradient(135deg, #D35400 0%, #C04900 50%, #9C3B00 100%)',
          }}
          className="lg:w-[460px] xl:w-[486px] shrink-0 p-8 sm:p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden"
        >
          {/* Ambient Lighting Circles */}
          <div
            aria-hidden="true"
            className="absolute w-96 h-96 -top-24 -right-24 bg-white/10 blur-3xl rounded-full pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute w-80 h-80 -bottom-20 -left-20 bg-black/15 blur-2xl rounded-full pointer-events-none"
          />

          {/* Watermark hoa văn kết nối/sách mờ 10-15% */}
          <div
            aria-hidden="true"
            className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none select-none text-white hidden sm:block"
          >
            <svg
              width="260"
              height="260"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
              <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="2" />
              <path
                d="M65 85C65 76.7157 71.7157 70 80 70H120C128.284 70 135 76.7157 135 85V130C135 130 115 125 100 135C85 125 65 130 65 130V85Z"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <line x1="100" y1="70" x2="100" y2="135" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          {/* Top Section */}
          <div className="relative z-10">
            {/* Logo Platform */}
            <div className="flex items-center gap-3.5">
              <div className="w-[44px] h-[44px] bg-white rounded-[16px] shadow-md flex items-center justify-center shrink-0">
                {/* SVG Icon SinhVienPass tông màu cam #D35400 & xanh lá #1E824C */}
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 19.5V6.5C4 5.39543 4.89543 4.5 6 4.5H18C19.1046 4.5 20 5.39543 20 6.5V19.5"
                    stroke="#D35400"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 19.5C4 18.3954 4.89543 17.5 6 17.5H20"
                    stroke="#D35400"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 9.5L12 12.5L15 9.5"
                    stroke="#1E824C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12.5" r="1.5" fill="#1E824C" />
                </svg>
              </div>

              <div>
                <span className="font-['Be_Vietnam_Pro'] text-[24px] font-bold text-white tracking-tight leading-tight block">
                  SinhVienPass
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-wider text-white/70 block mt-0.5">
                  NỀN TẢNG TRAO ĐỔI SINH VIÊN
                </span>
              </div>
            </div>

            {/* H1 Headline */}
            <h1 className="text-[32px] lg:text-[36px] font-extrabold leading-tight tracking-tight mt-7 lg:mt-9 font-['Be_Vietnam_Pro'] text-white">
              Chia sẻ giáo trình, tiết kiệm tối đa
            </h1>

            {/* Description */}
            <p className="text-sm leading-relaxed text-white/90 mt-3.5 max-w-sm font-['Plus_Jakarta_Sans']">
              Đăng ký tài khoản để kết nối cùng hàng ngàn sinh viên trao đổi sách vở, thiết bị học tập và nhận hỗ trợ 0đ mỗi mùa thi.
            </p>

            {/* Feature Highlights Badges */}
            <div className="mt-6 flex flex-col gap-2.5">
              <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-xs font-medium text-white/95">
                <Check className="w-4 h-4 text-[#FDF3E1] shrink-0" />
                <span>100% tài khoản xác thực email sinh viên</span>
              </div>
              <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-xs font-medium text-white/95">
                <Check className="w-4 h-4 text-[#FDF3E1] shrink-0" />
                <span>Nhận sách và đồ dùng học tập tặng 0đ mùa thi</span>
              </div>
              <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-xs font-medium text-white/95">
                <Check className="w-4 h-4 text-[#FDF3E1] shrink-0" />
                <span>Trao đổi trực tiếp an toàn tại khuôn viên trường & KTX</span>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="relative z-10 border-t border-white/20 pt-5 mt-8 lg:mt-auto">
            <span className="text-[11px] font-semibold tracking-wider text-[#FDF3E1]/70 uppercase block mb-2 font-['Plus_Jakarta_Sans']">
              HỖ TRỢ SINH VIÊN
            </span>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/15 text-white shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs text-white/90 leading-relaxed">
                <p className="font-semibold text-white">Hỗ trợ xác thực thẻ SV & KTX ĐHQG</p>
                <div className="flex items-center gap-2 mt-1 text-white/80">
                  <Headphones className="w-3.5 h-3.5 text-[#FDF3E1]" />
                  <span>Hotline: 1900 6868 (8h00 - 21h00)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CỘT PHẢI: FORM ĐĂNG KÝ                                    */}
        {/* ========================================================= */}
        <div className="flex-1 bg-white p-6 sm:p-8 lg:p-12 flex justify-center items-center overflow-y-auto">
          <div className="w-full max-w-[460px] flex flex-col gap-4 py-2">
            {/* 1. Nút quay lại (Top Return) */}
            <button
              type="button"
              onClick={handleReturnHome}
              className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#756A63] hover:text-[#2D241E] transition-colors w-fit cursor-pointer group"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Về trang chủ</span>
            </button>

            {/* 2. Tiêu đề Form (Form Header) */}
            <div>
              <h2 className="text-[26px] lg:text-[28px] font-bold text-[#2D241E] font-['Be_Vietnam_Pro'] tracking-tight">
                Đăng ký tài khoản
              </h2>
              <p className="text-xs sm:text-sm text-[#756A63] mt-1 font-['Plus_Jakarta_Sans'] leading-normal">
                Tạo tài khoản SinhVienPass để bắt đầu đăng tin, đổi đồ và nhận tặng 0đ cùng cộng đồng sinh viên.
              </p>
            </div>

            {/* Banner báo lỗi tổng thể nếu có */}
            {formError && (
              <div className="p-2.5 rounded-[12px] bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Form trường nhập liệu */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              {/* 3.1. Họ và tên * */}
              <div>
                <label
                  htmlFor="register-fullname"
                  className="block text-[12px] font-bold text-[#2D241E] mb-1 font-['Plus_Jakarta_Sans']"
                >
                  Họ và tên *
                </label>
                <div className="relative">
                  <input
                    id="register-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Huy Bình"
                    disabled={isLoading}
                    className="w-full h-[46px] rounded-[12px] border border-[#E6DACD] text-[14px] text-[#2D241E] placeholder:text-[#9E928A] px-3.5 pr-10 focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400]/20 shadow-sm transition-all outline-none font-['Plus_Jakarta_Sans'] bg-white disabled:bg-gray-50"
                  />
                  {isNameValid && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1E824C] pointer-events-none">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>

              {/* 3.2. Email hoặc Email trường (.edu.vn) * */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="register-email"
                    className="block text-[12px] font-bold text-[#2D241E] font-['Plus_Jakarta_Sans']"
                  >
                    Email hoặc Email trường (.edu.vn) *
                  </label>
                  {isEdu && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1E824C]/10 text-[#1E824C] text-[11px] font-bold">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Email sinh viên
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="register-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nhapmail@student.edu.vn"
                    disabled={isLoading}
                    className="w-full h-[46px] rounded-[12px] border border-[#E6DACD] text-[14px] text-[#2D241E] placeholder:text-[#9E928A] px-3.5 pr-10 focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400]/20 shadow-sm transition-all outline-none font-['Plus_Jakarta_Sans'] bg-white disabled:bg-gray-50"
                  />
                  {isEmailValidFormat && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1E824C] pointer-events-none">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Dòng gợi ý hỗ trợ màu xanh lá #1E824C */}
                <div className="flex items-center gap-1.5 text-[12px] text-[#1E824C] font-medium mt-1.5 font-['Plus_Jakarta_Sans']">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Ưu tiên email trường để nhận tick xác thực SV uy tín</span>
                </div>
              </div>

              {/* 3.3. Mật khẩu * */}
              <div>
                <label
                  htmlFor="register-password"
                  className="block text-[12px] font-bold text-[#2D241E] mb-1 font-['Plus_Jakarta_Sans']"
                >
                  Mật khẩu *
                </label>
                <div className="relative">
                  <input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tạo mật khẩu an toàn"
                    disabled={isLoading}
                    className="w-full h-[46px] rounded-[12px] border border-[#E6DACD] text-[14px] text-[#2D241E] placeholder:text-[#9E928A] px-3.5 pr-11 focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400]/20 shadow-sm transition-all outline-none font-['Plus_Jakarta_Sans'] bg-white disabled:bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9E928A] hover:text-[#2D241E] transition-colors p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Security Checklist Box (Giống CSS Figma) */}
                <div className="mt-2 p-2.5 rounded-[12px] bg-[#FAF6F0] border border-[#E6DACD]/70 font-['Plus_Jakarta_Sans']">
                  <span className="text-[11px] font-bold text-[#756A63] uppercase tracking-wider block mb-1.5">
                    ĐỘ AN TOÀN MẬT KHẨU:
                  </span>
                  <div className="flex flex-col gap-1 text-xs">
                    {/* Tiêu chí 1: Tối thiểu 8 ký tự */}
                    <div
                      className={`flex items-center gap-2 transition-colors ${passwordCriteria.hasMinLength
                          ? 'text-[#1E824C] font-semibold'
                          : 'text-[#756A63]'
                        }`}
                    >
                      {passwordCriteria.hasMinLength ? (
                        <Check className="w-3.5 h-3.5 shrink-0 text-[#1E824C]" />
                      ) : (
                        <span className="w-3.5 h-3.5 flex items-center justify-center text-[10px] text-[#9E928A]">
                          •
                        </span>
                      )}
                      <span>Tối thiểu 8 ký tự</span>
                    </div>

                    {/* Tiêu chí 2: Chứa chữ hoa và số */}
                    <div
                      className={`flex items-center gap-2 transition-colors ${passwordCriteria.hasUpperAndNumber
                          ? 'text-[#1E824C] font-semibold'
                          : 'text-[#756A63]'
                        }`}
                    >
                      {passwordCriteria.hasUpperAndNumber ? (
                        <Check className="w-3.5 h-3.5 shrink-0 text-[#1E824C]" />
                      ) : (
                        <span className="w-3.5 h-3.5 flex items-center justify-center text-[10px] text-[#9E928A]">
                          •
                        </span>
                      )}
                      <span>Chứa chữ hoa và số</span>
                    </div>

                    {/* Tiêu chí 3: Chứa ký tự đặc biệt */}
                    <div
                      className={`flex items-center gap-2 transition-colors ${passwordCriteria.hasSpecialChar
                          ? 'text-[#1E824C] font-semibold'
                          : 'text-[#756A63]'
                        }`}
                    >
                      {passwordCriteria.hasSpecialChar ? (
                        <Check className="w-3.5 h-3.5 shrink-0 text-[#1E824C]" />
                      ) : (
                        <span className="w-3.5 h-3.5 flex items-center justify-center text-[10px] text-[#9E928A]">
                          •
                        </span>
                      )}
                      <span>Chứa ký tự đặc biệt (@, #, $...)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3.4. Nhập lại mật khẩu * */}
              <div>
                <label
                  htmlFor="register-confirm-password"
                  className="block text-[12px] font-bold text-[#2D241E] mb-1 font-['Plus_Jakarta_Sans']"
                >
                  Nhập lại mật khẩu *
                </label>
                <div className="relative">
                  <input
                    id="register-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Xác nhận lại mật khẩu"
                    disabled={isLoading}
                    className={`w-full h-[46px] rounded-[12px] border text-[14px] text-[#2D241E] placeholder:text-[#9E928A] px-3.5 pr-11 shadow-sm transition-all outline-none font-['Plus_Jakarta_Sans'] bg-white disabled:bg-gray-50 ${isConfirmPasswordInvalid
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-[#E6DACD] focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400]/20'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9E928A] hover:text-[#2D241E] transition-colors p-1 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {isConfirmPasswordInvalid && (
                  <p className="text-red-500 text-[11px] font-medium mt-1">
                    Mật khẩu nhập lại không trùng khớp.
                  </p>
                )}
                {isPasswordMatch && confirmPassword && (
                  <div className="flex items-center gap-1 text-[#1E824C] text-[11px] font-medium mt-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Mật khẩu trùng khớp</span>
                  </div>
                )}
              </div>

              {/* 3.5. Checkbox Điều khoản */}
              <div className="pt-0.5">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-[#E6DACD] text-[#D35400] focus:ring-[#D35400] focus:ring-offset-0 cursor-pointer accent-[#D35400]"
                  />
                  <span className="text-[12px] text-[#756A63] leading-snug font-['Plus_Jakarta_Sans']">
                    Tôi đồng ý với{' '}
                    <span className="text-[#D35400] font-semibold hover:underline">
                      Quy chế hoạt động
                    </span>{' '}
                    &{' '}
                    <span className="text-[#D35400] font-semibold hover:underline">
                      Điều khoản bảo mật
                    </span>{' '}
                    của SinhVienPass
                  </span>
                </label>
              </div>

              {/* 4. Nút Submit Chính (Primary CTA) */}
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full h-[50px] lg:h-[52px] mt-1 bg-[#D35400] hover:bg-[#B94600] active:bg-[#9C3B00] rounded-[12px] shadow-[0px_4px_14px_rgba(211,84,0,0.25)] text-white text-[15px] sm:text-[16px] font-bold font-['Be_Vietnam_Pro'] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Đang tạo tài khoản...</span>
                  </>
                ) : (
                  <>
                    <span>Đăng ký ngay</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* 5. Đăng ký nhanh qua Google (OAuth Divider & Button) */}
            <div className="relative my-2 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-[#E6DACD]" />
              </div>
              <span className="relative z-10 bg-white px-3 text-[12px] text-[#756A63] font-medium font-['Plus_Jakarta_Sans'] whitespace-nowrap">
                hoặc đăng ký với
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleRegister}
              disabled={isLoading}
              className="w-full h-[42px] bg-white border border-[#E6DACD] hover:bg-[#FAF6F0] rounded-[12px] shadow-sm text-[#2D241E] font-semibold text-[13px] font-['Plus_Jakarta_Sans'] flex items-center justify-center gap-2.5 transition-all duration-150 cursor-pointer disabled:opacity-60"
            >
              {/* Google 4-color authentic SVG */}
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
              <span>Đăng ký bằng tài khoản Google</span>
            </button>

            {/* 6. Chuyển hướng Đăng nhập (Redirect to Login) */}
            <div className="border-t border-[#F3E9DD] pt-3 text-center mt-0.5">
              <p className="text-[13px] sm:text-[14px] text-[#756A63] font-['Plus_Jakarta_Sans']">
                Đã có tài khoản?{' '}
                <button
                  type="button"
                  onClick={handleGoToLogin}
                  className="font-bold text-[#D35400] hover:underline cursor-pointer"
                >
                  Đăng nhập ngay
                </button>
              </p>
              <span className="text-[11px] text-[#9E928A] mt-1.5 block font-['Plus_Jakarta_Sans']">
                Bảo mật thông tin sinh viên theo tiêu chuẩn an toàn khuôn viên ĐHQG.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
