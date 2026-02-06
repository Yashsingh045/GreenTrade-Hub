import { Router } from 'express';
import { supplierController } from '../controllers/supplier.controller';
import { validateRequest } from '../middlewares/validateRequest';
import {
    createSupplierSchema,
    getSupplierByIdSchema,
} from '../validations/supplier.validation';

const router = Router();

/**
 * @swagger
 * /api/suppliers:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *   get:
 *     summary: Get all suppliers
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: List of all suppliers
 */
router.post(
    '/',
    validateRequest(createSupplierSchema),
    supplierController.createSupplier.bind(supplierController)
);

router.get('/', supplierController.getAllSuppliers.bind(supplierController));

/**
 * @swagger
 * /api/suppliers/{id}:
 *   get:
 *     summary: Get supplier by ID with products
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Supplier details with products
 *       404:
 *         description: Supplier not found
 */
router.get(
    '/:id',
    validateRequest(getSupplierByIdSchema),
    supplierController.getSupplierById.bind(supplierController)
);

export default router;
