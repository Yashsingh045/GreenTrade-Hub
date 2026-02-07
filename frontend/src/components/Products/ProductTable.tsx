import React, { useState } from 'react';
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
    Box,
    Typography,
    Stack,
    useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import BrushIcon from '@mui/icons-material/Brush';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Product } from '@/types';

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
}

const ITEMS_PER_PAGE = 5;

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
    const theme = useTheme();
    const [page, setPage] = useState(1);

    // Calculate pagination values
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = products.slice(startIndex, endIndex);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

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

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'ORGANIC_FOOD':
                return { icon: <AgricultureIcon fontSize="small" />, color: '#DCFCE7', text: '#166534', label: 'Organic Food' };
            case 'HANDMADE':
                return { icon: <BrushIcon fontSize="small" />, color: '#FEF3C7', text: '#92400E', label: 'Handmade' };
            case 'SUSTAINABLE_GOODS':
                return { icon: <EmojiNatureIcon fontSize="small" />, color: '#DBEAFE', text: '#1E40AF', label: 'Sustainable' };
            default:
                return { icon: <CategoryIcon fontSize="small" />, color: '#F3F4F6', text: '#374151', label: category };
        }
    };

    return (
        <Box>
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
                            currentProducts.map((product) => {
                                const categoryStyle = getCategoryIcon(product.category);
                                return (
                                    <TableRow
                                        key={product.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'grey.50' } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 600 }}>
                                            <Box sx={{
                                                p: 0.8,
                                                borderRadius: 1.5,
                                                bgcolor: categoryStyle.color,
                                                color: categoryStyle.text,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {categoryStyle.icon}
                                            </Box>
                                            {product.name}
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {categoryStyle.label}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={product.certificationStatus.replace('_', ' ')}
                                                size="small"
                                                color={getCertificationChipColor(product.certificationStatus)}
                                                sx={{ borderRadius: '6px', fontWeight: 600, height: 24, fontSize: '0.75rem' }}
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
                                                sx={{ borderColor: product.stockQuantity > 10 ? 'rgba(0,0,0,0.12)' : 'error.main' }}
                                            />
                                        </TableCell>
                                        <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                                        <TableCell align="right">
                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
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
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Footer */}
            {
                products.length > 0 && (
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            Showing <Typography component="span" variant="body2" fontWeight={700} color="text.primary">{startIndex + 1}</Typography> to <Typography component="span" variant="body2" fontWeight={700} color="text.primary">{Math.min(endIndex, products.length)}</Typography> of <Typography component="span" variant="body2" fontWeight={700} color="text.primary">{products.length}</Typography> products
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <IconButton
                                size="small"
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                sx={{ color: 'text.secondary', '&:disabled': { opacity: 0.3 } }}
                            >
                                <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
                            </IconButton>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                                // Logic to show limited page numbers
                                if (
                                    totalPages > 7 &&
                                    pageNum !== 1 &&
                                    pageNum !== totalPages &&
                                    (pageNum < page - 1 || pageNum > page + 1) &&
                                    !(page <= 4 && pageNum <= 5) &&
                                    !(page >= totalPages - 3 && pageNum >= totalPages - 4)
                                ) {
                                    if (pageNum === 2 || pageNum === totalPages - 1) {
                                        return <Typography key={`dots-${pageNum}`} color="text.secondary" sx={{ mx: 0.5 }}>...</Typography>;
                                    }
                                    return null;
                                }

                                const isActive = pageNum === page;
                                return (
                                    <Box
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 1,
                                            bgcolor: isActive ? '#22C55E' : 'transparent',
                                            color: isActive ? 'white' : 'text.secondary',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.875rem',
                                            fontWeight: isActive ? 700 : 600,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: isActive ? '#16A34A' : (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'grey.100'),
                                                color: isActive ? 'white' : 'text.primary'
                                            },
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {pageNum}
                                    </Box>
                                );
                            })}

                            <IconButton
                                size="small"
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages}
                                sx={{ color: 'text.secondary', '&:disabled': { opacity: 0.3 } }}
                            >
                                <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                        </Stack>
                    </Box>
                )
            }
        </Box >
    );
};

export default ProductTable;
