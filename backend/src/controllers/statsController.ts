import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import Shipment from '../models/Shipment.js';

// @desc    Get dashboard statistics
// @route   GET /api/stats/dashboard
// @access  Private
export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
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
