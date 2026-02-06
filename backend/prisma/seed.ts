import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await prisma.product.deleteMany();
    await prisma.supplier.deleteMany();

    // Seed Suppliers
    const supplier1 = await prisma.supplier.create({
        data: {
            name: 'Green Farms Co.',
            email: 'contact@greenfarms.com',
            country: 'India',
            contactPerson: 'Rajesh Kumar',
            phone: '+91-9876543210',
        },
    });

    const supplier2 = await prisma.supplier.create({
        data: {
            name: 'EcoHandicrafts Ltd.',
            email: 'info@ecohandicrafts.com',
            country: 'Bangladesh',
            contactPerson: 'Fatima Ali',
            phone: '+880-1712345678',
        },
    });

    const supplier3 = await prisma.supplier.create({
        data: {
            name: 'Sustainable Goods Inc.',
            email: 'sales@sustainablegoods.com',
            country: 'Kenya',
            contactPerson: 'John Kamau',
            phone: '+254-712345678',
        },
    });

    console.log('✅ Created 3 suppliers');

    // Seed Products
    await prisma.product.createMany({
        data: [
            {
                supplierId: supplier1.id,
                name: 'Organic Basmati Rice',
                category: 'ORGANIC_FOOD',
                price: 45.50,
                stockQuantity: 500,
                certificationStatus: 'CERTIFIED',
                certificationExpiryDate: new Date('2025-12-31'),
                description: 'Premium quality organic basmati rice grown without pesticides',
            },
            {
                supplierId: supplier1.id,
                name: 'Organic Turmeric Powder',
                category: 'ORGANIC_FOOD',
                price: 12.75,
                stockQuantity: 300,
                certificationStatus: 'CERTIFIED',
                certificationExpiryDate: new Date('2026-06-30'),
                description: 'Pure organic turmeric powder with high curcumin content',
            },
            {
                supplierId: supplier2.id,
                name: 'Handwoven Cotton Rugs',
                category: 'HANDMADE',
                price: 89.99,
                stockQuantity: 150,
                certificationStatus: 'PENDING',
                description: 'Beautifully handwoven cotton rugs by local artisans',
            },
            {
                supplierId: supplier2.id,
                name: 'Jute Shopping Bags',
                category: 'SUSTAINABLE_GOODS',
                price: 8.50,
                stockQuantity: 1000,
                certificationStatus: 'CERTIFIED',
                certificationExpiryDate: new Date('2025-08-15'),
                description: 'Eco-friendly reusable jute bags',
            },
            {
                supplierId: supplier3.id,
                name: 'Bamboo Fiber Towels',
                category: 'SUSTAINABLE_GOODS',
                price: 22.00,
                stockQuantity: 400,
                certificationStatus: 'CERTIFIED',
                certificationExpiryDate: new Date('2026-03-20'),
                description: 'Soft and sustainable bamboo fiber towels',
            },
            {
                supplierId: supplier3.id,
                name: 'Recycled Paper Notebooks',
                category: 'SUSTAINABLE_GOODS',
                price: 5.99,
                stockQuantity: 800,
                certificationStatus: 'NOT_CERTIFIED',
                description: '100% recycled paper notebooks',
            },
        ],
    });

    console.log('✅ Created 6 products');
    console.log('🎉 Database seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
