import React from 'react';
import { Search, Gift } from 'lucide-react';
import { HeroBannerProps } from '@/types/ui/heroBanner';

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title = 'Dọn Ký Túc Xá – Sang Tay Giáo Trình',
  description = 'Trao đổi sách cũ, tặng đồ dùng 0đ cho khóa dưới — Tiết kiệm chi phí, văn minh ký túc xá & an toàn tuyệt đối trong khuôn viên ĐHQG.',
  onSearchCourseCode,
  onExploreFreeCorner,
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border-card shadow-warm-sm min-h-[340px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between bg-hero-gradient">
      {/* Nội dung bên trái */}
      <div className="relative z-10 max-w-[576px] flex flex-col items-start">
        <h1 className="font-heading font-bold text-[32px] sm:text-[36px] md:text-[40px] text-text-primary tracking-tight leading-[1.1]">
          {title}
        </h1>

        <p className="font-body text-[15px] sm:text-[16px] text-text-muted mt-4 leading-relaxed">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
          <button
            type="button"
            onClick={onSearchCourseCode}
            className="h-[48px] px-6 rounded-xl bg-brand-primary hover:bg-brand-600 active:scale-98 text-white text-[15px] font-semibold flex items-center gap-2 shadow-warm-sm hover-lift transition-warm cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Tìm theo Mã Môn Học</span>
          </button>

          <button
            type="button"
            onClick={onExploreFreeCorner}
            className="h-[48px] px-6 rounded-xl bg-surface-card border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-50 active:scale-98 text-[15px] font-semibold flex items-center gap-2 shadow-warm-xs hover-lift transition-warm cursor-pointer"
          >
            <Gift className="w-4 h-4 stroke-[2.5]" />
            <span>Xem góc tặng 0đ</span>
          </button>
        </div>
      </div>

      {/* Hình họa trang trí bên phải */}
      <div
        className="pointer-events-none mt-8 md:mt-0 md:absolute md:right-8 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center opacity-20"
        aria-hidden="true"
      >
        <svg
          width="320"
          height="280"
          viewBox="0 0 320 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-brand-primary select-none"
        >
          <path d="M160 50 L160 230" strokeWidth="3.5" strokeLinecap="round" />
          <path
            d="M160 60 C120 40, 60 45, 30 70 L30 220 C60 195, 120 190, 160 210"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M160 70 C125 55, 75 60, 40 85 L40 225 C75 200, 125 195, 160 215"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M160 60 C200 40, 260 45, 290 70 L290 220 C260 195, 200 190, 160 210"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M160 70 C195 55, 245 60, 280 85 L280 225 C245 200, 195 195, 160 215"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M160 210 C155 235, 150 250, 165 265 L175 255 L185 265 C175 245, 165 230, 160 210"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M60 110 C90 100, 120 105, 145 118" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <path d="M60 140 C90 130, 120 135, 145 148" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <path d="M175 118 C200 105, 230 100, 260 110" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <path d="M175 148 C200 135, 230 130, 260 140" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <circle cx="160" cy="30" r="3" className="fill-brand-primary" />
          <path d="M260 35 L263 43 L271 45 L265 51 L266 59 L260 55 L254 59 L255 51 L249 45 L257 43 Z" strokeWidth="1.5" />
          <path d="M50 45 L52 50 L57 51 L53 55 L54 60 L50 57 L46 60 L47 55 L43 51 L48 50 Z" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  );
};
