import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SearchService {
    async search(query: string) {
        const [suppliers, products] = await Promise.all([
            prisma.supplier.findMany({
                where: {
                    name: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
                select: {
                    id: true,
                    name: true,
                    country: true,
                },
            }),
            prisma.product.findMany({
                where: {
                    name: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
                include: {
                    supplier: {
                        select: {
                            name: true,
                        },
                    },
                },
            }),
        ]);

        // Format results to identify types
        const formattedSuppliers = suppliers.map((s) => ({
            id: s.id,
            name: s.name,
            type: 'supplier' as const,
            additionalInfo: { country: s.country },
        }));

        const formattedProducts = products.map((p) => ({
            id: p.id,
            name: p.name,
            type: 'product' as const,
            additionalInfo: {
                category: p.category,
                price: p.price,
                supplierName: p.supplier.name
            },
        }));

        return [...formattedSuppliers, ...formattedProducts];
    }
}

export const searchService = new SearchService();
