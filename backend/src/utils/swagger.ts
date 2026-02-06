import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GreenTrade Hub API',
            version: '1.0.0',
            description: 'API documentation for GreenTrade Hub supplier and product management system',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                Supplier: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        name: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        country: { type: 'string' },
                        contactPerson: { type: 'string', nullable: true },
                        phone: { type: 'string', nullable: true },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                },
                Product: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        supplierId: { type: 'string', format: 'uuid' },
                        name: { type: 'string' },
                        category: { type: 'string', enum: ['ORGANIC_FOOD', 'HANDMADE', 'SUSTAINABLE_GOODS'] },
                        price: { type: 'number' },
                        stockQuantity: { type: 'integer' },
                        certificationStatus: { type: 'string', enum: ['CERTIFIED', 'PENDING', 'NOT_CERTIFIED'] },
                        certificationExpiryDate: { type: 'string', format: 'date', nullable: true },
                        description: { type: 'string', nullable: true },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts', './src/index.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
