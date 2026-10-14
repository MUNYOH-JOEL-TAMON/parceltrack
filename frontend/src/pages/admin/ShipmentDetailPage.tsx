import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { 
  Card, 
  Button, 
  StatusBadge,
  Skeleton,
  Modal
} from '@/components/ui';
import { TrackingTimeline } from '@/components/TrackingTimeline';
import { ShipmentProgress } from '@/components/ShipmentProgress';
import { Shipment } from '@/types';
import { shipmentService } from '@/services/api';
import { useToast } from '@/components/ui';
import { formatDateTime } from '@/utils/formatDate';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { 
  ArrowLeft, 
  Copy, 
  RefreshCw, 
  MapPin, 
  Trash2,
  ExternalLink
} from 'lucide-react';

export const ShipmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchShipment();
    }
  }, [id]);

  const fetchShipment = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      const response = await shipmentService.getShipmentById(id);
      setShipment(response.data.data);
    } catch (error: any) {
      showToast('Failed to load shipment details', 'error');
      navigate('/admin/shipments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!id) return;

    setIsRefreshing(true);
    try {
      await shipmentService.refreshTracking(id);
      showToast('Tracking information refreshed', 'success');
      fetchShipment();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to refresh tracking';
      showToast(message, 'error');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    setIsDeleting(true);
    try {
      await shipmentService.deleteShipment(id);
      showToast('Shipment deleted successfully', 'success');
      navigate('/admin/shipments');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete shipment';
      showToast(message, 'error');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleCopyTracking = async () => {
    if (shipment?.trackingNumber) {
      const success = await copyToClipboard(shipment.trackingNumber);
      if (success) {
        showToast('Tracking number copied', 'success');
      }
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Shipment Details">
        <div className="space-y-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </AdminLayout>
    );
  }

  if (!shipment) {
    return (
      <AdminLayout title="Shipment Details">
        <Card className="text-center py-12">
          <p className="text-text-secondary">Shipment not found</p>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Shipment Details">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/shipments')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shipments
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              isLoading={isRefreshing}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`/track?number=${shipment.trackingNumber}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Public View
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        {/* Summary Card */}
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-text-primary">
                  Shipment Details
                </h1>
                <StatusBadge status={shipment.status} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-mono text-text-secondary">
                  {shipment.trackingNumber}
                </span>
                <button
                  onClick={handleCopyTracking}
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-text-secondary mb-1">Courier</p>
              <p className="font-semibold text-text-primary">{shipment.courier.name}</p>
            </div>
            {shipment.estimatedDelivery && (
              <div>
                <p className="text-text-secondary mb-1">Estimated Delivery</p>
                <p className="font-semibold text-text-primary">
                  {formatDateTime(shipment.estimatedDelivery)}
                </p>
              </div>
            )}
            {shipment.origin && (
              <div>
                <p className="text-text-secondary mb-1">Origin</p>
                <p className="font-semibold text-text-primary">{shipment.origin}</p>
              </div>
            )}
            {shipment.destination && (
              <div>
                <p className="text-text-secondary mb-1">Destination</p>
                <p className="font-semibold text-text-primary">{shipment.destination}</p>
              </div>
            )}
          </div>

          {shipment.currentLocation && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-text-secondary text-sm mb-1">Current Location</p>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary-600" />
                <p className="font-medium text-text-primary">{shipment.currentLocation}</p>
              </div>
            </div>
          )}

          {shipment.internalReference && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-text-secondary text-sm mb-1">Internal Reference</p>
              <p className="font-medium text-text-primary">{shipment.internalReference}</p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-border flex justify-between text-xs text-text-secondary">
            <span>Created: {formatDateTime(shipment.createdAt)}</span>
            <span>Last updated: {formatDateTime(shipment.lastUpdated)}</span>
          </div>
        </Card>

        {/* Progress */}
        <Card>
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Shipment Progress
          </h2>
          <ShipmentProgress status={shipment.status} />
        </Card>

        {/* Tracking Timeline */}
        <Card>
          <h2 className="text-lg font-semibold text-text-primary mb-6">
            Tracking History
          </h2>
          <TrackingTimeline events={shipment.events} />
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Shipment"
      >
        <p className="text-text-secondary mb-6">
          Are you sure you want to delete this shipment? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete Shipment
          </Button>
        </div>
      </Modal>
    </AdminLayout>
  );
};
