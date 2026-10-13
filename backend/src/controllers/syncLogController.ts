import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import SyncLog from '../models/SyncLog.js';
import Shipment from '../models/Shipment.js';
import { trackShipmentFromProvider } from '../services/trackingService.js';

// @desc    Get sync logs
// @route   GET /api/sync-logs
// @access  Private
export const getSyncLogs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.courier) {
      filter.courier = req.query.courier;
    }

    const logs = await SyncLog.find(filter)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await SyncLog.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        logs,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error('Get sync logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sync logs',
    });
  }
};

// @desc    Retry sync log
// @route   POST /api/sync-logs/:id/retry
// @access  Private
export const retrySyncLog = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const log = await SyncLog.findById(req.params.id);

    if (!log) {
      res.status(404).json({
        success: false,
        message: 'Sync log not found',
      });
      return;
    }

    const shipment = await Shipment.findById(log.shipmentId).populate('courier');

    if (!shipment) {
      res.status(404).json({
        success: false,
        message: 'Shipment not found',
      });
      return;
    }

    // Attempt to fetch tracking data
    const trackingData = await trackShipmentFromProvider(
      log.trackingNumber,
      (shipment.courier as any).providerSlug
    );

    if (trackingData) {
      // Update shipment
      shipment.status = trackingData.status;
      shipment.currentLocation = trackingData.currentLocation || shipment.currentLocation;
      shipment.estimatedDelivery = trackingData.estimatedDelivery || shipment.estimatedDelivery;
      shipment.lastUpdated = new Date();
      shipment.events = trackingData.events;
      await shipment.save();

      // Create new success log
      await SyncLog.create({
        shipmentId: shipment._id,
        trackingNumber: log.trackingNumber,
        courier: log.courier,
        operation: log.operation,
        status: 'success',
        attempts: log.attempts + 1,
      });

      res.status(200).json({
        success: true,
        message: 'Sync retry successful',
      });
    } else {
      // Create new failure log
      await SyncLog.create({
        shipmentId: shipment._id,
        trackingNumber: log.trackingNumber,
        courier: log.courier,
        operation: log.operation,
        status: 'failure',
        error: 'Failed to fetch tracking data',
        attempts: log.attempts + 1,
      });

      res.status(500).json({
        success: false,
        message: 'Sync retry failed',
      });
    }
  } catch (error: any) {
    console.error('Retry sync log error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error retrying sync',
    });
  }
};
