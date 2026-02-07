'use client';

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    Box,
    Typography,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import api from '@/lib/axios';
import { Product, Supplier } from '@/types';

interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    product?: Product | null;
    initialCertificationStatus?: string;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, onSuccess, product, initialCertificationStatus }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'HANDMADE',
        certificationStatus: 'PENDING',
        price: '',
        stockQuantity: '',
        description: '',
        supplierId: '',
    });
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loadingSuppliers, setLoadingSuppliers] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open) {
            fetchSuppliers();
            if (product) {
                setFormData({
                    name: product.name,
                    category: product.category,
                    certificationStatus: product.certificationStatus,
                    price: product.price.toString(),
                    stockQuantity: product.stockQuantity.toString(),
                    description: product.description || '',
                    supplierId: product.supplierId.toString(),
                });
            } else {
                setFormData({
                    name: '',
                    category: 'HANDMADE',
                    certificationStatus: initialCertificationStatus || 'PENDING',
                    price: '',
                    stockQuantity: '0',
                    description: '',
                    supplierId: '',
                });
            }
            setErrors({});
        }
    }, [open, product]);

    const fetchSuppliers = async () => {
        setLoadingSuppliers(true);
        try {
            const response = await api.get('/suppliers');
            setSuppliers(response.data.data);
        } catch (err) {
            console.error('Error fetching suppliers:', err);
        } finally {
            setLoadingSuppliers(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            newErrors.price = 'Valid price is required';
        }
        if (formData.stockQuantity === '' || isNaN(Number(formData.stockQuantity)) || Number(formData.stockQuantity) < 0) {
            newErrors.stockQuantity = 'Valid stock quantity is required';
        }
        if (!formData.supplierId) newErrors.supplierId = 'Supplier is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);
        const data = {
            ...formData,
            price: Number(formData.price),
            stockQuantity: Number(formData.stockQuantity),
            description: formData.description.trim() || null,
        };

        try {
            if (product) {
                await api.put(`/products/${product.id}`, data);
            } else {
                await api.post('/products', data);
            }
            onSuccess();
            onClose();
        } catch (error: any) {
            console.error('Error saving product:', error);
            if (error.response?.data?.errors) {
                const backendErrors: Record<string, string> = {};
                error.response.data.errors.forEach((err: any) => {
                    backendErrors[err.path[0]] = err.message;
                });
                setErrors(backendErrors);
            } else {
                setErrors({ submit: 'Failed to save product. Please try again.' });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle sx={{ fontWeight: 'bold' }}>
                    {product ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid container size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Product Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                required
                            />
                        </Grid>
                        <Grid container size={{ xs: 12, sm: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="HANDMADE">Handmade</MenuItem>
                                <MenuItem value="ORGANIC_FOOD">Organic Food</MenuItem>
                                <MenuItem value="SUSTAINABLE_GOODS">Sustainable Goods</MenuItem>
                                <MenuItem value="RECYCLED_MATERIAL">Recycled Material</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid container size={{ xs: 12, sm: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Certification Status"
                                name="certificationStatus"
                                value={formData.certificationStatus}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="PENDING">Pending</MenuItem>
                                <MenuItem value="CERTIFIED">Certified</MenuItem>
                                <MenuItem value="NOT_CERTIFIED">Not Certified</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid container size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="Price ($)"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                error={!!errors.price}
                                helperText={errors.price}
                                inputProps={{ step: "0.01" }}
                                required
                            />
                        </Grid>
                        <Grid container size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="Stock"
                                name="stockQuantity"
                                type="number"
                                value={formData.stockQuantity}
                                onChange={handleChange}
                                error={!!errors.stockQuantity}
                                helperText={errors.stockQuantity}
                                required
                            />
                        </Grid>
                        <Grid container size={{ xs: 12, sm: 4 }}>
                            <TextField
                                select
                                fullWidth
                                label="Supplier"
                                name="supplierId"
                                value={formData.supplierId}
                                onChange={handleChange}
                                error={!!errors.supplierId}
                                helperText={errors.supplierId}
                                disabled={loadingSuppliers}
                                required
                            >
                                {loadingSuppliers ? (
                                    <MenuItem disabled>Loading suppliers...</MenuItem>
                                ) : (
                                    suppliers.map((s) => (
                                        <MenuItem key={s.id} value={s.id}>
                                            {s.name}
                                        </MenuItem>
                                    ))
                                )}
                            </TextField>
                        </Grid>
                        <Grid container size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                multiline
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter product description..."
                            />
                        </Grid>
                    </Grid>
                    {errors.submit && (
                        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                            {errors.submit}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Button onClick={onClose} color="inherit">Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={submitting}
                    >
                        {submitting ? 'Saving...' : (product ? 'Update' : 'Create')}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ProductModal;
