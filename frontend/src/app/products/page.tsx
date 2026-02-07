'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    Container,
    Typography,
    Box,
    Button,
    Grid,
    TextField,
    MenuItem,
    CircularProgress,
    Alert,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ProductTable from '@/components/Products/ProductTable';
import ProductModal from '@/components/Products/ProductModal';
import api from '@/lib/axios';
import { Product } from '@/types';

const ProductsContent = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        category: '',
        certificationStatus: '',
        search: '',
    });
    const searchParams = useSearchParams();

    useEffect(() => {
        const query = searchParams.get('search');
        if (query) {
            setFilters(prev => ({ ...prev, search: query }));
        }
    }, [searchParams]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.category) params.append('category', filters.category);
            if (filters.certificationStatus) params.append('certification_status', filters.certificationStatus);
            if (filters.search) params.append('search', filters.search);

            const response = await api.get(`/products?${params.toString()}`);
            setProducts(response.data.data);
            setError(null);
        } catch (err: any) {
            console.error('Error fetching products:', err);
            setError('Failed to load products. Please check if the backend is running.');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedProduct(null);
        setModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setProductToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!productToDelete) return;
        try {
            await api.delete(`/products/${productToDelete}`);
            fetchProducts();
            setDeleteDialogOpen(false);
            setProductToDelete(null);
        } catch (err) {
            console.error('Error deleting product:', err);
            alert('Failed to delete product.');
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    Products Management
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                >
                    Add Product
                </Button>
            </Box>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                    <Grid container size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            label="Search Products"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid container size={{ xs: 12, sm: 3 }}>
                        <TextField
                            select
                            fullWidth
                            label="Filter by Category"
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            size="small"
                        >
                            <MenuItem value="">All Categories</MenuItem>
                            <MenuItem value="HANDMADE">Handmade</MenuItem>
                            <MenuItem value="ORGANIC_FOOD">Organic Food</MenuItem>
                            <MenuItem value="SUSTAINABLE_GOODS">Sustainable Goods</MenuItem>
                            <MenuItem value="RECYCLED_MATERIAL">Recycled Material</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid container size={{ xs: 12, sm: 3 }}>
                        <TextField
                            select
                            fullWidth
                            label="Filter by Certification"
                            name="certificationStatus"
                            value={filters.certificationStatus}
                            onChange={handleFilterChange}
                            size="small"
                        >
                            <MenuItem value="">All Statuses</MenuItem>
                            <MenuItem value="PENDING">Pending</MenuItem>
                            <MenuItem value="CERTIFIED">Certified</MenuItem>
                            <MenuItem value="NOT_CERTIFIED">Not Certified</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid container size={{ xs: 12, sm: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => setFilters({ category: '', certificationStatus: '', search: '' })}
                            size="medium"
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {loading && products.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <ProductTable
                    products={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <ProductModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSuccess={fetchProducts}
                product={selectedProduct}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this product? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ pb: 2, px: 3 }}>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

const ProductsPage = () => (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>}>
        <ProductsContent />
    </Suspense>
);

export default ProductsPage;
