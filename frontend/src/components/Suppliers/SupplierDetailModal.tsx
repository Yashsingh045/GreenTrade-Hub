'use client';

import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    IconButton,
    Grid,
    CircularProgress,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOnOutlined';
import InventoryIcon from '@mui/icons-material/Inventory2Outlined';
import PersonIcon from '@mui/icons-material/PersonOutline';
import api from '@/lib/axios';
import { SupplierWithProducts } from '@/types';

interface SupplierDetailModalProps {
    open: boolean;
    onClose: () => void;
    supplierId: string | null;
}

const SupplierDetailModal: React.FC<SupplierDetailModalProps> = ({ open, onClose, supplierId }) => {
    const [supplier, setSupplier] = useState<SupplierWithProducts | null>(null);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        if (open && supplierId) {
            const fetchDetails = async () => {
                setLoading(true);
                try {
                    const response = await api.get(`/suppliers/${supplierId}`);
                    setSupplier(response.data.data);
                } catch (error) {
                    console.error('Error fetching supplier details:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchDetails();
        } else {
            setSupplier(null);
        }
    }, [open, supplierId]);

    const getStatusChip = (status: string) => {
        const colors: Record<string, 'success' | 'warning' | 'error'> = {
            CERTIFIED: 'success',
            PENDING: 'warning',
            NOT_CERTIFIED: 'error',
        };
        return (
            <Chip
                label={status.replace('_', ' ')}
                size="small"
                color={colors[status] || 'default'}
                sx={{ fontWeight: 700, fontSize: '0.65rem' }}
            />
        );
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 4, bgcolor: 'background.paper' }
            }}
        >
            <DialogTitle sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'primary.light',
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.9
                    }}>
                        <BusinessIcon />
                    </Box>
                    <Box>
                        <Typography variant="h5" fontWeight={800}>{supplier?.name || 'Loading...'}</Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            SUPPLIER PROFILE
                        </Typography>
                    </Box>
                </Box>
                <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 4, pt: 0 }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress />
                    </Box>
                ) : supplier ? (
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Typography variant="subtitle2" fontWeight={700} color="primary" gutterBottom sx={{ letterSpacing: '0.05em' }}>
                                CONTACT INFORMATION
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <EmailIcon fontSize="small" color="action" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block">Email</Typography>
                                        <Typography variant="body2" fontWeight={600}>{supplier.email}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <PhoneIcon fontSize="small" color="action" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block">Phone</Typography>
                                        <Typography variant="body2" fontWeight={600}>{supplier.phone || 'N/A'}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <PersonIcon fontSize="small" color="action" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block">Contact Person</Typography>
                                        <Typography variant="body2" fontWeight={600}>{supplier.contactPerson || 'N/A'}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <LocationOnIcon fontSize="small" color="action" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block">Country</Typography>
                                        <Chip
                                            label={supplier.country}
                                            size="small"
                                            sx={{ mt: 0.5, fontWeight: 600, bgcolor: 'action.hover' }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 7 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="subtitle2" fontWeight={700} color="secondary" sx={{ letterSpacing: '0.05em' }}>
                                    PRODUCTS CATALOG ({supplier.products.length})
                                </Typography>
                            </Box>
                            <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
                                <List sx={{ p: 0 }}>
                                    {supplier.products.length > 0 ? (
                                        supplier.products.map((product, idx) => (
                                            <React.Fragment key={product.id}>
                                                <ListItem sx={{ py: 1.5 }}>
                                                    <Box sx={{ mr: 2, p: 1, borderRadius: 1.5, bgcolor: 'action.hover' }}>
                                                        <InventoryIcon fontSize="small" color="action" />
                                                    </Box>
                                                    <ListItemText
                                                        primary={<Typography variant="body2" fontWeight={700}>{product.name}</Typography>}
                                                        secondary={product.category.replace('_', ' ')}
                                                        secondaryTypographyProps={{ variant: 'caption', fontWeight: 500 }}
                                                    />
                                                    {getStatusChip(product.certificationStatus)}
                                                </ListItem>
                                                {idx < supplier.products.length - 1 && <Divider />}
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <Box sx={{ p: 4, textAlign: 'center' }}>
                                            <Typography variant="body2" color="text.secondary">No products found for this supplier.</Typography>
                                        </Box>
                                    )}
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography color="error">Could not load supplier data.</Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default SupplierDetailModal;
