import React, { useState, useRef, useEffect } from 'react';
import { Edit3, Lock, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/components/feedback/Toast';

export interface StudentInfoData {
  fullName: string;
  mssv: string;
  eduEmail: string;
  phone: string;
}

export interface StudentInfoSectionProps {
  initialData: StudentInfoData;
  onSave?: (data: StudentInfoData) => Promise<void> | void;
  className?: string;
}

export const StudentInfoSection: React.FC<StudentInfoSectionProps> = ({
  initialData,
  onSave,
  className = '',
}) => {
  const { showToast } = useToast();
  const fullNameInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<StudentInfoData>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  // Cập nhật lại form nếu initialData thay đổi
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleEditClick = () => {
    fullNameInputRef.current?.focus();
    showToast({
      type: 'info',
      message: 'Bạn có thể chỉnh sửa Họ và tên cùng Số điện thoại liên hệ.',
    });
  };

  const handleCancel = () => {
    setFormData(initialData);
    showToast({
      type: 'info',
      message: 'Đã hoàn tác các thay đổi thông tin.',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      showToast({
        type: 'error',
        message: 'Vui lòng nhập Họ và tên sinh viên!',
      });
      return;
    }
    if (!formData.phone.trim()) {
      showToast({
        type: 'error',
        message: 'Vui lòng nhập Số điện thoại liên hệ!',
      });
      return;
    }

    setIsSaving(true);
    try {
      if (onSave) {
        await onSave(formData);
      } else {
        // Giả lập network delay nếu không truyền handler
        await new Promise((res) => setTimeout(res, 500));
      }
      showToast({
        type: 'success',
        message: 'Đã lưu thay đổi thông tin sinh viên thành công!',
      });
    } catch {
      showToast({
        type: 'error',
        message: 'Không thể lưu thông tin. Vui lòng thử lại!',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section aria-labelledby="student-info-title" className={className}>
      {/* Header khối */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6">
        <div>
          <h2
            id="student-info-title"
            className="font-heading font-bold text-2xl text-[#221A14]"
          >
            Thông tin sinh viên
          </h2>
          <p className="text-[13px] text-[#756A63] mt-1 font-body">
            Cập nhật thông tin để thuận tiện hẹn gặp trao đổi đồ tại khuôn viên trường và khu ký túc xá.
          </p>
        </div>
        <button
          type="button"
          onClick={handleEditClick}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9E3D00] hover:text-[#B94600] transition-colors cursor-pointer self-start sm:self-auto font-body"
        >
          <Edit3 className="w-4 h-4" />
          <span>Chỉnh sửa thông tin</span>
        </button>
      </div>

      {/* Lưới Form thông tin (2 Columns Grid) */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-body">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* Field 1: Họ và tên * */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-[#221A14] mb-1.5"
            >
              Họ và tên <span className="text-[#9E3D00]">*</span>
            </label>
            <input
              ref={fullNameInputRef}
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              className="w-full h-[42px] px-3.5 bg-white border border-[#E6DACD] rounded-lg text-[15px] text-[#221A14] placeholder:text-[#9E928A] focus:outline-none focus:border-[#9E3D00] focus:ring-1 focus:ring-[#9E3D00]/20 transition-colors"
              placeholder="Nhập họ và tên đầy đủ"
            />
            <p className="text-[11px] text-[#756A63] mt-1.5">
              Tên thật theo thẻ sinh viên ĐHQG để đối soát khi gặp mặt.
            </p>
          </div>

          {/* Field 2: Mã số sinh viên (MSSV) * (LOCKED) */}
          <div>
            <label
              htmlFor="mssv"
              className="block text-sm font-semibold text-[#221A14] mb-1.5"
            >
              Mã số sinh viên (MSSV) <span className="text-[#9E3D00]">*</span>
            </label>
            <input
              id="mssv"
              type="text"
              value={formData.mssv}
              readOnly
              disabled
              className="w-full h-[42px] px-3.5 bg-[#F3E9DD] border border-[#E6DACD]/60 rounded-lg text-[15px] text-[#221A14] opacity-90 cursor-not-allowed select-none"
            />
            <p className="text-[11px] text-[#756A63] mt-1.5 flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#756A63]" />
              <span>Được cố định tự động qua cổng SSO trường UIT.</span>
            </p>
          </div>

          {/* Field 3: Email sinh viên trường * (LOCKED) */}
          <div>
            <label
              htmlFor="eduEmail"
              className="block text-sm font-semibold text-[#221A14] mb-1.5"
            >
              Email sinh viên trường <span className="text-[#9E3D00]">*</span>
            </label>
            <input
              id="eduEmail"
              type="email"
              value={formData.eduEmail}
              readOnly
              disabled
              className="w-full h-[42px] px-3.5 bg-[#F3E9DD] border border-[#E6DACD]/60 rounded-lg text-[15px] text-[#221A14] opacity-90 cursor-not-allowed select-none"
            />
            <p className="text-[11px] text-[#756A63] mt-1.5">
              Dùng nhận thông báo trao đổi và đổi mật khẩu.
            </p>
          </div>

          {/* Field 4: Số điện thoại liên hệ * */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-[#221A14] mb-1.5"
            >
              Số điện thoại liên hệ <span className="text-[#9E3D00]">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full h-[42px] px-3.5 bg-white border border-[#E6DACD] rounded-lg text-[15px] text-[#221A14] placeholder:text-[#9E928A] focus:outline-none focus:border-[#9E3D00] focus:ring-1 focus:ring-[#9E3D00]/20 transition-colors"
              placeholder="09xx xxx xxx"
            />
            <p className="text-[11px] text-[#756A63] mt-1.5">
              Tự động ẩn số đối với người xem vãng lai.
            </p>
          </div>
        </div>

        {/* Nút thao tác Thông tin (Right-aligned Action Row) */}
        <div className="flex justify-end items-center gap-3 pt-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2.5 rounded-[10px] text-sm font-semibold text-[#756A63] hover:text-[#221A14] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
          >
            Hủy thay đổi
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-[10px] bg-[#9E3D00] hover:bg-[#B94600] active:scale-[0.99] text-white text-sm font-semibold shadow-[0px_2px_8px_rgba(158,61,0,0.25)] flex items-center gap-2 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang lưu...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Lưu thay đổi</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default StudentInfoSection;
