import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import Shipment from '../models/Shipment.js';

// @desc    Get dashboard statistics
// @route   GET /api/stats/dashboard
// @access  Private
export const getDashboardStats = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Get total counts
    const totalShipments = await Shipment.countDocuments();
    const inTransit = await Shipment.countDocuments({ status: 'in_transit' });
    const outForDelivery = await Shipment.countDocuments({ status: 'out_for_delivery' });
    const delivered = await Shipment.countDocuments({ status: 'delivered' });
    const exceptions = await Shipment.countDocuments({
      status: { $in: ['exception', 'delayed', 'delivery_attempted', 'returned_to_sender'] },
    });

    // Get status breakdown
    const statusBreakdown = await Shipment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          status: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalShipments,
        inTransit,
        outForDelivery,
        delivered,
        exceptions,
        statusBreakdown,
      },
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
    });
  }
};

// @desc    Get recent activity / tracking events
// @route   GET /api/stats/activity
// @access  Private
export const getRecentActivity = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const shipments = await Shipment.find({}, { trackingNumber: 1, courier: 1, events: 1 })
      .populate('courier', 'name slug')
      .sort({ updatedAt: -1 })
      .limit(25);

    const events: any[] = [];
    shipments.forEach((s) => {
      s.events.forEach((e) => {
        events.push({
          _id: (e as any)._id,
          description: e.description,
          location: e.location,
          timestamp: e.timestamp,
          status: e.status,
          trackingNumber: s.trackingNumber,
          courier: s.courier,
        });
      });
    });

    // Sort events by timestamp descending
    events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    res.status(200).json({
      success: true,
      data: events.slice(0, 50),
    });
  } catch (error) {
    console.error('Get recent activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent activity',
    });
  }
};
