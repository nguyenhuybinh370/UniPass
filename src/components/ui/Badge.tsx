import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'free' | 'neutral' | 'danger';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-[11px]';

  const variantClasses = {
    primary: 'bg-brand-50 text-brand-primary border border-orange-200/60',
    secondary: 'bg-secondary-50 text-secondary-500 border border-teal-200/60',
    free: 'bg-[#16A085] text-white shadow-warm-xs',
    neutral: 'bg-surface-announcement text-text-muted border border-border-card',
    danger: 'bg-rose-50 text-rose-600 border border-rose-200',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 font-bold rounded-pill tracking-wide select-none ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
