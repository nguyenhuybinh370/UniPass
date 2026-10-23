import React from 'react';
import { MapPin, Building2, Calendar, ShieldCheck, ExternalLink } from 'lucide-react';
import { PostHandoverLocationProps } from '../../types';

export const PostHandoverLocation: React.FC<PostHandoverLocationProps> = ({
  handover,
  className = '',
}) => {
  return (
    <div
      className={`w-full bg-white rounded-2xl border border-[#E6DACD] p-5 sm:p-6 flex flex-col gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className}`}
    >
      {/* 1. Header Thẻ địa điểm bàn giao */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#D35400] shrink-0" />
          <h3 className="font-heading font-bold text-base text-[#221A14]">
            Địa điểm & Cách thức bàn giao KTX
          </h3>
        </div>

        {handover.isFreeDelivery && (
          <span className="bg-[#E8F5E9] text-[#006D3B] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#A3E9B8]">
            Miễn phí giao tận nơi
          </span>
        )}
      </div>

      {/* 2. Khối tòa nhà KTX & nút xem bản đồ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#FFF8F3] border border-[#F6D2BD]/60">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFF1E9] border border-[#F6D2BD] flex items-center justify-center shrink-0 text-[#D35400]">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="font-heading font-bold text-sm text-[#221A14]">
              {handover.buildingName}
            </h4>
            <p className="text-xs text-[#756A63] mt-0.5 leading-relaxed">
              {handover.address}
            </p>
          </div>
        </div>

        {handover.mapUrl && (
          <a
            href={handover.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto shrink-0 bg-white hover:bg-[#FAF6F0] text-[#D35400] border border-[#F6D2BD] text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <span>Xem bản đồ</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* 3. Khung giờ hẹn thuận tiện */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EBE3D8] flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-white border border-[#E6DACD] flex items-center justify-center shrink-0 text-[#756A63]">
          <Calendar className="w-4 h-4" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-[#221A14] font-heading">
            Khung giờ hẹn thuận tiện:
          </span>
          <p className="text-xs text-[#756A63] mt-0.5 leading-relaxed">
            {handover.preferredTime}
          </p>
        </div>
      </div>

      {/* 4. Hộp Cam kết văn hóa an toàn SinhVienPass */}
      <div className="p-4 rounded-xl bg-[#FFFBF0] border border-[#FDE3B5] flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#FDF3E1] border border-[#F6D2BD] flex items-center justify-center shrink-0 text-[#D35400]">
          <ShieldCheck className="w-4 h-4 text-[#D35400]" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-[#9E3D00] font-heading flex items-center gap-1.5">
            Cam kết văn hóa an toàn SinhVienPass
          </span>
          <p className="text-xs text-[#756A63] mt-1 leading-relaxed">
            {handover.safeCommitmentText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostHandoverLocation;
