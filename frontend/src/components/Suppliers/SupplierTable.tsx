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
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Supplier } from '@/types';

interface SupplierTableProps {
    suppliers: Supplier[];
}

const SupplierTable: React.FC<SupplierTableProps> = ({ suppliers }) => {
    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="suppliers table">
                <TableHead sx={{ bgcolor: 'grey.100' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Country</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Contact Person</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {suppliers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                No suppliers found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        suppliers.map((supplier) => (
                            <TableRow
                                key={supplier.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'grey.50' } }}
                            >
                                <TableCell component="th" scope="row">
                                    {supplier.name}
                                </TableCell>
                                <TableCell>{supplier.email}</TableCell>
                                <TableCell>{supplier.country}</TableCell>
                                <TableCell>{supplier.contactPerson || '-'}</TableCell>
                                <TableCell>{supplier.phone || '-'}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="View Details">
                                        <IconButton size="small" color="primary">
                                            <VisibilityIcon />
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

export default SupplierTable;
