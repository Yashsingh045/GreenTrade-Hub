'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    Container,
    Typography,
    Box,
    Button,
    TextField,
    InputAdornment,
    CircularProgress,
    Alert,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SupplierTable from '@/components/Suppliers/SupplierTable';
import AddSupplierModal from '@/components/Suppliers/AddSupplierModal';
import SupplierDetailModal from '@/components/Suppliers/SupplierDetailModal';
import api from '@/lib/axios';
import { Supplier } from '@/types';

const SuppliersContent = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const query = searchParams.get('search');
        if (query) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    useEffect(() => {
        const viewId = searchParams.get('view');
        if (viewId && suppliers.length > 0) {
            setSelectedSupplierId(viewId);
            setIsDetailModalOpen(true);
        }
    }, [searchParams, suppliers]);

    const fetchSuppliers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/suppliers');
            const data = response.data.data;
            setSuppliers(data);
            setFilteredSuppliers(data);
            setError(null);
        } catch (err: any) {
            console.error('Error fetching suppliers:', err);
            setError('Failed to load suppliers. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSuppliers();
    }, [fetchSuppliers]);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredSuppliers(suppliers);
            return;
        }
        const query = searchQuery.toLowerCase();
        const filtered = suppliers.filter(
            (s) =>
                s.name.toLowerCase().includes(query) ||
                s.email.toLowerCase().includes(query) ||
                s.country.toLowerCase().includes(query)
        );
        setFilteredSuppliers(filtered);
    }, [searchQuery, suppliers]);

    const handleViewDetail = (id: string) => {
        setSelectedSupplierId(id);
        setIsDetailModalOpen(true);
    };

    if (loading && suppliers.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5, color: 'text.primary' }}>Supplier Directory</Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        Manage and oversee your global network of sustainable partners.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setIsAddModalOpen(true);
                    }}
                    sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, px: 3 }}
                >
                    Add Supplier
                </Button>
            </Box>

            <Paper variant="outlined" sx={{ p: 1.5, mb: 4, borderRadius: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Search by name, email, or country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                            <InputAdornment position="start" sx={{ ml: 1, mr: 1 }}>
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                        sx: { height: 40, fontSize: '0.95rem' }
                    }}
                />
            </Paper>

            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

            <SupplierTable
                suppliers={filteredSuppliers}
                onViewDetail={handleViewDetail}
            />

            <AddSupplierModal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    fetchSuppliers();
                }}
            />

            <SupplierDetailModal
                open={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                supplierId={selectedSupplierId}
            />

        </Container>
    );
};

const SuppliersPage = () => (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>}>
        <SuppliersContent />
    </Suspense>
);

export default SuppliersPage;
