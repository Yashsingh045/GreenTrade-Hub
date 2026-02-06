import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { validateRequest } from '../middlewares/validateRequest';
import {
    createProductSchema,
    updateProductSchema,
    deleteProductSchema,
    getProductsQuerySchema,
} from '../validations/product.validation';

const router = Router();

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *   get:
 *     summary: Get all products with optional filters
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [ORGANIC_FOOD, HANDMADE, SUSTAINABLE_GOODS]
 *       - in: query
 *         name: certificationStatus
 *         schema:
 *           type: string
 *           enum: [CERTIFIED, PENDING, NOT_CERTIFIED]
 *       - in: query
 *         name: supplierId
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of products
 */
router.post(
    '/',
    validateRequest(createProductSchema),
    productController.createProduct.bind(productController)
);

router.get(
    '/',
    validateRequest(getProductsQuerySchema),
    productController.getAllProducts.bind(productController)
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Product updated successfully
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.put(
    '/:id',
    validateRequest(updateProductSchema),
    productController.updateProduct.bind(productController)
);

router.delete(
    '/:id',
    validateRequest(deleteProductSchema),
    productController.deleteProduct.bind(productController)
);

export default router;
