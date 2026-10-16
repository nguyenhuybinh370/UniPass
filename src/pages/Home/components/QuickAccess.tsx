import React from 'react';
import {
  Gift,
  Repeat,
  FileText,
  Zap,
  Calculator,
  Cpu,
  Building2,
  Trophy,
} from 'lucide-react';
import { QuickAccessProps, QuickAccessItem } from '@/types/ui/quickAccess';
import { quickAccessItems as defaultItems } from '@/mocks/data/ui/quickAccess';

export const QuickAccess: React.FC<QuickAccessProps> = ({
  items = defaultItems,
  onItemClick,
}) => {
  const renderIcon = (iconName: string, colorClass = '') => {
    const props = { className: `w-5 h-5 ${colorClass}` };
    switch (iconName) {
      case 'gift':
        return <Gift {...props} />;
      case 'repeat':
        return <Repeat {...props} />;
      case 'file-text':
        return <FileText {...props} />;
      case 'zap':
        return <Zap {...props} />;
      case 'calculator':
        return <Calculator {...props} />;
      case 'cpu':
        return <Cpu {...props} />;
      case 'building-2':
        return <Building2 {...props} />;
      case 'trophy':
        return <Trophy {...props} />;
      default:
        return <FileText {...props} />;
    }
  };

  return (
    <section aria-label="Truy cập nhanh danh mục">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {items.map((item: QuickAccessItem) => {
          const bgClass = item.bgClass || 'bg-brand-50';
          const colorClass = item.colorClass || 'text-brand-primary';

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onItemClick?.(item)}
              className="group flex flex-col items-center justify-center text-center bg-surface-card border border-orange-50 rounded-2xl py-4 px-2 shadow-warm-xs hover:shadow-warm-md hover-lift transition-warm cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            >
              <div
                className={`w-[44px] h-[44px] rounded-2xl flex items-center justify-center mb-2.5 transition-warm group-hover:scale-105 ${bgClass}`}
              >
                {renderIcon(item.icon, colorClass)}
              </div>

              <span className="text-[13px] font-bold text-text-primary leading-tight mb-0.5 line-clamp-1 group-hover:text-brand-primary transition-colors">
                {item.title}
              </span>

              <span className="text-[11px] text-text-muted line-clamp-1 font-body">
                {item.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
