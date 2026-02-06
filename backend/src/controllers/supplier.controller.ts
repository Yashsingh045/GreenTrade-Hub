import { Request, Response, NextFunction } from 'express';
import { supplierService } from '../services/supplier.service';
import { AppError } from '../middlewares/errorHandler';

export class SupplierController {
    // POST /api/suppliers - Create new supplier
    async createSupplier(req: Request, res: Response, next: NextFunction) {
        try {
            const supplier = await supplierService.createSupplier(req.body);

            res.status(201).json({
                success: true,
                message: 'Supplier created successfully',
                data: supplier,
            });
        } catch (error: any) {
            // Handle unique email constraint violation
            if (error.code === 'P2002') {
                return next(new AppError('Email already exists', 400));
            }
            next(error);
        }
    }

    // GET /api/suppliers - Get all suppliers
    async getAllSuppliers(req: Request, res: Response, next: NextFunction) {
        try {
            const suppliers = await supplierService.getAllSuppliers();

            res.status(200).json({
                success: true,
                count: suppliers.length,
                data: suppliers,
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/suppliers/:id - Get supplier by ID with products
    async getSupplierById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const supplier = await supplierService.getSupplierById(id);

            if (!supplier) {
                return next(new AppError('Supplier not found', 404));
            }

            res.status(200).json({
                success: true,
                data: supplier,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const supplierController = new SupplierController();
