'use client';

import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Product } from '@/types';

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
    const getCertificationChipColor = (status: string) => {
        switch (status) {
            case 'CERTIFIED':
                return 'success';
            case 'PENDING':
                return 'warning';
            default:
                return 'error';
        }
    };

    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="products table">
                <TableHead sx={{ bgcolor: 'grey.100' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Certification</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Supplier</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                No products found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'grey.50' } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                    {product.name}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={product.category.replace('_', ' ')}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={product.certificationStatus.replace('_', ' ')}
                                        size="small"
                                        color={getCertificationChipColor(product.certificationStatus)}
                                    />
                                </TableCell>
                                <TableCell>
                                    {product.supplier?.name || 'Unknown'}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={product.stockQuantity}
                                        size="small"
                                        color={product.stockQuantity > 10 ? 'default' : 'error'}
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Edit Product">
                                        <IconButton size="small" color="primary" onClick={() => onEdit(product)}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Product">
                                        <IconButton size="small" color="error" onClick={() => onDelete(product.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;
