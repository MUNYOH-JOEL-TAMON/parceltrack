import React from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-xl';
    
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md focus-visible:ring-primary-500',
      secondary: 'bg-dark-800 text-white hover:bg-dark-900 shadow-sm hover:shadow-md focus-visible:ring-dark-700',
      outline: 'border-2 border-dark-200 bg-white hover:bg-gray-50 text-dark-900 focus-visible:ring-primary-500',
      ghost: 'hover:bg-gray-100 text-dark-700',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md focus-visible:ring-red-500',
    };
    
    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-10 px-5 text-[15px]',
      lg: 'h-12 px-6 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
