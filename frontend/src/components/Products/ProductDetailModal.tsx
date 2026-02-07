import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid,
    Box,
    Chip,
    Divider,
} from '@mui/material';
import { Product } from '@/types';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import BrushIcon from '@mui/icons-material/Brush';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import CategoryIcon from '@mui/icons-material/Category';

interface ProductDetailModalProps {
    open: boolean;
    onClose: () => void;
    product: Product | null;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ open, onClose, product }) => {
    if (!product) return null;

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'ORGANIC_FOOD':
                return { icon: <AgricultureIcon />, color: '#DCFCE7', text: '#166534', label: 'Organic Food' };
            case 'HANDMADE':
                return { icon: <BrushIcon />, color: '#FEF3C7', text: '#92400E', label: 'Handmade' };
            case 'SUSTAINABLE_GOODS':
                return { icon: <EmojiNatureIcon />, color: '#DBEAFE', text: '#1E40AF', label: 'Sustainable' };
            default:
                return { icon: <CategoryIcon />, color: '#F3F4F6', text: '#374151', label: category };
        }
    };

    const categoryStyle = getCategoryIcon(product.category);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: categoryStyle.color,
                    color: categoryStyle.text,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {categoryStyle.icon}
                </Box>
                {product.name}
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="overline" color="text.secondary">Description</Typography>
                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                            {product.description || 'No description available for this product.'}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Divider sx={{ my: 1 }} />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography variant="overline" color="text.secondary">Price</Typography>
                        <Typography variant="h6" fontWeight="bold">
                            ${Number(product.price).toFixed(2)}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography variant="overline" color="text.secondary">Stock Status</Typography>
                        <Box sx={{ mt: 0.5 }}>
                            <Chip
                                label={`${product.stockQuantity} in stock`}
                                color={product.stockQuantity > 10 ? 'success' : product.stockQuantity > 0 ? 'warning' : 'error'}
                                size="small"
                                variant="filled"
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography variant="overline" color="text.secondary">Category</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{categoryStyle.label}</Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography variant="overline" color="text.secondary">Certification</Typography>
                        <Box sx={{ mt: 0.5 }}>
                            <Chip
                                label={product.certificationStatus.replace('_', ' ')}
                                size="small"
                                sx={{ borderRadius: 1, fontWeight: 500 }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="overline" color="text.secondary">Supplier</Typography>
                        <Typography variant="body1" fontWeight={500}>
                            {product.supplier?.name || 'Unknown Supplier'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {product.supplier?.country}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} variant="contained" color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDetailModal;
