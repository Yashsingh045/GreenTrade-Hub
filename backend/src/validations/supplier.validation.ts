import { z } from 'zod';

// Schema for creating a new supplier
export const createSupplierSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required').max(255),
        email: z.string().email('Invalid email address'),
        country: z.string().min(1, 'Country is required').max(100),
        contactPerson: z.string().max(255).optional(),
        phone: z.string().max(20).optional(),
    }),
});

// Schema for getting supplier by ID
export const getSupplierByIdSchema = z.object({
    params: z.object({
        id: z.string().uuid('Invalid supplier ID'),
    }),
});

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>['body'];
