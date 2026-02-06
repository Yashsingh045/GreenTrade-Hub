import { Router } from 'express';
import { searchController } from '../controllers/search.controller';

const router = Router();

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Global search for suppliers and products
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
router.get('/', searchController.search.bind(searchController));

export default router;
