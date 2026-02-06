import { Router } from 'express';
import { analyticsController } from '../controllers/analytics.controller';

const router = Router();

// GET /api/analytics/summary
router.get('/summary', analyticsController.getSummary.bind(analyticsController));

export default router;
