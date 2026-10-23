import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, BookOpen, MapPin, Users } from 'lucide-react';
import { RecentPostItem } from '@/features/profile/types';
import { formatCurrency } from '@/utils/formatCurrency';

export interface RecentPostsSectionProps {
  posts: RecentPostItem[];
  className?: string;
}

export const RecentPostsSection: React.FC<RecentPostsSectionProps> = ({
  posts,
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="recent-posts-title"
      className={`w-full bg-white border border-[#E6DACD] rounded-[14px] p-6 shadow-[0px_2px_8px_rgba(45,36,30,0.05)] flex flex-col gap-4 font-body ${className}`}
    >
      {/* Section Header */}
      <div className="border-b border-[#EFE6DC] pb-3.5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#9E3D00]" />
          <h3
            id="recent-posts-title"
            className="font-heading font-bold text-[17px] text-[#221A14]"
          >
            Bài đăng gần đây của bạn
          </h3>
        </div>
        <Link
          to="/profile/me?tab=posts"
          className="text-[13px] font-semibold text-[#9E3D00] hover:underline flex items-center gap-1 transition-colors"
        >
          <span>Xem tất cả bài đăng</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Items Stack */}
      <div className="flex flex-col gap-3.5">
        {posts.map((item) => {
          const isGift = item.type === 'gift';

          return (
            <div
              key={item.id}
              className={`p-3.5 bg-[#FFF8F5] border border-[#EFE6DC] rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 transition-all ${
                isGift
                  ? 'hover:border-[#006D3B]/40'
                  : 'hover:border-[#D35400]/40'
              }`}
            >
              {/* Cột thông tin món đồ (bên trái) */}
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Thumbnail vuông 56x56 */}
                <div className="w-14 h-14 rounded-lg border border-[#E6DACD] overflow-hidden relative shrink-0 bg-white shadow-sm">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay badge độ mới */}
                  <span className="bg-[rgba(34,26,20,0.8)] text-white text-[9px] font-medium px-1.5 py-0.5 rounded absolute bottom-1 right-1 leading-none shadow-sm">
                    {item.condition}
                  </span>
                </div>

                {/* Cột chữ */}
                <div className="flex flex-col min-w-0">
                  <h4
                    onClick={() => navigate(`/posts/${item.id}`)}
                    className="font-semibold text-sm text-[#221A14] hover:text-[#9E3D00] transition-colors line-clamp-1 cursor-pointer"
                  >
                    {item.title}
                  </h4>
                  <div className="text-[13px] text-[#756A63] flex flex-wrap items-center gap-2 mt-1">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#756A63]" />
                      <span>{item.category}</span>
                    </span>
                    <span>•</span>
                    <span>{item.timeAgo}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#756A63]">
                      <MapPin className="w-3.5 h-3.5 text-[#9E3D00]" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Cột giá & thao tác (bên phải) */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EFE6DC]">
                <div className="flex items-center gap-2 sm:gap-1.5">
                  {/* Status pill */}
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                      isGift
                        ? 'bg-[#98F7B5]/40 text-[#006D3B] border-[#98F7B5]/60'
                        : 'bg-[#FDF3E1] text-[#9E3D00] border-[#E6DACD]/60'
                    }`}
                  >
                    {item.statusText}
                  </span>
                  {/* Giá tiền */}
                  <span
                    className={`font-heading font-bold text-base ${
                      isGift ? 'text-[#006D3B]' : 'text-[#9E3D00]'
                    }`}
                  >
                    {isGift
                      ? 'Miễn phí'
                      : item.price !== undefined
                      ? formatCurrency(item.price)
                      : 'Thương lượng'}
                  </span>
                </div>

                {/* Nút thao tác */}
                <div className="mt-1">
                  {isGift ? (
                    <button
                      type="button"
                      onClick={() => navigate(`/posts/${item.id}`)}
                      className="px-3 py-1 bg-[#98F7B5]/40 hover:bg-[#98F7B5]/60 rounded-lg text-xs font-semibold text-[#006D3B] flex items-center gap-1.5 transition-colors cursor-pointer border border-[#98F7B5]/70"
                    >
                      <Users className="w-3.5 h-3.5 text-[#006D3B]" />
                      <span>{item.actionLabel}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate(`/posts/${item.id}`)}
                      className="px-3.5 py-1.5 bg-white border border-[#E6DACD] hover:border-[#9E3D00] rounded-lg text-xs font-semibold text-[#756A63] hover:text-[#221A14] hover:bg-[#FAF6F0] transition-colors cursor-pointer shadow-sm"
                    >
                      <span>{item.actionLabel}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentPostsSection;
