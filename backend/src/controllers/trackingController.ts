import { Request, Response } from 'express';
import Shipment from '../models/Shipment.js';
import Courier from '../models/Courier.js';
import { trackShipmentFromProvider } from '../services/trackingService.js';

// @desc    Track shipment by tracking number
// @route   GET /api/tracking/:trackingNumber
// @access  Public
export const trackShipment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { trackingNumber } = req.params;
    const { courier: courierSlug } = req.query;

    // Check if shipment exists in database
    let shipment = await Shipment.findOne({ trackingNumber }).populate('courier');

    if (shipment) {
      // Return existing shipment data
      res.status(200).json({
        success: true,
        data: shipment,
      });
      return;
    }

    // If not in database, try to fetch from provider
    let courier;
    if (courierSlug && courierSlug !== 'auto') {
      courier = await Courier.findOne({ slug: courierSlug });
    }

    // Fetch from tracking provider
    const trackingData = await trackShipmentFromProvider(
      trackingNumber,
      courier?.providerSlug
    );

    if (!trackingData) {
      res.status(404).json({
        success: false,
        message: 'Tracking information not found',
      });
      return;
    }

    // Find or create courier
    if (!courier && trackingData.courierSlug) {
      courier = await Courier.findOne({ providerSlug: trackingData.courierSlug });
    }

    if (!courier) {
      res.status(404).json({
        success: false,
        message: 'Courier not supported',
      });
      return;
    }

    // Create new shipment
    shipment = await Shipment.create({
      trackingNumber,
      courier: courier._id,
      status: trackingData.status,
      currentLocation: trackingData.currentLocation,
      origin: trackingData.origin,
      destination: trackingData.destination,
      estimatedDelivery: trackingData.estimatedDelivery,
      lastUpdated: new Date(),
      events: trackingData.events,
      providerTrackingId: trackingData.providerTrackingId,
    });

    shipment = await shipment.populate('courier');

    res.status(200).json({
      success: true,
      data: shipment,
    });
  } catch (error: any) {
    console.error('Track shipment error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching tracking information',
    });
  }
};
