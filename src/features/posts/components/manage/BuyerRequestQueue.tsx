import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, RotateCcw, ArrowRight } from 'lucide-react';
import { BuyerRequestQueueProps } from '../../types';
import { BuyerRequestItem } from './BuyerRequestItem';

export const BuyerRequestQueue: React.FC<BuyerRequestQueueProps> = ({
  requests,
  totalConversationsCount,
  onChat,
  onConfirmHandover,
  onRefresh,
  isRefreshing = false,
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`w-full bg-white rounded-2xl border border-[#E6DACD] p-5 sm:p-6 flex flex-col gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className}`}
    >
      {/* 1. Header Hàng đợi bạn học */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#D35400]" />
          <h3 className="font-heading font-bold text-base text-[#221A14]">
            Bạn học quan tâm
          </h3>
          <span className="bg-[#FDF3E1] text-[#D35400] text-xs font-bold px-2 py-0.5 rounded-full border border-[#F6D2BD]">
            {requests.length} yêu cầu mới
          </span>
        </div>

        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-1.5 rounded-lg text-[#756A63] hover:text-[#221A14] hover:bg-[#FAF6F0] transition-colors cursor-pointer disabled:opacity-50"
            aria-label="Làm mới hàng đợi"
          >
            <RotateCcw
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#D35400]' : ''}`}
            />
          </button>
        )}
      </div>

      {/* 2. Danh sách các yêu cầu */}
      <div className="flex flex-col gap-3">
        {requests.map((req) => (
          <BuyerRequestItem
            key={req.id}
            request={req}
            onChat={onChat}
            onConfirmHandover={onConfirmHandover}
          />
        ))}
      </div>

      {/* 3. Chân danh sách: Xem toàn bộ hội thoại */}
      <button
        type="button"
        onClick={() => navigate('/chat')}
        className="w-full pt-3 pb-1 border-t border-[#F3E9DD] text-center text-xs font-bold text-[#D35400] hover:text-[#9E3D00] flex items-center justify-center gap-1.5 transition-colors cursor-pointer group"
      >
        <span>Xem toàn bộ {totalConversationsCount} hội thoại tin nhắn</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default BuyerRequestQueue;
