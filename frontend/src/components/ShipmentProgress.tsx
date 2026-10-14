import React from 'react';
import { ShipmentStatus } from '@/types';
import { Package, Truck, MapPin, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ShipmentProgressProps {
  status: ShipmentStatus;
}

export const ShipmentProgress: React.FC<ShipmentProgressProps> = ({ status }) => {
  const milestones = [
    { key: 'registered', label: 'Registered', icon: Package },
    { key: 'picked_up', label: 'Picked Up', icon: Package },
    { key: 'in_transit', label: 'In Transit', icon: Truck },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2 },
  ];

  const getStepStatus = (milestoneKey: string): 'completed' | 'active' | 'pending' => {
    const statusProgression = [
      'information_received',
      'pending_pickup',
      'picked_up',
      'in_transit',
      'customs_clearance',
      'out_for_delivery',
      'delivered',
    ];

    const milestoneMap: Record<string, string[]> = {
      registered: ['information_received', 'pending_pickup'],
      picked_up: ['picked_up'],
      in_transit: ['in_transit', 'customs_clearance'],
      out_for_delivery: ['out_for_delivery'],
      delivered: ['delivered'],
    };

    const currentIndex = statusProgression.indexOf(status);
    const milestoneStatuses = milestoneMap[milestoneKey] || [];
    const milestoneIndex = Math.min(
      ...milestoneStatuses.map(s => statusProgression.indexOf(s)).filter(i => i !== -1)
    );

    if (currentIndex >= milestoneIndex && milestoneStatuses.includes(status)) {
      return 'active';
    }
    if (currentIndex > milestoneIndex) {
      return 'completed';
    }
    return 'pending';
  };

  // Handle exception cases
  const isException = ['exception', 'delayed', 'delivery_attempted', 'returned_to_sender', 'expired'].includes(status);

  return (
    <div className="py-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-border -z-10" />
        <div
          className="absolute top-6 left-0 h-0.5 bg-primary-600 -z-10 transition-all duration-500"
          style={{
            width: isException ? '0%' : `${(milestones.filter(m => getStepStatus(m.key) === 'completed').length / (milestones.length - 1)) * 100}%`
          }}
        />

        {milestones.map((milestone, index) => {
          const stepStatus = getStepStatus(milestone.key);
          const Icon = milestone.icon;

          return (
            <div key={milestone.key} className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300',
                  stepStatus === 'completed' && 'bg-status-success text-white',
                  stepStatus === 'active' && 'bg-primary-600 text-white ring-4 ring-primary-200',
                  stepStatus === 'pending' && 'bg-gray-200 text-text-secondary',
                  isException && stepStatus === 'active' && 'bg-status-warning ring-status-warning/20'
                )}
              >
                {stepStatus === 'completed' ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <Icon className="h-6 w-6" />
                )}
              </div>
              <span
                className={cn(
                  'text-xs font-medium text-center hidden sm:block',
                  (stepStatus === 'completed' || stepStatus === 'active') && 'text-text-primary',
                  stepStatus === 'pending' && 'text-text-secondary'
                )}
              >
                {milestone.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Labels */}
      <div className="sm:hidden mt-4 flex justify-between text-xs">
        {milestones.map((milestone) => {
          const stepStatus = getStepStatus(milestone.key);
          return (
            <span
              key={milestone.key}
              className={cn(
                'text-center flex-1',
                (stepStatus === 'completed' || stepStatus === 'active') && 'text-text-primary font-medium',
                stepStatus === 'pending' && 'text-text-secondary'
              )}
            >
              {milestone.label.split(' ')[0]}
            </span>
          );
        })}
      </div>
    </div>
  );
};
