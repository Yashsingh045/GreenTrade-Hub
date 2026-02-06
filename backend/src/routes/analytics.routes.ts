import { Router } from 'express';
import { analyticsController } from '../controllers/analytics.controller';

const router = Router();

/**
 * @swagger
 * /api/analytics/summary:
 *   get:
 *     summary: Get dashboard summary metrics
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Analytics summary data
 */
router.get('/summary', analyticsController.getSummary.bind(analyticsController));

export default router;
