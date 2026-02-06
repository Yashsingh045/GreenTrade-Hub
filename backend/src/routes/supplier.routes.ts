import { Router } from 'express';
import { supplierController } from '../controllers/supplier.controller';
import { validateRequest } from '../middlewares/validateRequest';
import {
    createSupplierSchema,
    getSupplierByIdSchema,
} from '../validations/supplier.validation';

const router = Router();

// POST /api/suppliers - Create new supplier
router.post(
    '/',
    validateRequest(createSupplierSchema),
    supplierController.createSupplier.bind(supplierController)
);

// GET /api/suppliers - Get all suppliers
router.get('/', supplierController.getAllSuppliers.bind(supplierController));

// GET /api/suppliers/:id - Get supplier by ID with products
router.get(
    '/:id',
    validateRequest(getSupplierByIdSchema),
    supplierController.getSupplierById.bind(supplierController)
);

export default router;
