import express from 'express';
import {
  getAllCouriers,
  getCourierById,
  updateCourierStatus,
} from '../controllers/courierController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllCouriers);
router.get('/:id', getCourierById);
router.patch('/:id/status', updateCourierStatus);

export default router;
