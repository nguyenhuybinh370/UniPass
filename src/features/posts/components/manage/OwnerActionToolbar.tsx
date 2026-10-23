import React from 'react';
import { Clock, ShieldCheck, CheckCircle2, Edit3, EyeOff, Eye, Trash2, RotateCcw } from 'lucide-react';
import { Spinner } from '@/components/ui/Spinner';
import { OwnerActionToolbarProps } from '../../types';

export const OwnerActionToolbar: React.FC<OwnerActionToolbarProps> = ({
  code,
  status,
  statusBadgeText,
  postedTimeText,
  verifiedByText,
  onMarkCompleted,
  isCompleting = false,
  onToggleHide,
  isHiding = false,
  onEdit,
  onDelete,
  isDeleting = false,
  className = '',
}) => {
  const isCompleted = status === 'COMPLETED';
  const isHidden = status === 'HIDDEN';

  return (
    <div
      className={`w-full bg-white rounded-2xl border border-[#E6DACD] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className}`}
    >
      {/* Cụm thông tin mã tin & trạng thái */}
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-heading font-bold text-xl sm:text-2xl text-[#221A14] tracking-tight">
            Mã tin: {code}
          </h1>
          <span
            className={`font-heading text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border ${
              isCompleted
                ? 'bg-[#E8F5E9] text-[#006D3B] border-[#A3E9B8]'
                : isHidden
                ? 'bg-[#F3E9DD] text-[#756A63] border-[#E6DACD]'
                : 'bg-[#FDF3E1] text-[#D35400] border-[#F6D2BD]'
            }`}
          >
            {statusBadgeText}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#756A63] font-body">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#9E928A]" />
            <span>Đăng lúc: {postedTimeText}</span>
          </span>
          <span className="hidden sm:inline text-[#E6DACD]">•</span>
          <span className="flex items-center gap-1.5 font-medium text-[#006D3B]">
            <ShieldCheck className="w-4 h-4 text-[#006D3B] shrink-0" />
            <span>{verifiedByText}</span>
          </span>
        </div>
      </div>

      {/* Cụm 4 nút thao tác của chủ tin */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Nút 1: Đánh dấu đã pass / Mở lại */}
        <button
          type="button"
          onClick={onMarkCompleted}
          disabled={isCompleting || isHiding || isDeleting}
          className={`font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98 disabled:opacity-50 ${
            isCompleted
              ? 'bg-white border border-[#006D3B] text-[#006D3B] hover:bg-[#E8F5E9]'
              : 'bg-[#006D3B] hover:bg-[#00552E] text-white'
          }`}
        >
          {isCompleting ? (
            <Spinner size="sm" className={isCompleted ? 'text-[#006D3B]' : 'text-white'} />
          ) : isCompleted ? (
            <RotateCcw className="w-4 h-4" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          <span>{isCompleted ? 'Đăng lại tin này' : 'Đánh dấu đã Pass'}</span>
        </button>

        {/* Nút 2: Chỉnh sửa */}
        <button
          type="button"
          onClick={onEdit}
          disabled={isCompleting || isHiding || isDeleting}
          className="bg-white border border-[#E6DACD] text-[#221A14] hover:bg-[#FAF6F0] font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
        >
          <Edit3 className="w-4 h-4 text-[#756A63]" />
          <span>Chỉnh sửa</span>
        </button>

        {/* Nút 3: Tạm ẩn / Hiện lại */}
        <button
          type="button"
          onClick={onToggleHide}
          disabled={isCompleting || isHiding || isDeleting}
          className="bg-white border border-[#E6DACD] text-[#221A14] hover:bg-[#FAF6F0] font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
        >
          {isHiding ? (
            <Spinner size="sm" className="text-[#756A63]" />
          ) : isHidden ? (
            <Eye className="w-4 h-4 text-[#756A63]" />
          ) : (
            <EyeOff className="w-4 h-4 text-[#756A63]" />
          )}
          <span>{isHidden ? 'Bật hiển thị' : 'Tạm ẩn'}</span>
        </button>

        {/* Nút 4: Xóa tin */}
        <button
          type="button"
          onClick={onDelete}
          disabled={isCompleting || isHiding || isDeleting}
          className="bg-[#FBECEB] border border-[#F5C6CB]/60 text-[#C0392B] hover:bg-[#F8D7DA] font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
        >
          {isDeleting ? (
            <Spinner size="sm" className="text-[#C0392B]" />
          ) : (
            <Trash2 className="w-4 h-4 text-[#C0392B]" />
          )}
          <span>Xóa tin</span>
        </button>
      </div>
    </div>
  );
};

export default OwnerActionToolbar;
