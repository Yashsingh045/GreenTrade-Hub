import { PrismaClient } from '@prisma/client';
import { CreateProductInput, UpdateProductInput, ProductFilters } from '../validations/product.validation';

const prisma = new PrismaClient();

export class ProductService {
    // Create a new product
    async createProduct(data: CreateProductInput) {
        // Convert certificationExpiryDate string to Date if provided
        const productData = {
            ...data,
            certificationExpiryDate: data.certificationExpiryDate
                ? new Date(data.certificationExpiryDate)
                : null,
        };

        return await prisma.product.create({
            data: productData,
            include: {
                supplier: true,
            },
        });
    }

    // Get all products with optional filters
    async getAllProducts(filters: ProductFilters) {
        const where: any = {};

        if (filters.category) {
            where.category = filters.category;
        }

        if (filters.certificationStatus) {
            where.certificationStatus = filters.certificationStatus;
        }

        if (filters.supplierId) {
            where.supplierId = filters.supplierId;
        }

        return await prisma.product.findMany({
            where,
            include: {
                supplier: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        country: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    // Update product by ID
    async updateProduct(id: string, data: UpdateProductInput) {
        // Convert certificationExpiryDate string to Date if provided
        const updateData: any = { ...data };
        if (data.certificationExpiryDate !== undefined) {
            updateData.certificationExpiryDate = data.certificationExpiryDate
                ? new Date(data.certificationExpiryDate)
                : null;
        }

        return await prisma.product.update({
            where: { id },
            data: updateData,
            include: {
                supplier: true,
            },
        });
    }

    // Delete product by ID
    async deleteProduct(id: string) {
        return await prisma.product.delete({
            where: { id },
        });
    }

    // Get product by ID
    async getProductById(id: string) {
        return await prisma.product.findUnique({
            where: { id },
            include: {
                supplier: true,
            },
        });
    }
}

export const productService = new ProductService();
