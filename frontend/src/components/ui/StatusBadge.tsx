import React from 'react';
import { ShipmentStatus } from '@/types';
import { Badge } from './Badge';
import { 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface StatusBadgeProps {
  status: ShipmentStatus;
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showIcon = true }) => {
  const getStatusLabel = (status: ShipmentStatus): string => {
    const labels: Record<ShipmentStatus, string> = {
      information_received: 'Information Received',
      pending_pickup: 'Pending Pickup',
      picked_up: 'Picked Up',
      in_transit: 'In Transit',
      customs_clearance: 'Customs Clearance',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered',
      delivery_attempted: 'Delivery Attempted',
      delayed: 'Delayed',
      exception: 'Exception',
      returned_to_sender: 'Returned to Sender',
      expired: 'Expired',
      unknown: 'Unknown',
    };
    return labels[status];
  };

  const getStatusIcon = (status: ShipmentStatus) => {
    const icons: Record<ShipmentStatus, React.ReactNode> = {
      information_received: <Package className="h-3.5 w-3.5" />,
      pending_pickup: <Clock className="h-3.5 w-3.5" />,
      picked_up: <Package className="h-3.5 w-3.5" />,
      in_transit: <Truck className="h-3.5 w-3.5" />,
      customs_clearance: <AlertCircle className="h-3.5 w-3.5" />,
      out_for_delivery: <MapPin className="h-3.5 w-3.5" />,
      delivered: <CheckCircle2 className="h-3.5 w-3.5" />,
      delivery_attempted: <AlertTriangle className="h-3.5 w-3.5" />,
      delayed: <Clock className="h-3.5 w-3.5" />,
      exception: <AlertCircle className="h-3.5 w-3.5" />,
      returned_to_sender: <XCircle className="h-3.5 w-3.5" />,
      expired: <XCircle className="h-3.5 w-3.5" />,
      unknown: <AlertCircle className="h-3.5 w-3.5" />,
    };
    return icons[status];
  };

  return (
    <Badge status={status} className="flex items-center gap-1.5">
      {showIcon && getStatusIcon(status)}
      {getStatusLabel(status)}
    </Badge>
  );
};
