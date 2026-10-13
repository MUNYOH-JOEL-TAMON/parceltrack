import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = 'Something went wrong', 
  message, 
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-status-error-bg p-4 mb-4">
        <AlertCircle className="h-8 w-8 text-status-error" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary max-w-md mb-6">{message}</p>
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  );
};
