import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import Shipment from '../models/Shipment.js';
import Courier from '../models/Courier.js';
import SyncLog from '../models/SyncLog.js';
import { trackShipmentFromProvider } from '../services/trackingService.js';

// @desc    Get all shipments
// @route   GET /api/shipments
// @access  Private
export const getAllShipments = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (req.query.status) {
      if (req.query.status === 'exceptions') {
        filter.status = { $in: ['exception', 'delayed', 'delivery_attempted', 'returned_to_sender'] };
      } else {
        filter.status = req.query.status;
      }
    }

    if (req.query.courier && req.query.courier !== 'all') {
      const courierDoc = await Courier.findOne({ slug: req.query.courier });
      if (courierDoc) {
        filter.courier = courierDoc._id;
      }
    }

    if (req.query.search) {
      filter.trackingNumber = { $regex: req.query.search, $options: 'i' };
    }

    const shipments = await Shipment.find(filter)
      .populate('courier')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Shipment.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        shipments,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error('Get shipments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching shipments',
    });
  }
};

// @desc    Get shipment by ID
// @route   GET /api/shipments/:id
// @access  Private
export const getShipmentById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const shipment = await Shipment.findById(req.params.id).populate('courier');

    if (!shipment) {
      res.status(404).json({
        success: false,
        message: 'Shipment not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: shipment,
    });
  } catch (error) {
    console.error('Get shipment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching shipment',
    });
  }
};

// @desc    Register new shipment
// @route   POST /api/shipments
// @access  Private
export const registerShipment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { trackingNumber, courier: courierSlug, origin, destination, internalReference } = req.body;

    if (!trackingNumber) {
      res.status(400).json({
        success: false,
        message: 'Tracking number is required',
      });
      return;
    }

    // Find courier
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
        message: 'Unable to fetch tracking information',
      });
      return;
    }

    // Find courier from tracking data if not provided
    if (!courier && trackingData.courierSlug) {
      courier = await Courier.findOne({ providerSlug: trackingData.courierSlug });
    }

    if (!courier) {
      res.status(400).json({
        success: false,
        message: 'Courier not supported',
      });
      return;
    }

    // Check for duplicate
    const existingShipment = await Shipment.findOne({
      trackingNumber,
      courier: courier._id,
    });

    if (existingShipment) {
      res.status(400).json({
        success: false,
        message: 'Shipment already registered',
      });
      return;
    }

    // Create shipment
    const shipment = await Shipment.create({
      trackingNumber,
      courier: courier._id,
      status: trackingData.status,
      currentLocation: trackingData.currentLocation,
      origin: origin || trackingData.origin,
      destination: destination || trackingData.destination,
      estimatedDelivery: trackingData.estimatedDelivery,
      lastUpdated: new Date(),
      events: trackingData.events,
      internalReference,
      providerTrackingId: trackingData.providerTrackingId,
    });

    const populatedShipment = await shipment.populate('courier');

    // Update courier shipment count
    await Courier.findByIdAndUpdate(courier._id, {
      $inc: { shipmentCount: 1 },
      lastSync: new Date(),
    });

    res.status(201).json({
      success: true,
      data: populatedShipment,
    });
  } catch (error: any) {
    console.error('Register shipment error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error registering shipment',
    });
  }
};

// @desc    Refresh shipment tracking
// @route   POST /api/shipments/:id/refresh
// @access  Private
export const refreshShipment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const shipment = await Shipment.findById(req.params.id).populate('courier');

    if (!shipment) {
      res.status(404).json({
        success: false,
        message: 'Shipment not found',
      });
      return;
    }

    // Fetch updated data
    const trackingData = await trackShipmentFromProvider(
      shipment.trackingNumber,
      (shipment.courier as any).providerSlug
    );

    if (trackingData) {
      shipment.status = trackingData.status;
      shipment.currentLocation = trackingData.currentLocation || shipment.currentLocation;
      shipment.estimatedDelivery = trackingData.estimatedDelivery || shipment.estimatedDelivery;
      shipment.lastUpdated = new Date();
      shipment.events = trackingData.events;

      await shipment.save();

      // Log sync
      await SyncLog.create({
        shipmentId: shipment._id,
        trackingNumber: shipment.trackingNumber,
        courier: (shipment.courier as any).name,
        operation: 'manual_refresh',
        status: 'success',
        attempts: 1,
      });
    }

    res.status(200).json({
      success: true,
      data: shipment,
    });
  } catch (error: any) {
    console.error('Refresh shipment error:', error);

    // Log failed sync
    if (req.params.id) {
      const shipment = await Shipment.findById(req.params.id).populate('courier');
      if (shipment) {
        await SyncLog.create({
          shipmentId: shipment._id,
          trackingNumber: shipment.trackingNumber,
          courier: (shipment.courier as any).name,
          operation: 'manual_refresh',
          status: 'failure',
          error: error.message,
          attempts: 1,
        });
      }
    }

    res.status(500).json({
      success: false,
      message: 'Error refreshing tracking information',
    });
  }
};

// @desc    Delete shipment
// @route   DELETE /api/shipments/:id
// @access  Private
export const deleteShipment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      res.status(404).json({
        success: false,
        message: 'Shipment not found',
      });
      return;
    }

    await shipment.deleteOne();

    // Update courier shipment count
    await Courier.findByIdAndUpdate(shipment.courier, {
      $inc: { shipmentCount: -1 },
    });

    res.status(200).json({
      success: true,
      message: 'Shipment deleted successfully',
    });
  } catch (error) {
    console.error('Delete shipment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting shipment',
    });
  }
};
