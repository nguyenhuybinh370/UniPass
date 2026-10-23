import React, { useState } from 'react';
import { ZoomIn, Sparkles, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PostImageGalleryProps } from '../../types';

export const PostImageGallery: React.FC<PostImageGalleryProps> = ({
  images,
  conditionPercent,
  curriculumBadgeText,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeImage = images[activeIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className={`w-full bg-white rounded-2xl border border-[#E6DACD] p-4 sm:p-5 flex flex-col gap-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className}`}
    >
      {/* 1. Khung ảnh lớn chính */}
      <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#FAF6F0] border border-[#E6DACD] group">
        <img
          src={activeImage?.url}
          alt={activeImage?.label || 'Ảnh sách chi tiết'}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
        />

        {/* Watermark kiểm định góc trên bên trái */}
        <div className="absolute top-3 left-3 bg-[#006D3B]/90 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
          <Check className="w-3.5 h-3.5 text-white" />
          <span>{curriculumBadgeText}</span>
        </div>

        {/* Nút Phóng to ảnh góc trên bên phải */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#221A14] backdrop-blur-xs flex items-center justify-center transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Phóng to ảnh"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Overlay Độ mới thực tế góc dưới bên trái */}
        <div className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-xs text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Độ mới thực tế: {conditionPercent}%</span>
        </div>
      </div>

      {/* 2. Dãy 4 ảnh thumbnails bên dưới */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
        {images.map((img, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden border transition-all cursor-pointer group ${
                isActive
                  ? 'ring-2 ring-[#9E3D00] ring-offset-2 border-transparent scale-[1.02]'
                  : 'border-[#E6DACD] hover:border-[#9E3D00]/50 opacity-80 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={img.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              {/* Lớp phủ đen mờ chân ảnh + nhãn */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-3 pb-1 px-1 text-center">
                <span className="text-[10px] sm:text-xs font-medium text-white truncate block">
                  {img.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Lightbox Phóng to xem ảnh chi tiết */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/25 transition-all cursor-pointer"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Large image in modal */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage?.url}
              alt={activeImage?.label}
              className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
            />
            <div className="text-center text-white">
              <p className="font-semibold text-base">{activeImage?.label}</p>
              {activeImage?.caption && (
                <p className="text-xs text-white/70 mt-0.5">{activeImage.caption}</p>
              )}
            </div>
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/25 transition-all cursor-pointer"
            aria-label="Ảnh sau"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PostImageGallery;
