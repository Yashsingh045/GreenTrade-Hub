import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AnalyticsService {
    async getSummary() {
        const [totalSuppliers, totalProducts, categoryCounts, certificationCounts] = await Promise.all([
            prisma.supplier.count(),
            prisma.product.count(),
            prisma.product.groupBy({
                by: ['category'],
                _count: {
                    id: true,
                },
            }),
            prisma.product.groupBy({
                by: ['certificationStatus'],
                _count: {
                    id: true,
                },
            }),
        ]);

        return {
            totalSuppliers,
            totalProducts,
            productsByCategory: categoryCounts.map((item) => ({
                category: item.category,
                count: item._count.id,
            })),
            productsByCertification: certificationCounts.map((item) => ({
                status: item.certificationStatus,
                count: item._count.id,
            })),
        };
    }
}

export const analyticsService = new AnalyticsService();
