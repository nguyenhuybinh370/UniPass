import React, { useState } from 'react';
import { QrCode, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { QuickHandoverQrCardProps } from '../../types';

export const QuickHandoverQrCard: React.FC<QuickHandoverQrCardProps> = ({
  postCode,
  qrHandoverCode: _qrHandoverCode,
  className = '',
}) => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // SVG QR Code graphic with standard corner finder patterns and realistic data module grid
  const renderQrSvg = (size = 68) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#221A14]"
    >
      {/* Background */}
      <rect width="29" height="29" fill="white" />

      {/* Top-Left Finder */}
      <rect x="2" y="2" width="7" height="7" fill="currentColor" />
      <rect x="3" y="3" width="5" height="5" fill="white" />
      <rect x="4" y="4" width="3" height="3" fill="currentColor" />

      {/* Top-Right Finder */}
      <rect x="20" y="2" width="7" height="7" fill="currentColor" />
      <rect x="21" y="3" width="5" height="5" fill="white" />
      <rect x="22" y="4" width="3" height="3" fill="currentColor" />

      {/* Bottom-Left Finder */}
      <rect x="2" y="20" width="7" height="7" fill="currentColor" />
      <rect x="3" y="21" width="5" height="5" fill="white" />
      <rect x="4" y="22" width="3" height="3" fill="currentColor" />

      {/* Timing and data pattern dots */}
      <rect x="11" y="3" width="1" height="1" fill="currentColor" />
      <rect x="13" y="3" width="1" height="1" fill="currentColor" />
      <rect x="15" y="3" width="1" height="1" fill="currentColor" />
      <rect x="17" y="3" width="1" height="1" fill="currentColor" />

      <rect x="3" y="11" width="1" height="1" fill="currentColor" />
      <rect x="5" y="11" width="1" height="1" fill="currentColor" />
      <rect x="7" y="11" width="1" height="1" fill="currentColor" />

      <rect x="11" y="11" width="2" height="2" fill="currentColor" />
      <rect x="15" y="11" width="2" height="1" fill="currentColor" />
      <rect x="12" y="15" width="2" height="2" fill="currentColor" />
      <rect x="16" y="14" width="2" height="2" fill="currentColor" />

      <rect x="11" y="18" width="1" height="2" fill="currentColor" />
      <rect x="14" y="19" width="2" height="1" fill="currentColor" />
      <rect x="18" y="17" width="2" height="2" fill="currentColor" />
      <rect x="22" y="12" width="1" height="3" fill="currentColor" />
      <rect x="25" y="14" width="2" height="1" fill="currentColor" />
      <rect x="21" y="18" width="2" height="2" fill="currentColor" />
      <rect x="25" y="20" width="2" height="2" fill="currentColor" />
      <rect x="12" y="23" width="2" height="2" fill="currentColor" />
      <rect x="16" y="22" width="2" height="2" fill="currentColor" />
      <rect x="22" y="24" width="2" height="2" fill="currentColor" />
    </svg>
  );

  return (
    <>
      <div
        className={`w-full bg-white rounded-2xl border border-[#E6DACD] p-5 flex items-center gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className}`}
      >
        {/* Khung QR bên trái */}
        <div
          onClick={() => setIsQrModalOpen(true)}
          className="p-2.5 rounded-xl border border-[#E6DACD] bg-white shrink-0 cursor-pointer hover:border-[#D35400] transition-colors hover:shadow-xs group relative"
          title="Bấm để xem QR kích thước lớn"
        >
          {renderQrSvg(64)}
          <div className="absolute inset-0 bg-[#221A14]/0 group-hover:bg-[#221A14]/10 rounded-xl transition-colors flex items-center justify-center">
            <QrCode className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
          </div>
        </div>

        {/* Nội dung bên phải */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#006D3B]" />
            <h4 className="font-heading font-bold text-sm text-[#221A14]">
              Mã QR xác nhận tại sảnh KTX
            </h4>
          </div>
          <p className="text-xs text-[#756A63] mt-1 leading-relaxed font-body">
            Người mua quét mã khi nhận sách để hệ thống cộng{' '}
            <strong className="text-[#006D3B] font-semibold">+10 điểm uy tín</strong>{' '}
            và tự động lưu trữ tin hoàn tất.
          </p>
        </div>
      </div>

      {/* Modal hiển thị mã QR kích thước lớn để người mua quét */}
      {isQrModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-2xl shadow-warm-lg p-6 flex flex-col items-center text-center gap-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-between items-center">
              <span className="font-heading font-bold text-sm text-[#D35400] uppercase tracking-wide">
                XÁC NHẬN BÀN GIAO KTX
              </span>
              <button
                type="button"
                onClick={() => setIsQrModalOpen(false)}
                className="text-[#756A63] hover:text-[#221A14] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-[#D35400]/40 shadow-xs">
              {renderQrSvg(180)}
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-heading font-bold text-base text-[#221A14]">
                Mã tin: {postCode}
              </span>
              <p className="text-xs text-[#756A63] leading-relaxed">
                Đưa mã này cho người mua quét tại Sảnh KTX để tự động đánh dấu hoàn tất và tích lũy +10 điểm uy tín.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#006D3B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Đã hiểu</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickHandoverQrCard;
