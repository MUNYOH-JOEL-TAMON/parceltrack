import React from 'react';
import { TrackingEvent } from '@/types';
import { formatDateTime, formatTimeAgo } from '@/utils/formatDate';
import { 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  Clock
} from 'lucide-react';

interface TrackingTimelineProps {
  events: TrackingEvent[];
}

export const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ events }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="h-5 w-5 text-status-success" />;
      case 'out_for_delivery':
        return <MapPin className="h-5 w-5 text-primary-600" />;
      case 'in_transit':
        return <Truck className="h-5 w-5 text-primary-600" />;
      case 'exception':
      case 'delayed':
        return <AlertCircle className="h-5 w-5 text-status-warning" />;
      case 'picked_up':
        return <Package className="h-5 w-5 text-primary-600" />;
      default:
        return <Clock className="h-5 w-5 text-text-secondary" />;
    }
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-text-secondary">
        No tracking events available yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={event._id} className="flex gap-4">
          {/* Timeline Line */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-50 border-2 border-primary-600">
              {getStatusIcon(event.status)}
            </div>
            {index < events.length - 1 && (
              <div className="w-0.5 h-full min-h-[3rem] bg-border" />
            )}
          </div>

          {/* Event Content */}
          <div className="flex-1 pb-6">
            <div className="bg-white rounded-xl border border-border p-4 hover:shadow-soft transition-shadow">
              <h4 className="font-semibold text-text-primary mb-1">
                {event.description}
              </h4>
              {event.location && (
                <p className="text-sm text-text-secondary mb-2 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {event.location}
                </p>
              )}
              <div className="flex items-center gap-4 text-xs text-text-secondary">
                <span>{formatDateTime(event.timestamp)}</span>
                <span className="text-primary-600">{formatTimeAgo(event.timestamp)}</span>
              </div>
              {event.courierStatus && (
                <p className="text-xs text-text-secondary mt-2 italic">
                  Courier status: {event.courierStatus}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
