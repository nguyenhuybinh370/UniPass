import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  KeyRound,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { useToast } from '@/components/feedback/Toast';

export interface SecurityPasswordSectionProps {
  onUpdatePassword?: (currentPassword: string, newPassword: string) => Promise<void> | void;
  className?: string;
}

export const SecurityPasswordSection: React.FC<SecurityPasswordSectionProps> = ({
  onUpdatePassword,
  className = '',
}) => {
  const { showToast } = useToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password Visibility States
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Loading & Error States
  const [isUpdating, setIsUpdating] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Dynamic Password Criteria Checklist
  const passwordCriteria = useMemo(() => {
    return {
      hasMinLength: newPassword.length >= 8,
      hasUpperAndLower: /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword),
      hasNumberAndSpecial: /[0-9]/.test(newPassword) && /[^A-Za-z0-9]/.test(newPassword),
    };
  }, [newPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (!currentPassword) {
      setPasswordError('Vui lòng nhập mật khẩu hiện tại.');
      return;
    }

    const { hasMinLength, hasUpperAndLower, hasNumberAndSpecial } = passwordCriteria;
    if (!hasMinLength || !hasUpperAndLower || !hasNumberAndSpecial) {
      setPasswordError('Mật khẩu mới chưa đáp ứng đủ 3 tiêu chí an toàn.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Mật khẩu xác nhận không khớp với mật khẩu mới.');
      return;
    }

    setIsUpdating(true);
    try {
      if (onUpdatePassword) {
        await onUpdatePassword(currentPassword, newPassword);
      } else {
        // Giả lập network delay nếu không truyền handler
        await new Promise((res) => setTimeout(res, 600));
      }

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      showToast({
        type: 'success',
        message: 'Cập nhật mật khẩu tài khoản thành công!',
      });
    } catch {
      setPasswordError('Không thể cập nhật mật khẩu. Vui lòng kiểm tra lại!');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section aria-labelledby="security-password-title" className={className}>
      {/* Header khối */}
      <div className="pb-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#9E3D00] stroke-[2.2]" />
          <h2
            id="security-password-title"
            className="font-heading font-bold text-2xl text-[#221A14]"
          >
            Bảo mật &amp; Đổi mật khẩu
          </h2>
        </div>
        <p className="text-[13px] text-[#756A63] mt-1 font-body">
          Quản lý mật khẩu đăng nhập và các lớp bảo vệ tài khoản sinh viên.
        </p>
      </div>

      {/* Password Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-body">
        {/* Alert Lỗi nếu có */}
        {passwordError && (
          <div className="p-3 bg-[#FBECEB] border border-[#F5C6CB] rounded-[10px] flex items-center gap-2 text-xs font-semibold text-[#C0392B]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        {/* Hàng 1: Mật khẩu hiện tại & Mật khẩu mới (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mật khẩu hiện tại * */}
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-semibold text-[#221A14] mb-1.5"
            >
              Mật khẩu hiện tại <span className="text-[#9E3D00]">*</span>
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => {
                  setPasswordError(null);
                  setCurrentPassword(e.target.value);
                }}
                className="w-full h-[42px] pl-3.5 pr-10 bg-white border border-[#E6DACD] rounded-lg text-[15px] text-[#221A14] placeholder:text-[#9E928A] focus:outline-none focus:border-[#9E3D00] focus:ring-1 focus:ring-[#9E3D00]/20 transition-colors"
                placeholder="Nhập mật khẩu đang dùng"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#756A63] hover:text-[#221A14] transition-colors cursor-pointer"
                title={showCurrent ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mật khẩu mới * */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold text-[#221A14] mb-1.5"
            >
              Mật khẩu mới <span className="text-[#9E3D00]">*</span>
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {
                  setPasswordError(null);
                  setNewPassword(e.target.value);
                }}
                className="w-full h-[42px] pl-3.5 pr-10 bg-white border border-[#E6DACD] rounded-lg text-[15px] text-[#221A14] placeholder:text-[#9E928A] focus:outline-none focus:border-[#9E3D00] focus:ring-1 focus:ring-[#9E3D00]/20 transition-colors"
                placeholder="Nhập mật khẩu mới (tối thiểu 8 ký tự)"
              />
              <button
                type="button"
                onClick={() => setShowNew((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#756A63] hover:text-[#221A14] transition-colors cursor-pointer"
                title={showNew ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Hàng 2: Xác nhận mật khẩu mới * (Chiếm 1 cột bên trái theo thiết kế) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-[#221A14] mb-1.5"
            >
              Xác nhận mật khẩu mới <span className="text-[#9E3D00]">*</span>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setPasswordError(null);
                  setConfirmPassword(e.target.value);
                }}
                className="w-full h-[42px] pl-3.5 pr-10 bg-white border border-[#E6DACD] rounded-lg text-[15px] text-[#221A14] placeholder:text-[#9E928A] focus:outline-none focus:border-[#9E3D00] focus:ring-1 focus:ring-[#9E3D00]/20 transition-colors"
                placeholder="Nhập lại mật khẩu mới"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#756A63] hover:text-[#221A14] transition-colors cursor-pointer"
                title={showConfirm ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {/* Cột phải để trống tạo độ thoáng theo chuẩn Figma */}
          <div className="hidden md:block" />
        </div>

        {/* Khung tiêu chí độ an toàn mật khẩu (Password Criteria Checklist Box) */}
        <div className="w-full bg-[#F3E9DD]/60 border border-[#EFE6DC] rounded-[10px] p-4 flex flex-col gap-2.5">
          <span className="text-[11px] font-semibold text-[#756A63] tracking-wider uppercase">
            ĐỘ AN TOÀN MẬT KHẨU:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5">
            {/* Tiêu chí 1: Tối thiểu 8 ký tự */}
            <div
              className={`flex items-center gap-1.5 text-[13px] font-medium transition-colors ${
                passwordCriteria.hasMinLength ? 'text-[#006D3B]' : 'text-[#9E928A]'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 shrink-0 transition-colors ${
                  passwordCriteria.hasMinLength
                    ? 'text-[#006D3B]'
                    : 'text-[#9E928A]/70'
                }`}
              />
              <span>Tối thiểu 8 ký tự</span>
            </div>

            {/* Tiêu chí 2: Có chữ hoa & thường */}
            <div
              className={`flex items-center gap-1.5 text-[13px] font-medium transition-colors ${
                passwordCriteria.hasUpperAndLower
                  ? 'text-[#006D3B]'
                  : 'text-[#9E928A]'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 shrink-0 transition-colors ${
                  passwordCriteria.hasUpperAndLower
                    ? 'text-[#006D3B]'
                    : 'text-[#9E928A]/70'
                }`}
              />
              <span>Có chữ hoa &amp; thường</span>
            </div>

            {/* Tiêu chí 3: Có số & ký tự đặc biệt */}
            <div
              className={`flex items-center gap-1.5 text-[13px] font-medium transition-colors ${
                passwordCriteria.hasNumberAndSpecial
                  ? 'text-[#006D3B]'
                  : 'text-[#9E928A]'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 shrink-0 transition-colors ${
                  passwordCriteria.hasNumberAndSpecial
                    ? 'text-[#006D3B]'
                    : 'text-[#9E928A]/70'
                }`}
              />
              <span>Có số &amp; ký tự đặc biệt</span>
            </div>
          </div>
        </div>

        {/* Hàng nút thao tác Bảo mật (Action Row) */}
        <div className="flex justify-between items-center pt-2">
          <Link
            to={ROUTES.AUTH.FORGOT_PASSWORD}
            className="text-xs font-semibold text-[#9E3D00] hover:underline cursor-pointer"
          >
            Quên mật khẩu?
          </Link>

          <button
            type="submit"
            disabled={isUpdating}
            className="px-6 py-2.5 rounded-[10px] bg-[#9E3D00] hover:bg-[#B94600] active:scale-[0.99] text-white text-sm font-semibold shadow-[0px_2px_8px_rgba(158,61,0,0.25)] flex items-center gap-2 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang cập nhật...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Cập nhật mật khẩu</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SecurityPasswordSection;
