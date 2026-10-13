import express from 'express';
import { trackShipment } from '../controllers/trackingController.js';

const router = express.Router();

router.get('/:trackingNumber', trackShipment);

export default router;
