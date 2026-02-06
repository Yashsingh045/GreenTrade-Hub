import { Request, Response, NextFunction } from 'express';
import { analyticsService } from '../services/analytics.service';

export class AnalyticsController {
    async getSummary(req: Request, res: Response, next: NextFunction) {
        try {
            const summary = await analyticsService.getSummary();

            res.status(200).json({
                success: true,
                data: summary,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const analyticsController = new AnalyticsController();
