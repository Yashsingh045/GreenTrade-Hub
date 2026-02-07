'use client';

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
    Box,
    Typography,
    Chip,
    Stack,
    useTheme,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import BiotechIcon from '@mui/icons-material/Biotech';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Supplier } from '@/types';

interface SupplierTableProps {
    suppliers: Supplier[];
    onViewDetail: (id: string) => void;
}

const ITEMS_PER_PAGE = 5;

const SupplierTable: React.FC<SupplierTableProps> = ({ suppliers, onViewDetail }) => {
    const theme = useTheme();
    const [page, setPage] = useState(1);

    // Calculate pagination values
    const totalPages = Math.ceil(suppliers.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentSuppliers = suppliers.slice(startIndex, endIndex);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    // Helper to get consistent icons based on supplier name
    const getSupplierIcon = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('farm') || n.includes('harvest')) return { icon: <AgricultureIcon fontSize="small" />, color: '#DCFCE7', text: '#166534' };
        if (n.includes('bio') || n.includes('tech')) return { icon: <BiotechIcon fontSize="small" />, color: '#DBEAFE', text: '#1E40AF' };
        if (n.includes('organic') || n.includes('eco')) return { icon: <AutoAwesomeIcon fontSize="small" />, color: '#FEF3C7', text: '#92400E' };
        return { icon: <BusinessIcon fontSize="small" />, color: '#F3F4F6', text: '#374151' };
    };

    return (
        <Box>
            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
                <Table sx={{ minWidth: 650 }} aria-label="suppliers table">
                    <TableHead>
                        <TableRow sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : '#F9FAFB' }}>
                            <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary', py: 2 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary', py: 2 }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary', py: 2 }}>Country</TableCell>
                            <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary', py: 2 }}>Contact Person</TableCell>
                            <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary', py: 2 }}>Phone</TableCell>
                            <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary', py: 2 }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {suppliers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 8, color: 'text.secondary' }}>
                                    <Box sx={{ opacity: 0.5 }}>
                                        <BusinessIcon sx={{ fontSize: 48, mb: 1 }} />
                                        <Typography variant="body1">No suppliers found.</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            currentSuppliers.map((supplier) => {
                                const branding = getSupplierIcon(supplier.name);
                                return (
                                    <TableRow
                                        key={supplier.id}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'grey.50' },
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={{
                                                    p: 1.2,
                                                    borderRadius: 2,
                                                    bgcolor: branding.color,
                                                    color: branding.text,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    {branding.icon}
                                                </Box>
                                                <Typography variant="body2" fontWeight={700}>{supplier.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{supplier.email}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={supplier.country}
                                                size="small"
                                                sx={{
                                                    height: 24,
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#F3F4F6',
                                                    color: 'text.primary',
                                                    borderRadius: '6px'
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.875rem' }}>{supplier.contactPerson || '-'}</TableCell>
                                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{supplier.phone || '-'}</TableCell>
                                        <TableCell align="right">
                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                <Tooltip title="View Details">
                                                    <IconButton
                                                        size="small"
                                                        color="info"
                                                        onClick={() => onViewDetail(supplier.id)}
                                                    >
                                                        <VisibilityIcon fontSize="small" />
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
            {suppliers.length > 0 && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        Showing <Typography component="span" variant="body2" fontWeight={700} color="text.primary">{startIndex + 1}</Typography> to <Typography component="span" variant="body2" fontWeight={700} color="text.primary">{Math.min(endIndex, suppliers.length)}</Typography> of <Typography component="span" variant="body2" fontWeight={700} color="text.primary">{suppliers.length}</Typography> suppliers
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
            )}
        </Box>
    );
};

export default SupplierTable;
