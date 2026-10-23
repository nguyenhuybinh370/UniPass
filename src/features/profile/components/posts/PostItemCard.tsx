import React from 'react';
import { MapPin, CheckCircle2, Eye, RotateCcw } from 'lucide-react';
import { PostItem } from '@/features/profile/types';
import { PostActionMenu } from './PostActionMenu';

export interface PostItemCardProps {
  item: PostItem;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onMarkAsPassed: (id: string) => void;
  onMarkAsGifted: (id: string) => void;
  onRepublish: (id: string) => void;
  onDeletePost: (id: string) => void;
  onHidePost: (id: string) => void;
  onViewDetails: (id: string) => void;
  onEditPost: (id: string) => void;
  className?: string;
}

export const PostItemCard: React.FC<PostItemCardProps> = ({
  item,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  onMarkAsPassed,
  onMarkAsGifted,
  onRepublish,
  onDeletePost,
  onHidePost,
  onViewDetails,
  onEditPost,
  className = '',
}) => {
  const isCompleted = item.type === 'completed';
  const isGift = item.type === 'gift';
  const isPass = item.type === 'pass';

  return (
    <div
      className={`p-4 sm:p-5 rounded-xl border border-[#EFE6DC] bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-sm transition-all ${className}`}
    >
      {/* Bên trái (Ảnh + Thông tin) */}
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
        {/* Khung ảnh đại diện w-20 h-20 */}
        <div
          className={`w-20 h-20 shrink-0 rounded-lg overflow-hidden relative border border-[#E6DACD] bg-[#F3E9DD] ${
            isCompleted ? 'bg-neutral-200' : ''
          }`}
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className={`w-full h-full object-cover ${
              isCompleted ? 'filter blur-[0.5px]' : ''
            }`}
          />

          {isCompleted ? (
            /* Lớp phủ đen mờ toàn phần khi ĐÃ TRAO ĐỔI */
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center p-1">
              <span className="text-[10px] font-bold text-white tracking-wider uppercase leading-tight font-heading">
                ĐÃ TRAO ĐỔI
              </span>
            </div>
          ) : (
            /* Overlay badge độ mới ở góc dưới */
            <span className="bg-[rgba(34,26,20,0.8)] text-white text-[10px] font-medium px-1.5 py-0.5 rounded absolute bottom-1 right-1 leading-none shadow-sm">
              {item.condition}
            </span>
          )}
        </div>

        {/* Cột thông tin */}
        <div className="flex flex-col min-w-0">
          {/* Tag dòng đầu */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {isPass && (
              <span className="bg-[#FDF3E1] text-[#D35400] font-bold text-[10px] tracking-wide px-2 py-0.5 rounded-full uppercase border border-[#E6DACD]/60">
                ĐANG PASS
              </span>
            )}
            {isGift && (
              <span className="bg-[#E8F5E9] text-[#006D3B] font-bold text-[10px] tracking-wide px-2 py-0.5 rounded-full uppercase border border-[#98F7B5]/60">
                TẶNG 0Đ
              </span>
            )}
            {isCompleted && (
              <span className="bg-[#F3E9DD] text-[#756A63] font-bold text-[10px] px-2 py-0.5 rounded-full uppercase border border-[#E6DACD]/60">
                HOÀN TẤT
              </span>
            )}
            <span className="text-[#756A63] text-xs">
              • {item.category} • {item.createdAtText}
            </span>
          </div>

          {/* Tên bài đăng */}
          <h3
            onClick={() => onViewDetails(item.id)}
            className={`font-semibold text-base mt-1 line-clamp-1 cursor-pointer transition-colors ${
              isCompleted
                ? 'text-[#756A63] line-through decoration-[#9E928A]'
                : 'text-[#221A14] hover:text-[#D35400]'
            }`}
          >
            {item.title}
          </h3>

          {/* Giá & Địa điểm */}
          <div className="flex flex-wrap items-center mt-1">
            <span
              className={`font-heading text-sm ${
                isGift
                  ? 'font-bold text-[#006D3B]'
                  : isCompleted
                  ? 'font-semibold text-[#756A63]'
                  : 'font-bold text-[#9E3D00]'
              }`}
            >
              {isGift ? '0 VNĐ' : `${item.price.toLocaleString('vi-VN')} VNĐ`}
            </span>

            <span className="text-xs text-[#756A63] flex items-center gap-1 ml-3">
              <MapPin className="w-3.5 h-3.5 text-[#9E3D00]" />
              <span>{item.location}</span>
            </span>
          </div>

          {/* Dòng thông báo hoàn thành nếu có */}
          {isCompleted && item.completedNote && (
            <div className="text-xs text-[#006D3B] font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#006D3B] shrink-0" />
              <span>{item.completedNote}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bên phải (Cụm nút hành động) */}
      <div className="flex items-center gap-2 self-start md:self-auto shrink-0 relative">
        {/* Action chính dựa trên Type */}
        {isPass && (
          <button
            type="button"
            onClick={() => onMarkAsPassed(item.id)}
            className="bg-white border-[1.5px] border-[#006D3B] text-[#006D3B] hover:bg-[#E8F5E9] font-semibold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-98"
          >
            <CheckCircle2 className="w-4 h-4 text-[#006D3B]" />
            <span>Đánh dấu đã pass</span>
          </button>
        )}

        {isGift && (
          <button
            type="button"
            onClick={() => onMarkAsGifted(item.id)}
            className="bg-[#006D3B] hover:bg-[#00552E] text-white font-semibold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm active:scale-98"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Chốt tặng bạn học</span>
          </button>
        )}

        {isCompleted && (
          <button
            type="button"
            onClick={() => onRepublish(item.id)}
            className="bg-white border border-[#D35400] text-[#D35400] hover:bg-[#FDF3E1] font-semibold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-98"
          >
            <RotateCcw className="w-4 h-4 text-[#D35400]" />
            <span>Đăng lại tin này</span>
          </button>
        )}

        {/* Nút Chi tiết */}
        <button
          type="button"
          onClick={() => onViewDetails(item.id)}
          className="bg-[#FAF6F0] border border-[#E6DACD] text-[#756A63] hover:text-[#221A14] hover:bg-[#F3E9DD] font-medium text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Eye className="w-4 h-4 text-[#756A63]" />
          <span>Chi tiết</span>
        </button>

        {/* Nút MoreHorizontal 3 chấm popup */}
        <PostActionMenu
          isOpen={isMenuOpen}
          onToggle={onToggleMenu}
          onClose={onCloseMenu}
          onEdit={() => onEditPost(item.id)}
          onHide={() => onHidePost(item.id)}
          onDelete={() => onDeletePost(item.id)}
        />
      </div>
    </div>
  );
};

export default PostItemCard;
