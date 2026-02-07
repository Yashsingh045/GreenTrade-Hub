'use client';

import React, { useEffect, useState, useCallback } from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SupplierTable from '@/components/Suppliers/SupplierTable';
import AddSupplierModal from '@/components/Suppliers/AddSupplierModal';
import api from '@/lib/axios';
import { Supplier } from '@/types';

const SuppliersPage = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchSuppliers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/suppliers');
            const data = response.data.data;
            setSuppliers(data);
            setFilteredSuppliers(data);
            setError(null); // Clear error on success
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

    if (loading && suppliers.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    Suppliers Management
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Supplier
                </Button>
            </Box>

            <Paper sx={{ p: 2, mb: 3 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search suppliers by name, email, or country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Paper>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <SupplierTable suppliers={filteredSuppliers} />

            <AddSupplierModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    fetchSuppliers();
                }}
            />
        </Container>
    );
};

export default SuppliersPage;
