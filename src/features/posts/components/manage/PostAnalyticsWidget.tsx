import React from 'react';
import { TrendingUp, Eye, MessageSquare, Heart, ArrowUpRight } from 'lucide-react';
import { PostAnalyticsWidgetProps } from '../../types';

export const PostAnalyticsWidget: React.FC<PostAnalyticsWidgetProps> = ({
  analytics,
  className = '',
}) => {
  return (
    <div
      className={`w-full bg-white rounded-2xl border border-[#E6DACD] p-5 sm:p-6 flex flex-col gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className}`}
    >
      {/* 1. Header widget */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#D35400]" />
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#221A14]">
            CHỈ SỐ TƯƠNG TÁC TIN ĐĂNG
          </h3>
        </div>

        {analytics.isTrendingGood && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#006D3B]">
            <span className="w-2 h-2 rounded-full bg-[#006D3B] animate-pulse" />
            <span>Đang tiếp cận tốt</span>
          </span>
        )}
      </div>

      {/* 2. Bộ 3 ô chỉ số (Views, Messages, Saved) */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {/* Ô 1: Lượt xem tin */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFF8F3] border border-[#F6D2BD]/60 flex flex-col items-center justify-center text-center">
          <Eye className="w-4 h-4 text-[#D35400] mb-1 opacity-80" />
          <span className="font-heading font-bold text-xl sm:text-2xl text-[#221A14]">
            {analytics.viewsCount}
          </span>
          <span className="text-[11px] text-[#756A63] mt-0.5">Lượt xem tin</span>
        </div>

        {/* Ô 2: Người nhắn tin */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFF8F3] border border-[#F6D2BD]/60 flex flex-col items-center justify-center text-center">
          <MessageSquare className="w-4 h-4 text-[#006D3B] mb-1 opacity-80" />
          <span className="font-heading font-bold text-xl sm:text-2xl text-[#221A14]">
            {analytics.chatPeopleCount}
          </span>
          <span className="text-[11px] text-[#756A63] mt-0.5">Người nhắn tin</span>
        </div>

        {/* Ô 3: Lượt lưu tin */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFF8F3] border border-[#F6D2BD]/60 flex flex-col items-center justify-center text-center">
          <Heart className="w-4 h-4 text-[#C0392B] mb-1 opacity-80" />
          <span className="font-heading font-bold text-xl sm:text-2xl text-[#221A14]">
            {analytics.savedCount}
          </span>
          <span className="text-[11px] text-[#756A63] mt-0.5">Lượt lưu tin</span>
        </div>
      </div>

      {/* 3. Dòng chân widget: Tỷ lệ phản hồi & Trend */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F3E9DD] text-xs font-body">
        <span className="text-[#756A63]">
          Tỷ lệ phản hồi tin: <strong className="text-[#221A14] font-semibold">{analytics.responseRatePercent}%</strong>{' '}
          <span className="text-[#9E928A]">({analytics.responseTimeText})</span>
        </span>

        <span className="font-semibold text-[#006D3B] flex items-center gap-1">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>+{analytics.trendPercent}% so với hôm qua</span>
        </span>
      </div>
    </div>
  );
};

export default PostAnalyticsWidget;
