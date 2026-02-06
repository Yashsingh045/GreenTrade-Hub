import { PrismaClient } from '@prisma/client';
import { CreateSupplierInput } from '../validations/supplier.validation';

const prisma = new PrismaClient();

export class SupplierService {
    // Create a new supplier
    async createSupplier(data: CreateSupplierInput) {
        return await prisma.supplier.create({
            data,
        });
    }

    // Get all suppliers
    async getAllSuppliers() {
        return await prisma.supplier.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    // Get supplier by ID with products
    async getSupplierById(id: string) {
        return await prisma.supplier.findUnique({
            where: { id },
            include: {
                products: true,
            },
        });
    }
}

export const supplierService = new SupplierService();
