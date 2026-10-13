import express from 'express';
import {
  getAllShipments,
  getShipmentById,
  registerShipment,
  refreshShipment,
  deleteShipment,
} from '../controllers/shipmentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getAllShipments).post(registerShipment);

router.route('/:id').get(getShipmentById).delete(deleteShipment);

router.post('/:id/refresh', refreshShipment);

export default router;
