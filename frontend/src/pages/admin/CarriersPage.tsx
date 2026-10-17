import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, Badge, Skeleton, EmptyState } from '@/components/ui';
import { Courier } from '@/types';
import { courierService } from '@/services/api';
import { useToast } from '@/components/ui';
import { formatTimeAgo } from '@/utils/formatDate';
import { Truck, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export const CarriersPage: React.FC = () => {
  const { showToast } = useToast();
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCouriers();
  }, []);

  const fetchCouriers = async () => {
    try {
      const response = await courierService.getAllCouriers();
      setCouriers(response.data.data);
    } catch (error: any) {
      showToast('Failed to load couriers', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="h-5 w-5 text-status-success" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-status-warning" />;
      case 'unavailable':
        return <XCircle className="h-5 w-5 text-status-error" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-text-secondary" />;
    }
  };

  const getStatusBadgeVariant = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'connected': return 'success';
      case 'degraded': return 'warning';
      case 'unavailable': return 'error';
      default: return 'default';
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Courier Management">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Courier Management">
      {couriers.length === 0 ? (
        <EmptyState
          icon={Truck}
          title="No Couriers Configured"
          description="No courier integrations are currently configured in the system."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {couriers.map((courier) => (
            <Card key={courier._id} padding="md">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                    <Truck className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{courier.name}</h3>
                    <p className="text-sm text-text-secondary">{courier.slug}</p>
                  </div>
                </div>
                {getStatusIcon(courier.integrationStatus)}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Status</span>
                  <Badge variant={getStatusBadgeVariant(courier.integrationStatus)}>
                    {courier.integrationStatus.replace('_', ' ')}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Active</span>
                  <Badge variant={courier.isActive ? 'success' : 'default'}>
                    {courier.isActive ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>

                {courier.shipmentCount !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Shipments</span>
                    <span className="text-sm font-medium text-text-primary">
                      {courier.shipmentCount}
                    </span>
                  </div>
                )}

                {courier.lastSync && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Last Sync</span>
                    <span className="text-sm text-text-primary">
                      {formatTimeAgo(courier.lastSync)}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};
