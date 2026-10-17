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
  Pagination,
  TableSkeleton,
  EmptyState,
  Select
} from '@/components/ui';
import { TrackingEvent } from '@/types';
import { formatDateTime } from '@/utils/formatDate';
import { Activity, MapPin } from 'lucide-react';

export const TrackingEventsPage: React.FC = () => {
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(1);

  useEffect(() => {
    // Simulated data - would fetch from API
    setTimeout(() => {
      setEvents([]);
      setIsLoading(false);
    }, 500);
  }, [currentPage]);

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
                { value: 'exception', label: 'Exceptions' },
              ]}
              value="all"
              onChange={() => {}}
            />
          </div>
        </Card>

        {/* Events Table */}
        <Card padding="none">
          {isLoading ? (
            <div className="p-6">
              <TableSkeleton rows={10} />
            </div>
          ) : events.length === 0 ? (
            <EmptyState
              icon={Activity}
              title="No Tracking Events"
              description="No tracking events have been recorded yet."
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Tracking Number</TableHead>
                      <TableHead>Courier</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event._id}>
                        <TableCell>{event.description}</TableCell>
                        <TableCell className="font-mono">—</TableCell>
                        <TableCell>—</TableCell>
                        <TableCell>
                          {event.location ? (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </div>
                          ) : (
                            '—'
                          )}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={event.status} />
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDateTime(event.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="p-4 border-t border-border">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};
