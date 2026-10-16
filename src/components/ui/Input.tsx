import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-text-primary">
            {label}
          </label>
        )}
        <div
          className={`flex items-center h-10 w-full rounded-xl border bg-surface-card px-3 transition-warm overflow-hidden focus-within:ring-2 focus-within:ring-brand-primary/15 ${
            error
              ? 'border-rose-500 focus-within:border-rose-500'
              : 'border-border-card focus-within:border-brand-primary'
          }`}
        >
          {leftIcon && <span className="mr-2 text-text-muted shrink-0">{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={`w-full h-full bg-transparent text-sm text-text-primary placeholder:text-text-disabled outline-none font-body ${className}`}
            {...props}
          />
          {rightIcon && <span className="ml-2 text-text-muted shrink-0">{rightIcon}</span>}
        </div>
        {error ? (
          <p className="text-xs text-rose-500 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-text-muted">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
