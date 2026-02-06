export type Category = 'ORGANIC_FOOD' | 'HANDMADE' | 'SUSTAINABLE_GOODS';
export type CertificationStatus = 'CERTIFIED' | 'PENDING' | 'NOT_CERTIFIED';

export interface Supplier {
    id: string;
    name: string;
    email: string;
    country: string;
    contactPerson?: string | null;
    phone?: string | null;
    createdAt: Date;
}

export interface Product {
    id: string;
    supplierId: string;
    name: string;
    category: Category;
    price: number;
    stockQuantity: number;
    certificationStatus: CertificationStatus;
    certificationExpiryDate?: Date | null;
    description?: string | null;
    createdAt: Date;
}

export interface SupplierWithProducts extends Supplier {
    products: Product[];
}

export interface AnalyticsSummary {
    totalSuppliers: number;
    totalProducts: number;
    productsByCategory: { category: Category; count: number }[];
    productsByCertification: { status: CertificationStatus; count: number }[];
}

export interface SearchResult {
    type: 'supplier' | 'product';
    id: string;
    name: string;
    additionalInfo?: any;
}
