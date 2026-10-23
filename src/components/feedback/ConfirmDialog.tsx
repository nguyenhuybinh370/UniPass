import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Spinner } from '@/components/ui/Spinner';
import { ConfirmDialogProps } from '@/types';

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy bỏ',
  variant = 'danger',
  isLoading = false,
  onConfirm,
  onClose,
}) => {
  // Đóng khi nhấn phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const isDanger = variant === 'danger';
  const isWarning = variant === 'warning';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-warm-lg border border-[#E6DACD] p-6 flex flex-col gap-5 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header với icon & nút close */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                isDanger
                  ? 'bg-[#FBECEB] text-[#C0392B]'
                  : isWarning
                  ? 'bg-[#FDF3E1] text-[#D35400]'
                  : 'bg-[#E8F5E9] text-[#006D3B]'
              }`}
            >
              {isDanger ? (
                <Trash2 className="w-5 h-5 text-[#C0392B]" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-[#D35400]" />
              )}
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#221A14]">
                {title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="text-[#756A63] hover:text-[#221A14] hover:bg-[#FAF6F0] p-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nội dung thông báo */}
        <p className="text-sm text-[#756A63] leading-relaxed font-body">
          {message}
        </p>

        {/* Cụm nút bấm xác nhận / hủy */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl border border-[#E6DACD] bg-white text-[#221A14] hover:bg-[#FAF6F0] text-sm font-semibold transition-all cursor-pointer disabled:opacity-50 active:scale-98"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 active:scale-98 shadow-sm ${
              isDanger
                ? 'bg-[#C0392B] hover:bg-[#A93226]'
                : isWarning
                ? 'bg-[#D35400] hover:bg-[#B94600]'
                : 'bg-[#006D3B] hover:bg-[#00552E]'
            }`}
          >
            {isLoading && <Spinner size="sm" className="text-white" />}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
