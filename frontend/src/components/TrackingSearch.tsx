import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface TrackingSearchProps {
  size?: 'default' | 'large';
}

export const TrackingSearch: React.FC<TrackingSearchProps> = ({ size = 'default' }) => {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [courier, setCourier] = useState('auto');
  const [error, setError] = useState('');

  const courierOptions = [
    { value: 'auto', label: 'Auto-detect Courier' },
    { value: 'dhl', label: 'DHL' },
    { value: 'fedex', label: 'FedEx' },
    { value: 'ups', label: 'UPS' },
    { value: 'usps', label: 'USPS' },
    { value: 'aramex', label: 'Aramex' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    // Navigate to tracking results page
    const params = new URLSearchParams({
      number: trackingNumber.trim(),
      ...(courier !== 'auto' && { courier }),
    });
    navigate(`/track?${params.toString()}`);
  };

  const isLarge = size === 'large';

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex flex-col gap-3 ${isLarge ? 'max-w-2xl' : 'max-w-xl'}`}>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter tracking number..."
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className={cn(
              'flex-1 min-w-0 px-4 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200 outline-none',
              isLarge ? 'py-3.5 text-base' : 'py-2.5 text-sm',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-100'
            )}
          />
          <select
            value={courier}
            onChange={(e) => setCourier(e.target.value)}
            className={cn(
              'px-4 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200 outline-none bg-white flex-shrink-0',
              isLarge ? 'py-3.5 text-base sm:w-52' : 'py-2.5 text-sm sm:w-44'
            )}
          >
            {courierOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className={cn(
              'bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 flex-shrink-0 whitespace-nowrap',
              isLarge ? 'px-6 sm:px-8 py-3.5 text-base' : 'px-5 sm:px-6 py-2.5 text-sm'
            )}
          >
            <Search className="h-5 w-5" />
            Track Package
          </button>
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {isLarge && !error && (
          <p className="text-sm text-dark-500">
            Find your tracking number on your shipping receipt or confirmation email
          </p>
        )}
      </div>
    </form>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
