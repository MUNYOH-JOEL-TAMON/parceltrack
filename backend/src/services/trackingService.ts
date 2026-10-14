import axios from 'axios';
import { ShipmentStatus, ITrackingEvent } from '../models/Shipment.js';

interface TrackingData {
  status: ShipmentStatus;
  currentLocation?: string;
  origin?: string;
  destination?: string;
  estimatedDelivery?: Date;
  events: ITrackingEvent[];
  courierSlug?: string;
  providerTrackingId?: string;
}

/**
 * Track shipment from AfterShip or tracking provider
 * This is a simplified implementation. In production, you would:
 * 1. Use AfterShip API (https://www.aftership.com/docs/api/4)
 * 2. Handle rate limiting
 * 3. Implement webhook listeners
 * 4. Cache responses
 */
export const trackShipmentFromProvider = async (
  trackingNumber: string,
  courierSlug?: string
): Promise<TrackingData | null> => {
  try {
    const apiKey = process.env.AFTERSHIP_API_KEY;

    if (!apiKey) {
      console.warn('AFTERSHIP_API_KEY not configured. Using mock data.');
      return getMockTrackingData(trackingNumber, courierSlug);
    }

    // AfterShip API implementation
    const response = await axios.get(
      `https://api.aftership.com/v4/trackings/${courierSlug}/${trackingNumber}`,
      {
        headers: {
          'aftership-api-key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    const tracking = response.data.data.tracking;

    // Map AfterShip status to our internal status
    const status = mapAfterShipStatus(tracking.tag);

    // Map tracking events
    const events: ITrackingEvent[] = tracking.checkpoints.map((checkpoint: any) => ({
      description: checkpoint.message,
      location: checkpoint.location
        ? `${checkpoint.city || ''} ${checkpoint.state || ''} ${checkpoint.country_name || ''}`.trim()
        : undefined,
      timestamp: new Date(checkpoint.checkpoint_time),
      status: mapAfterShipStatus(checkpoint.tag),
      courierStatus: checkpoint.subtag,
    }));

    return {
      status,
      currentLocation: tracking.origin_country_iso3,
      origin: tracking.origin_country_iso3,
      destination: tracking.destination_country_iso3,
      estimatedDelivery: tracking.expected_delivery
        ? new Date(tracking.expected_delivery)
        : undefined,
      events,
      courierSlug: tracking.slug,
      providerTrackingId: tracking.id,
    };
  } catch (error: any) {
    console.error('Tracking service error:', error.message);

    // Fallback to mock data for development
    if (process.env.NODE_ENV === 'development') {
      return getMockTrackingData(trackingNumber, courierSlug);
    }

    return null;
  }
};

/**
 * Map AfterShip status tags to our internal status
 */
function mapAfterShipStatus(tag: string): ShipmentStatus {
  const statusMap: Record<string, ShipmentStatus> = {
    'InfoReceived': 'information_received',
    'Pending': 'pending_pickup',
    'InTransit': 'in_transit',
    'OutForDelivery': 'out_for_delivery',
    'AttemptFail': 'delivery_attempted',
    'Delivered': 'delivered',
    'AvailableForPickup': 'out_for_delivery',
    'Exception': 'exception',
    'Expired': 'expired',
  };

  return statusMap[tag] || 'unknown';
}

/**
 * Generate mock tracking data for development/testing
 */
function getMockTrackingData(
  _trackingNumber: string,
  courierSlug?: string
): TrackingData {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

  return {
    status: 'in_transit',
    currentLocation: 'Memphis, TN, USA',
    origin: 'Los Angeles, CA, USA',
    destination: 'New York, NY, USA',
    estimatedDelivery: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
    courierSlug: courierSlug || 'fedex',
    events: [
      {
        description: 'Package in transit',
        location: 'Memphis, TN, USA',
        timestamp: now,
        status: 'in_transit',
      },
      {
        description: 'Departed facility',
        location: 'Phoenix, AZ, USA',
        timestamp: yesterday,
        status: 'in_transit',
      },
      {
        description: 'Package picked up',
        location: 'Los Angeles, CA, USA',
        timestamp: twoDaysAgo,
        status: 'picked_up',
      },
    ],
  };
}
