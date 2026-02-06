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

// POST /api/products - Create new product
router.post(
    '/',
    validateRequest(createProductSchema),
    productController.createProduct.bind(productController)
);

// GET /api/products - Get all products with optional filters
router.get(
    '/',
    validateRequest(getProductsQuerySchema),
    productController.getAllProducts.bind(productController)
);

// PUT /api/products/:id - Update product
router.put(
    '/:id',
    validateRequest(updateProductSchema),
    productController.updateProduct.bind(productController)
);

// DELETE /api/products/:id - Delete product
router.delete(
    '/:id',
    validateRequest(deleteProductSchema),
    productController.deleteProduct.bind(productController)
);

export default router;
