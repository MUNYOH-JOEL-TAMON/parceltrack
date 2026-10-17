import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { 
  Card, 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell,
  Button,
  Input,
  Select,
  StatusBadge,
  Pagination,
  TableSkeleton,
  EmptyState
} from '@/components/ui';
import { Shipment } from '@/types';
import { shipmentService } from '@/services/api';
import { useToast } from '@/components/ui';
import { formatDateTime } from '@/utils/formatDate';
import { Plus, Search, Filter, Package } from 'lucide-react';

export const ShipmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [courierFilter, setCourierFilter] = useState(searchParams.get('courier') || 'all');

  useEffect(() => {
    fetchShipments();
  }, [currentPage, statusFilter, courierFilter]);

  const fetchShipments = async () => {
    setIsLoading(true);
    try {
      const params: any = { page: currentPage, limit: 20 };
      if (statusFilter !== 'all') params.status = statusFilter;
      if (courierFilter !== 'all') params.courier = courierFilter;
      if (searchQuery) params.search = searchQuery;

      const response = await shipmentService.getAllShipments(params);
      setShipments(response.data.data.shipments);
      setTotalPages(response.data.data.totalPages || 1);
    } catch (error: any) {
      showToast('Failed to load shipments', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchShipments();
  };

  const handleFilterChange = (key: string, value: string) => {
    if (key === 'status') setStatusFilter(value);
    if (key === 'courier') setCourierFilter(value);
    setCurrentPage(1);
  };

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending_pickup', label: 'Pending Pickup' },
    { value: 'picked_up', label: 'Picked Up' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'out_for_delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'exception', label: 'Exception' },
  ];

  const courierOptions = [
    { value: 'all', label: 'All Carriers' },
    { value: 'dhl', label: 'DHL' },
    { value: 'fedex', label: 'FedEx' },
    { value: 'ups', label: 'UPS' },
    { value: 'usps', label: 'USPS' },
  ];

  return (
    <AdminLayout title="Shipments">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <Input
                type="text"
                placeholder="Search by tracking number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
          <Button onClick={() => navigate('/admin/shipments/register')}>
            <Plus className="h-4 w-4 mr-2" />
            Register Shipment
          </Button>
        </div>

        {/* Filters */}
        <Card padding="sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-text-secondary" />
              <span className="text-sm font-medium text-text-secondary">Filters:</span>
            </div>
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            />
            <Select
              options={courierOptions}
              value={courierFilter}
              onChange={(e) => handleFilterChange('courier', e.target.value)}
            />
          </div>
        </Card>

        {/* Shipments Table */}
        <Card padding="none">
          {isLoading ? (
            <div className="p-6">
              <TableSkeleton rows={10} />
            </div>
          ) : shipments.length === 0 ? (
            <EmptyState
              icon={Package}
              title="No Shipments Found"
              description="No shipments match your current filters. Try adjusting your search criteria."
              action={{
                label: 'Register New Shipment',
                onClick: () => navigate('/admin/shipments/register'),
              }}
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
                      <TableHead>Origin</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Est. Delivery</TableHead>
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shipments.map((shipment) => (
                      <TableRow
                        key={shipment._id}
                        onClick={() => navigate(`/admin/shipments/${shipment._id}`)}
                        className="cursor-pointer"
                      >
                        <TableCell className="font-mono font-medium">
                          {shipment.trackingNumber}
                        </TableCell>
                        <TableCell>{shipment.courier.name}</TableCell>
                        <TableCell>
                          <StatusBadge status={shipment.status} />
                        </TableCell>
                        <TableCell className="text-text-secondary">
                          {shipment.origin || '—'}
                        </TableCell>
                        <TableCell className="text-text-secondary">
                          {shipment.destination || '—'}
                        </TableCell>
                        <TableCell className="text-text-secondary">
                          {shipment.estimatedDelivery
                            ? formatDateTime(shipment.estimatedDelivery)
                            : '—'}
                        </TableCell>
                        <TableCell className="text-text-secondary text-sm">
                          {formatDateTime(shipment.lastUpdated)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
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
