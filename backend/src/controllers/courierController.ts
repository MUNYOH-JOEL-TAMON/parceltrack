import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import Courier from '../models/Courier.js';

// @desc    Get all couriers
// @route   GET /api/couriers
// @access  Private
export const getAllCouriers = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const couriers = await Courier.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      data: couriers,
    });
  } catch (error) {
    console.error('Get couriers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching couriers',
    });
  }
};

// @desc    Get courier by ID
// @route   GET /api/couriers/:id
// @access  Private
export const getCourierById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const courier = await Courier.findById(req.params.id);

    if (!courier) {
      res.status(404).json({
        success: false,
        message: 'Courier not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: courier,
    });
  } catch (error) {
    console.error('Get courier error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courier',
    });
  }
};

// @desc    Update courier status
// @route   PATCH /api/couriers/:id/status
// @access  Private
export const updateCourierStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { isActive } = req.body;

    const courier = await Courier.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );

    if (!courier) {
      res.status(404).json({
        success: false,
        message: 'Courier not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: courier,
    });
  } catch (error) {
    console.error('Update courier status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating courier status',
    });
  }
};
