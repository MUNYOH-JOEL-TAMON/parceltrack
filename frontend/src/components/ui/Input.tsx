import React from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-dark-900 mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'flex h-11 w-full rounded-xl border bg-white px-4 py-2.5 text-[15px]',
            'placeholder:text-dark-400',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
            'transition-all duration-200',
            error 
              ? 'border-red-500 focus-visible:ring-red-100 focus-visible:border-red-500' 
              : 'border-dark-200 focus-visible:ring-primary-100 focus-visible:border-primary-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-dark-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
