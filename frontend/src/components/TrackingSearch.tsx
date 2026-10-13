import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button, Input, Select } from '@/components/ui';

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
      <div className={`flex flex-col gap-4 ${isLarge ? 'max-w-3xl' : 'max-w-2xl'}`}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              error={error}
              className={isLarge ? 'h-12 text-base' : ''}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              options={courierOptions}
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
              className={isLarge ? 'h-12' : ''}
            />
          </div>
          <Button
            type="submit"
            size={isLarge ? 'lg' : 'md'}
            className="sm:w-auto"
          >
            <Search className="h-5 w-5 mr-2" />
            Track Package
          </Button>
        </div>
        {isLarge && (
          <p className="text-sm text-text-secondary">
            Find your tracking number on your shipping receipt or confirmation email
          </p>
        )}
      </div>
    </form>
  );
};
