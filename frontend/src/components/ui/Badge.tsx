import React from 'react';
import { cn } from '@/utils/cn';
import { ShipmentStatus } from '@/types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  status?: ShipmentStatus;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant, status, className }) => {
  const getStatusVariant = (status: ShipmentStatus): 'default' | 'success' | 'warning' | 'error' | 'info' => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'out_for_delivery':
      case 'in_transit':
      case 'picked_up':
        return 'info';
      case 'delayed':
      case 'delivery_attempted':
        return 'warning';
      case 'exception':
      case 'returned_to_sender':
      case 'expired':
        return 'error';
      default:
        return 'default';
    }
  };

  const effectiveVariant = status ? getStatusVariant(status) : variant || 'default';

  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-50 text-green-700',
    warning: 'bg-yellow-50 text-yellow-700',
    error: 'bg-red-50 text-red-700',
    info: 'bg-blue-50 text-blue-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg px-3 py-1 text-xs font-semibold',
        variants[effectiveVariant],
        className
      )}
    >
      {children}
    </span>
  );
};
