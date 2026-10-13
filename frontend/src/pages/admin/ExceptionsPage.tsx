import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Button,
  Pagination,
  TableSkeleton,
  EmptyState
} from '@/components/ui';
import { Shipment } from '@/types';
import { useToast } from '@/components/ui';
import { formatDateTime } from '@/utils/formatDate';
import { AlertCircle, ExternalLink } from 'lucide-react';

export const ExceptionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Simulated data - would fetch from API
    setTimeout(() => {
      setShipments([]);
      setIsLoading(false);
    }, 500);
  }, [currentPage]);

  return (
    <AdminLayout title="Exceptions">
      <Card padding="none">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={10} />
          </div>
        ) : shipments.length === 0 ? (
          <EmptyState
            icon={AlertCircle}
            title="No Exceptions Found"
            description="No shipments with exceptions or delays have been detected."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking Number</TableHead>
                    <TableHead>Courier</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Exception Type</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipments.map((shipment) => (
                    <TableRow key={shipment._id}>
                      <TableCell className="font-mono">
                        {shipment.trackingNumber}
                      </TableCell>
                      <TableCell>{shipment.courier.name}</TableCell>
                      <TableCell>
                        <StatusBadge status={shipment.status} />
                      </TableCell>
                      <TableCell className="text-status-error">
                        {shipment.status.replace('_', ' ')}
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDateTime(shipment.lastUpdated)}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/admin/shipments/${shipment._id}`)}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View
                        </Button>
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
    </AdminLayout>
  );
};
