import React from 'react';
import { CheckCircle2, MessageSquare, Star, Clock } from 'lucide-react';
import { BuyerRequestItemProps } from '../../types';

export const BuyerRequestItem: React.FC<BuyerRequestItemProps> = ({
  request,
  onChat,
  onConfirmHandover,
  className = '',
}) => {
  const isScheduled = Boolean(request.appointmentTime);

  return (
    <div
      className={`p-4 rounded-xl border border-[#E6DACD] bg-white flex flex-col gap-3 transition-all hover:border-[#D35400]/40 shadow-2xs ${className}`}
    >
      {/* 1. Thông tin sinh viên & Trạng thái hẹn */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Avatar viết tắt có check xanh */}
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#FFF1E9] border border-[#F6D2BD] text-[#D35400] font-heading font-bold text-sm flex items-center justify-center">
              {request.avatarInitial}
            </div>
            {request.isVerifiedStudent && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#006D3B] text-white flex items-center justify-center border-2 border-white shadow-xs">
                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>

          {/* Tên & Trường & Đánh giá */}
          <div className="flex flex-col min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-heading font-bold text-sm text-[#221A14] truncate">
                {request.buyerName}
              </span>
              <span className="text-xs text-[#756A63]">
                ({request.buyerClassOrYear || request.buyerUniversity})
              </span>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-amber-600 ml-0.5">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{request.reputationScore.toFixed(1)}</span>
              </span>
            </div>

            <span className="text-[11px] text-[#9E928A] flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3" />
              <span>{request.sentTimeText}</span>
            </span>
          </div>
        </div>

        {/* Huy hiệu giờ hẹn nếu có */}
        {request.appointmentTime && (
          <span className="bg-[#006D3B] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase shrink-0 shadow-2xs tracking-wide">
            {request.appointmentTime}
          </span>
        )}
      </div>

      {/* 2. Bong bóng lời nhắn từ bạn học */}
      <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#EBE3D8] text-xs text-[#221A14] leading-relaxed italic font-body">
        &ldquo;{request.message}&rdquo;
      </div>

      {/* 3. Nút hành động (Chat ngay / Chốt giao dịch) */}
      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={() => onChat(request.id, request.buyerName)}
          className="px-3 py-1.5 rounded-lg border border-[#E6DACD] bg-white hover:bg-[#FAF6F0] text-xs font-semibold text-[#221A14] flex items-center gap-1.5 transition-all cursor-pointer active:scale-98"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#756A63]" />
          <span>Chat ngay</span>
        </button>

        {isScheduled && onConfirmHandover && (
          <button
            type="button"
            onClick={() => onConfirmHandover(request.id)}
            className="px-3.5 py-1.5 rounded-lg bg-[#006D3B] hover:bg-[#00552E] text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            <span>Chốt giao dịch</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BuyerRequestItem;
