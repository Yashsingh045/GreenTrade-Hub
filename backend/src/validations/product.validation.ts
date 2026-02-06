import { z } from 'zod';

// Enums for validation
const categoryEnum = z.enum(['ORGANIC_FOOD', 'HANDMADE', 'SUSTAINABLE_GOODS']);
const certificationStatusEnum = z.enum(['CERTIFIED', 'PENDING', 'NOT_CERTIFIED']);

// Schema for creating a new product
export const createProductSchema = z.object({
    body: z.object({
        supplierId: z.string().uuid('Invalid supplier ID'),
        name: z.string().min(1, 'Name is required').max(255),
        category: categoryEnum,
        price: z.number().positive('Price must be positive'),
        stockQuantity: z.number().int().min(0, 'Stock quantity must be non-negative'),
        certificationStatus: certificationStatusEnum,
        certificationExpiryDate: z.string().datetime().optional().nullable(),
        description: z.string().max(5000).optional().nullable(),
    }),
});

// Schema for updating a product
export const updateProductSchema = z.object({
    params: z.object({
        id: z.string().uuid('Invalid product ID'),
    }),
    body: z.object({
        supplierId: z.string().uuid('Invalid supplier ID').optional(),
        name: z.string().min(1, 'Name is required').max(255).optional(),
        category: categoryEnum.optional(),
        price: z.number().positive('Price must be positive').optional(),
        stockQuantity: z.number().int().min(0, 'Stock quantity must be non-negative').optional(),
        certificationStatus: certificationStatusEnum.optional(),
        certificationExpiryDate: z.string().datetime().optional().nullable(),
        description: z.string().max(5000).optional().nullable(),
    }),
});

// Schema for deleting a product
export const deleteProductSchema = z.object({
    params: z.object({
        id: z.string().uuid('Invalid product ID'),
    }),
});

// Schema for query filters
export const getProductsQuerySchema = z.object({
    query: z.object({
        category: categoryEnum.optional(),
        certificationStatus: certificationStatusEnum.optional(),
        supplierId: z.string().uuid('Invalid supplier ID').optional(),
    }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>['body'];
export type UpdateProductInput = z.infer<typeof updateProductSchema>['body'];
export type ProductFilters = z.infer<typeof getProductsQuerySchema>['query'];
