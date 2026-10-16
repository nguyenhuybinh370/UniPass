import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-warm select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/20 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2.5',
  }[size];

  const variantClasses = {
    primary: 'bg-brand-primary hover:bg-brand-600 text-white shadow-warm-xs',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-warm-xs',
    outline: 'border border-border-card bg-surface-card hover:bg-surface-announcement text-text-primary hover:border-brand-primary/50',
    ghost: 'hover:bg-surface-announcement text-text-primary',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-warm-xs',
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default Button;
