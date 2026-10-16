import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Clock,
  Check,
  MapPin,
  ChevronDown,
  Sparkles,
  Zap,
} from 'lucide-react';
import { ProductItem } from '@/types/ui/freeCorner';
import { SubjectMarketSectionProps } from '@/types/ui/subjectMarket';
import {
  subjectMarketItems as defaultItems,
  subjectMarketTabs as defaultTabs,
} from '@/mocks/data/ui/subjectMarket';
import { formatCurrency } from '@/utils/formatCurrency';

export const SubjectMarketSection: React.FC<SubjectMarketSectionProps> = ({
  items = defaultItems,
  tabs = defaultTabs,
  onSelectProduct,
  onLoadMore,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [under50k, setUnder50k] = useState<boolean>(false);
  const [above90Condition, setAbove90Condition] = useState<boolean>(false);
  const [nearKhuB, setNearKhuB] = useState<boolean>(false);
  const [verifiedStudent, setVerifiedStudent] = useState<boolean>(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (activeTab === 'it-cs' && !['IT', 'CS'].includes(item.category)) return false;
      if (activeTab === 'ma-ph' && !['MA', 'PH'].includes(item.category)) return false;
      if (activeTab === 'econ' && !['LL', 'ECON'].includes(item.category)) return false;
      if (activeTab === 'lang-pe' && !['PE', 'LANG'].includes(item.category)) return false;

      if (under50k && item.price > 50000) return false;
      if (above90Condition && !item.conditionTag.includes('9')) return false;
      if (nearKhuB && !item.location.includes('Khu B')) return false;

      return true;
    });
  }, [items, activeTab, under50k, above90Condition, nearKhuB]);

  return (
    <section className="w-full" aria-labelledby="subject-market-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-brand-50 border border-orange-200/60 flex items-center justify-center text-brand-primary flex-shrink-0">
            <BookOpen className="w-5 h-5 stroke-[2.2]" />
          </div>
          <h2
            id="subject-market-title"
            className="font-heading font-bold text-[22px] sm:text-[24px] text-text-primary tracking-tight"
          >
            Thanh Lý Theo Mã Học Phần
          </h2>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill bg-surface-announcement border border-border-card text-[11px] font-medium text-text-muted">
            <Clock className="w-3 h-3 text-brand-primary" />
            <span>Cập nhật mỗi 5 phút</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pt-4 pb-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-pill text-xs font-semibold whitespace-nowrap transition-warm cursor-pointer ${
                isActive
                  ? 'bg-brand-primary text-white shadow-warm-xs'
                  : 'bg-surface-card border border-border-card text-text-primary hover:border-brand-primary/40 hover:bg-surface-announcement'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 text-xs">
        <span className="text-[11px] font-bold text-text-disabled tracking-wider uppercase whitespace-nowrap mr-1">
          LỌC NHANH:
        </span>

        <button
          type="button"
          onClick={() => setUnder50k(!under50k)}
          className={`flex items-center gap-1 px-3 py-1 rounded-pill text-xs font-medium transition-colors cursor-pointer whitespace-nowrap border ${
            under50k
              ? 'bg-brand-50 border-brand-primary text-brand-primary'
              : 'bg-surface-card border-border-card text-text-primary hover:border-brand-primary/50'
          }`}
        >
          <Zap className="w-3 h-3 text-accent-500" />
          <span>Dưới 50k</span>
        </button>

        <button
          type="button"
          onClick={() => setAbove90Condition(!above90Condition)}
          className={`flex items-center gap-1 px-3 py-1 rounded-pill text-xs font-medium transition-colors cursor-pointer whitespace-nowrap border ${
            above90Condition
              ? 'bg-brand-50 border-brand-primary text-brand-primary'
              : 'bg-surface-card border-border-card text-text-primary hover:border-brand-primary/50'
          }`}
        >
          <Sparkles className="w-3 h-3 text-brand-primary" />
          <span>Độ mới &gt; 90%</span>
        </button>

        <button
          type="button"
          onClick={() => setNearKhuB(!nearKhuB)}
          className={`flex items-center gap-1 px-3 py-1 rounded-pill text-xs font-medium transition-colors cursor-pointer whitespace-nowrap border ${
            nearKhuB
              ? 'bg-brand-50 border-brand-primary text-brand-primary'
              : 'bg-surface-card border-border-card text-text-primary hover:border-brand-primary/50'
          }`}
        >
          <MapPin className="w-3 h-3 text-brand-primary" />
          <span>Quanh KTX Khu B</span>
        </button>

        <button
          type="button"
          onClick={() => setVerifiedStudent(!verifiedStudent)}
          className={`flex items-center gap-1 px-3 py-1 rounded-pill text-xs font-medium transition-colors cursor-pointer whitespace-nowrap border ${
            verifiedStudent
              ? 'bg-secondary-50 border-secondary-500 text-secondary-500'
              : 'bg-surface-card border-border-card text-text-primary hover:border-secondary-500/50'
          }`}
        >
          <Check className="w-3.5 h-3.5 text-secondary-500 stroke-[3]" />
          <span>Đã xác thực MSSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
        {filteredItems.map((product: ProductItem) => (
          <article
            key={product.id}
            onClick={() => onSelectProduct?.(product)}
            className="group bg-surface-card border border-border-card rounded-2xl overflow-hidden shadow-warm-xs hover:shadow-warm-md hover-lift transition-warm flex flex-col justify-between cursor-pointer"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-surface-muted">
              <img
                src={product.imageUrl}
                alt={product.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-warm duration-300"
              />

              <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 badge-condition-overlay text-[11px] font-medium backdrop-blur-xs">
                {product.conditionTag}
              </span>

              {product.subjectCode && (
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-pill bg-surface-announcement/90 border border-border-card text-brand-primary text-[11px] font-bold shadow-warm-xs backdrop-blur-xs">
                  {product.subjectCode}
                </span>
              )}
            </div>

            <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
              <div>
                <h3
                  title={product.title}
                  className="font-heading font-bold text-[14px] text-text-primary line-clamp-2 min-h-[40px] leading-snug group-hover:text-brand-primary transition-colors"
                >
                  {product.title}
                </h3>

                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-[16px] font-bold text-brand-primary">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-text-disabled line-through font-body">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-border-divider mt-3 pt-2.5 flex items-center justify-between text-xs text-text-muted">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                  <span className="truncate">{product.location}</span>
                </div>
                <span className="text-[11px] text-text-disabled">
                  {product.seller.school}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onLoadMore}
          className="h-[44px] px-6 rounded-xl bg-surface-card border border-border-card hover:border-brand-primary text-text-primary hover:text-brand-primary text-sm font-semibold flex items-center gap-2 shadow-warm-xs hover-lift transition-warm cursor-pointer active:scale-98"
        >
          <span>Xem thêm 180+ giáo trình và đồ dùng khác</span>
          <ChevronDown className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>
    </section>
  );
};
