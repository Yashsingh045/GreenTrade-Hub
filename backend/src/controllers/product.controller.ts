import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/product.service';
import { AppError } from '../middlewares/errorHandler';

export class ProductController {
    // POST /api/products - Create new product
    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await productService.createProduct(req.body);

            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: product,
            });
        } catch (error: any) {
            // Handle foreign key constraint violation (invalid supplier ID)
            if (error.code === 'P2003') {
                return next(new AppError('Supplier not found', 404));
            }
            next(error);
        }
    }

    // GET /api/products - Get all products with filters
    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = req.query;
            const products = await productService.getAllProducts(filters);

            res.status(200).json({
                success: true,
                count: products.length,
                data: products,
            });
        } catch (error) {
            next(error);
        }
    }

    // PUT /api/products/:id - Update product
    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            // Check if product exists
            const existingProduct = await productService.getProductById(id);
            if (!existingProduct) {
                return next(new AppError('Product not found', 404));
            }

            const product = await productService.updateProduct(id, req.body);

            res.status(200).json({
                success: true,
                message: 'Product updated successfully',
                data: product,
            });
        } catch (error: any) {
            // Handle foreign key constraint violation (invalid supplier ID)
            if (error.code === 'P2003') {
                return next(new AppError('Supplier not found', 404));
            }
            // Handle product not found during update
            if (error.code === 'P2025') {
                return next(new AppError('Product not found', 404));
            }
            next(error);
        }
    }

    // DELETE /api/products/:id - Delete product
    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            await productService.deleteProduct(id);

            res.status(200).json({
                success: true,
                message: 'Product deleted successfully',
            });
        } catch (error: any) {
            // Handle product not found
            if (error.code === 'P2025') {
                return next(new AppError('Product not found', 404));
            }
            next(error);
        }
    }
}

export const productController = new ProductController();
