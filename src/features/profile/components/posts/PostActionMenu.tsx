import React, { useRef } from 'react';
import { MoreHorizontal, Pencil, EyeOff, Trash2 } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';

export interface PostActionMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onEdit: () => void;
  onHide: () => void;
  onDelete: () => void;
  className?: string;
}

export const PostActionMenu: React.FC<PostActionMenuProps> = ({
  isOpen,
  onToggle,
  onClose,
  onEdit,
  onHide,
  onDelete,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => {
    if (isOpen) onClose();
  });

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* 3-dots trigger button */}
      <button
        type="button"
        onClick={onToggle}
        className="w-8 h-8 flex items-center justify-center border border-[#E6DACD] rounded-lg text-[#756A63] hover:bg-[#FAF6F0] hover:text-[#221A14] transition-colors cursor-pointer"
        title="Tùy chọn khác"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {/* Pop-up menu hành động phụ */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-36 bg-white rounded-xl border border-[#E6DACD] shadow-[0px_4px_16px_rgba(45,36,30,0.12)] z-30 p-1 flex flex-col gap-0.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit();
            }}
            className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-medium text-[#221A14] hover:bg-[#FAF6F0] flex items-center gap-2 cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5 text-[#756A63]" />
            <span>Chỉnh sửa tin</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onHide();
            }}
            className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-medium text-[#756A63] hover:bg-[#FAF6F0] flex items-center gap-2 cursor-pointer"
          >
            <EyeOff className="w-3.5 h-3.5 text-[#756A63]" />
            <span>Tạm ẩn tin</span>
          </button>

          <div className="h-[1px] bg-[#EFE6DC] my-0.5" />

          <button
            type="button"
            onClick={() => {
              onClose();
              onDelete();
            }}
            className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-medium text-[#C0392B] hover:bg-[#FBECEB] flex items-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-[#C0392B]" />
            <span>Xóa bài đăng</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostActionMenu;
