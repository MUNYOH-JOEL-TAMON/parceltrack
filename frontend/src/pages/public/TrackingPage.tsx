import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TrackingSearch } from '@/components/TrackingSearch';
import { TrackingTimeline } from '@/components/TrackingTimeline';
import { ShipmentProgress } from '@/components/ShipmentProgress';
import { Card, StatusBadge, Button, Skeleton } from '@/components/ui';
import { Shipment } from '@/types';
import { trackingService } from '@/services/api';
import { formatDateTime } from '@/utils/formatDate';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useToast } from '@/components/ui';
import { 
  Copy, 
  RefreshCw, 
  MapPin, 
  Package,
  AlertCircle,
  ExternalLink 
} from 'lucide-react';

export const TrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trackingNumber = searchParams.get('number');
  const courier = searchParams.get('courier');

  useEffect(() => {
    if (trackingNumber) {
      fetchTracking();
    }
  }, [trackingNumber, courier]);

  const fetchTracking = async () => {
    if (!trackingNumber) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await trackingService.trackShipment(trackingNumber, courier || undefined);
      setShipment(response.data.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch tracking information';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyTracking = async () => {
    if (trackingNumber) {
      const success = await copyToClipboard(trackingNumber);
      if (success) {
        showToast('Tracking number copied to clipboard', 'success');
      } else {
        showToast('Failed to copy tracking number', 'error');
      }
    }
  };

  const handleRefresh = () => {
    fetchTracking();
    showToast('Refreshing tracking information...', 'info');
  };

  if (!trackingNumber) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <Package className="h-16 w-16 text-text-secondary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              No Tracking Number Provided
            </h2>
            <p className="text-text-secondary mb-6">
              Please enter a tracking number to search for your shipment
            </p>
            <Link to="/">
              <Button>Return to Homepage</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-main">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8">
            <TrackingSearch />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <Card className="text-center py-12">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-status-error-bg p-4 mb-4">
                  <AlertCircle className="h-12 w-12 text-status-error" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Tracking Information Not Found
                </h3>
                <p className="text-text-secondary mb-6 max-w-md">
                  {error}
                </p>
                <div className="flex gap-3">
                  <Button onClick={handleRefresh} variant="outline">
                    Try Again
                  </Button>
                  <Link to="/">
                    <Button>Search Another Package</Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}

          {/* Tracking Results */}
          {shipment && !isLoading && (
            <div className="space-y-6">
              {/* Summary Card */}
              <Card>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold text-text-primary">
                        Tracking Details
                      </h1>
                      <StatusBadge status={shipment.status} />
                    </div>
                    <div className="flex items-center gap-2 text-lg font-mono text-text-secondary">
                      <span>{shipment.trackingNumber}</span>
                      <button
                        onClick={handleCopyTracking}
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRefresh}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
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

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-text-secondary text-xs">
                    Last updated: {formatDateTime(shipment.lastUpdated)}
                  </p>
                </div>
              </Card>

              {/* Progress Indicator */}
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
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
