import React from 'react';
import { Gift, HeartHandshake, ArrowRight, MapPin } from 'lucide-react';
import { FreeCornerSectionProps, ProductItem } from '@/types/ui/freeCorner';
import { freeCornerItems as defaultItems } from '@/mocks/data/ui/freeCorner';
import { formatCurrency } from '@/utils/formatCurrency';

export const FreeCornerSection: React.FC<FreeCornerSectionProps> = ({
  items = defaultItems,
  onViewAll,
  onClaimItem,
}) => {
  return (
    <section
      className="bg-free-corner rounded-3xl p-7 sm:p-8 transition-warm"
      aria-labelledby="free-corner-title"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-secondary-500/10 text-secondary-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Gift className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h2
              id="free-corner-title"
              className="font-heading font-bold text-[22px] sm:text-[24px] text-text-primary leading-tight"
            >
              Góc Trao Tặng 0đ
            </h2>
            <p className="font-body text-xs sm:text-sm text-text-muted mt-1">
              Đồ dùng và tài liệu học tập được anh chị khóa trên gửi tặng miễn phí cho tân sinh viên khó khăn.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="self-start sm:self-center text-sm font-bold text-secondary-500 hover:text-secondary-600 hover:underline flex items-center gap-1 transition-colors flex-shrink-0 cursor-pointer"
        >
          <span>Xem tất cả (128 đồ 0đ)</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Grid 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {items.map((item: ProductItem) => {
          const initial = item.seller.name.charAt(0);
          return (
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

                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-pill bg-[#16A085] text-white text-[11px] font-bold shadow-warm-xs tracking-wide">
                  🎁 TẶNG 0Đ
                </span>

                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 badge-condition-overlay text-[11px] font-medium backdrop-blur-xs">
                  {item.conditionTag}
                </span>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3
                    title={item.title}
                    className="font-heading font-bold text-[14px] text-text-primary line-clamp-2 min-h-[40px] leading-snug group-hover:text-secondary-500 transition-colors"
                  >
                    {item.title}
                  </h3>

                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-[16px] font-bold text-secondary-500">
                      {formatCurrency(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-text-disabled line-through">
                        {formatCurrency(item.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-border-divider my-3" />

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 truncate">
                      <div className="w-6 h-6 rounded-full bg-secondary-50 text-secondary-500 text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                        {initial}
                      </div>
                      <span className="font-semibold text-text-primary truncate">
                        {item.seller.name} ({item.seller.school})
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-text-muted flex-shrink-0">
                      <MapPin className="w-3 h-3 text-text-muted" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onClaimItem?.(item)}
                    className="w-full h-[32px] rounded-xl bg-secondary-500 hover:bg-secondary-600 active:scale-98 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-warm mt-3 cursor-pointer shadow-warm-xs"
                  >
                    <HeartHandshake className="w-3.5 h-3.5 stroke-[2.2]" />
                    <span>Nhận tặng đồ</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
