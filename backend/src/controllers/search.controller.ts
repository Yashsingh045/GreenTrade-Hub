import { Request, Response, NextFunction } from 'express';
import { searchService } from '../services/search.service';
import { AppError } from '../middlewares/errorHandler';

export class SearchController {
    async search(req: Request, res: Response, next: NextFunction) {
        try {
            const { q } = req.query;

            if (!q || typeof q !== 'string') {
                return next(new AppError('Search query parameter "q" is required', 400));
            }

            const results = await searchService.search(q);

            res.status(200).json({
                success: true,
                count: results.length,
                data: results,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const searchController = new SearchController();
