import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import {
  Card,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  StatusBadge,
  TableSkeleton,
  EmptyState,
  Select,
} from '@/components/ui';
import { statsService } from '@/services/api';
import { formatDateTime } from '@/utils/formatDate';
import { Activity, MapPin } from 'lucide-react';

interface ActivityEvent {
  _id: string;
  description: string;
  location?: string;
  timestamp: string;
  status: any;
  trackingNumber: string;
  courier?: any;
}

export const TrackingEventsPage: React.FC = () => {
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await statsService.getRecentActivity();
      setEvents(response.data.data || []);
    } catch (error) {
      console.error('Error fetching activity events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'exception') {
      return ['exception', 'delayed', 'delivery_attempted'].includes(event.status);
    }
    return event.status === statusFilter;
  });

  return (
    <AdminLayout title="Tracking Events">
      <div className="space-y-6">
        {/* Filters */}
        <Card padding="sm">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-text-secondary">Filter by status:</span>
            <Select
              options={[
                { value: 'all', label: 'All Events' },
                { value: 'delivered', label: 'Delivered' },
                { value: 'in_transit', label: 'In Transit' },
                { value: 'out_for_delivery', label: 'Out for Delivery' },
                { value: 'exception', label: 'Exceptions & Delays' },
              ]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
            <span className="text-xs text-text-secondary ml-auto">
              Showing {filteredEvents.length} events
            </span>
          </div>
        </Card>

        {/* Events Table */}
        <Card padding="none">
          {isLoading ? (
            <div className="p-6">
              <TableSkeleton rows={10} />
            </div>
          ) : filteredEvents.length === 0 ? (
            <EmptyState
              icon={Activity}
              title="No Tracking Events"
              description="No tracking events found matching the selected filter."
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Description</TableHead>
                    <TableHead>Tracking Number</TableHead>
                    <TableHead>Courier</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => {
                    const courierName =
                      typeof event.courier === 'object' && event.courier?.name
                        ? event.courier.name
                        : typeof event.courier === 'string'
                        ? event.courier
                        : '—';

                    return (
                      <TableRow key={event._id}>
                        <TableCell className="font-medium text-text-primary">
                          {event.description}
                        </TableCell>
                        <TableCell className="font-mono text-sm text-primary-600 font-semibold">
                          {event.trackingNumber || '—'}
                        </TableCell>
                        <TableCell className="text-sm">{courierName}</TableCell>
                        <TableCell>
                          {event.location ? (
                            <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                              <MapPin className="h-3.5 w-3.5 text-primary-600 flex-shrink-0" />
                              <span>{event.location}</span>
                            </div>
                          ) : (
                            <span className="text-text-secondary">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={event.status} />
                        </TableCell>
                        <TableCell className="text-sm text-text-secondary whitespace-nowrap">
                          {formatDateTime(event.timestamp)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};
