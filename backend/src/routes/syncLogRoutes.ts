import express from 'express';
import { getSyncLogs, retrySyncLog } from '../controllers/syncLogController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getSyncLogs);
router.post('/:id/retry', retrySyncLog);

export default router;
