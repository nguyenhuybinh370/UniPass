import React from 'react';
import { Repeat, ArrowRight, MapPin } from 'lucide-react';
import { BarterSectionProps, BarterItem } from '@/types/ui/barter';
import { barterItems as defaultItems } from '@/mocks/data/ui/barter';

export const BarterSection: React.FC<BarterSectionProps> = ({
  items = defaultItems,
  onViewRoom,
  onSendOffer,
}) => {
  return (
    <section
      className="bg-barter-section rounded-3xl p-7 sm:p-8 transition-warm"
      aria-labelledby="barter-section-title"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center flex-shrink-0 mt-0.5">
            <Repeat className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h2
              id="barter-section-title"
              className="font-heading font-bold text-[22px] sm:text-[24px] text-text-primary leading-tight"
            >
              Đề Xuất Trao Đổi Ngang
            </h2>
            <p className="font-body text-xs sm:text-sm text-text-muted mt-1">
              Dùng đồ bạn có đổi lấy đồ bạn cần — Tương tác trực tiếp không qua trung gian tiền tệ.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewRoom}
          className="self-start sm:self-center text-sm font-bold text-brand-primary hover:text-brand-600 hover:underline flex items-center gap-1 transition-colors flex-shrink-0 cursor-pointer"
        >
          <span>Xem phòng đổi đồ (56 lượt)</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Grid 4 Barter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {items.map((item: BarterItem) => (
          <article
            key={item.id}
            className="group bg-surface-card border border-border-card rounded-2xl overflow-hidden shadow-warm-xs hover:shadow-warm-md hover-lift transition-warm flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-muted">
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-warm duration-300"
              />

              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-pill bg-brand-primary text-white text-[11px] font-bold shadow-warm-xs tracking-wide flex items-center gap-1">
                🔄 ĐỔI ĐỒ
              </span>

              <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 badge-condition-overlay text-[11px] font-medium backdrop-blur-xs">
                {item.conditionTag}
              </span>
            </div>

            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <h3
                  title={item.title}
                  className="font-heading font-bold text-[14px] text-text-primary line-clamp-2 min-h-[40px] leading-snug group-hover:text-brand-primary transition-colors"
                >
                  {item.title}
                </h3>

                <div className="box-barter-dashed mt-2.5">
                  <div className="text-[12px] font-bold text-brand-primary flex items-center gap-1">
                    <span>🔄 Cần đổi:</span>
                  </div>
                  <p className="text-[12px] text-text-primary mt-1 leading-snug line-clamp-2 font-medium">
                    {item.neededItemDescription}
                  </p>
                </div>
              </div>

              <div className="border-t border-border-divider my-3" />

              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-text-primary truncate">
                    {item.sellerName} ({item.sellerSchool}) ⭐ {item.sellerRating.toFixed(1)}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-text-muted flex-shrink-0">
                    <MapPin className="w-3 h-3 text-text-muted" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSendOffer?.(item)}
                  className="w-full h-[34px] rounded-xl border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-50 active:scale-98 text-xs font-semibold flex items-center justify-center gap-1.5 transition-warm mt-3 cursor-pointer"
                >
                  <Repeat className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Gửi đề xuất đổi</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
