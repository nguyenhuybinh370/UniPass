import React from 'react';
import { PackageOpen } from 'lucide-react';
import { EmptyStateProps } from '@/types';

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Không tìm thấy dữ liệu',
  description = 'Hiện tại chưa có thông tin nào để hiển thị trong mục này.',
  icon,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`w-full py-12 px-6 flex flex-col items-center justify-center text-center rounded-2xl bg-white border border-[#E6DACD] shadow-xs ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-[#FAF6F0] border border-[#E6DACD] flex items-center justify-center text-[#D35400] mb-4 shadow-warm-xs">
        {icon || <PackageOpen className="w-8 h-8 text-[#D35400]" />}
      </div>
      <h3 className="font-heading font-bold text-lg text-[#221A14] tracking-tight">
        {title}
      </h3>
      <p className="font-body text-sm text-[#756A63] max-w-sm mt-1.5 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 px-5 py-2.5 rounded-xl bg-[#D35400] hover:bg-[#B94600] text-white font-semibold text-sm transition-all shadow-sm active:scale-98 cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
