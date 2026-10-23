import React from 'react';
import { FileText, Repeat, Star } from 'lucide-react';
import { OverviewStats } from '@/features/profile/types';

export interface ProfileOverviewStatsProps {
  stats: OverviewStats;
  className?: string;
}

export const ProfileOverviewStats: React.FC<ProfileOverviewStatsProps> = ({
  stats,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 font-body ${className}`}>
      {/* Card 1 - Bài viết & Đăng tin */}
      <div className="bg-white border border-[#E6DACD] rounded-[14px] p-5 shadow-[0px_2px_8px_rgba(45,36,30,0.05)] flex items-center gap-4 hover:border-[#D35400]/30 transition-colors">
        <div className="w-12 h-12 rounded-[12px] bg-[#FDF3E1] flex items-center justify-center shrink-0">
          <FileText className="w-6 h-6 text-[#9E3D00]" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] text-[#756A63]">Bài viết &amp; Đăng tin</span>
          <span className="font-heading font-bold text-xl text-[#221A14] mt-0.5 truncate">
            {stats.posts.total} bài đăng
          </span>
          <span className="text-xs font-medium text-[#006D3B] tracking-wide mt-1 truncate">
            {stats.posts.active} đang pass • {stats.posts.completed} hoàn tất
          </span>
        </div>
      </div>

      {/* Card 2 - Đơn hàng & Trao đổi KTX */}
      <div className="bg-white border border-[#E6DACD] rounded-[14px] p-5 shadow-[0px_2px_8px_rgba(45,36,30,0.05)] flex items-center gap-4 hover:border-[#006D3B]/30 transition-colors">
        <div className="w-12 h-12 rounded-[12px] bg-[#98F7B5]/40 flex items-center justify-center shrink-0">
          <Repeat className="w-6 h-6 text-[#006D3B]" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] text-[#756A63]">Đơn hàng &amp; Trao đổi KTX</span>
          <span className="font-heading font-bold text-xl text-[#221A14] mt-0.5 truncate">
            {stats.exchanges.total} đơn trao đổi
          </span>
          <span className="text-xs font-semibold text-[#756A63] tracking-wide mt-1 truncate">
            {stats.exchanges.locations}
          </span>
        </div>
      </div>

      {/* Card 3 - Số sao & Đánh giá uy tín */}
      <div className="bg-white border border-[#E6DACD] rounded-[14px] p-5 shadow-[0px_2px_8px_rgba(45,36,30,0.05)] flex items-center gap-4 hover:border-[#9E3D00]/30 transition-colors">
        <div className="w-12 h-12 rounded-[12px] bg-[rgba(255,220,197,0.6)] flex items-center justify-center shrink-0">
          <Star className="w-6 h-6 text-[#9E3D00] fill-[#9E3D00]" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] text-[#756A63]">Đánh giá uy tín</span>
          <span className="font-heading font-bold text-xl text-[#9E3D00] mt-0.5 truncate">
            {stats.rating.score.toFixed(1)} / 5.0 ★
          </span>
          <span className="text-xs font-semibold text-[#756A63] tracking-wide mt-1 truncate">
            {stats.rating.reviewCount} nhận xét từ sinh viên
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverviewStats;
