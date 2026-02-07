'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    TextField,
    InputAdornment,
    Popover,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    CircularProgress,
    Divider,
} from '@mui/material';
import NatureIcon from '@mui/icons-material/Nature';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { SearchResult } from '@/types';

const GlobalSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<{ suppliers: SearchResult[]; products: SearchResult[] }>({
        suppliers: [],
        products: [],
    });
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const performSearch = useCallback(async (searchTerm: string) => {
        if (!searchTerm.trim()) {
            setResults({ suppliers: [], products: [] });
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await api.get(`/search?q=${encodeURIComponent(searchTerm)}`);
            const allResults: SearchResult[] = response.data.data;

            const grouped = {
                suppliers: allResults.filter(r => r.type === 'supplier'),
                products: allResults.filter(r => r.type === 'product'),
            };
            setResults(grouped);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        if (query.length > 1) {
            setAnchorEl(searchRef.current);
            debounceTimer.current = setTimeout(() => {
                performSearch(query);
            }, 500);
        } else {
            setAnchorEl(null);
            setResults({ suppliers: [], products: [] });
        }

        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, [query, performSearch]);

    const handleResultClick = (type: string, name: string) => {
        setQuery('');
        setAnchorEl(null);
        if (type === 'supplier') {
            router.push(`/suppliers?search=${encodeURIComponent(name)}`);
        } else {
            router.push(`/products?search=${encodeURIComponent(name)}`);
        }
    };

    return (
        <Box ref={searchRef} sx={{ position: 'relative', width: { xs: '150px', sm: '300px' }, mx: 2 }}>
            <TextField
                size="small"
                placeholder="Search hub..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'transparent' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                    '& .MuiInputBase-input::placeholder': { color: 'rgba(255, 255, 255, 0.7)', opacity: 1 },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                        </InputAdornment>
                    ),
                    endAdornment: loading ? <CircularProgress size={20} color="inherit" /> : null,
                }}
            />
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                disableAutoFocus
                disableEnforceFocus
                sx={{ pointerEvents: 'none' }}
                slotProps={{
                    paper: {
                        sx: {
                            width: 300,
                            mt: 1,
                            pointerEvents: 'auto',
                            maxHeight: 400,
                            overflowY: 'auto'
                        }
                    }
                }}
            >
                <List dense>
                    {results.suppliers.length > 0 && (
                        <>
                            <Divider textAlign="left" sx={{ py: 1 }}><Typography variant="caption" color="text.secondary">SUPPLIERS</Typography></Divider>
                            {results.suppliers.map(s => (
                                <ListItem key={s.id} disablePadding>
                                    <ListItemButton onClick={() => handleResultClick('supplier', s.name)}>
                                        <ListItemIcon sx={{ minWidth: 36 }}><BusinessIcon fontSize="small" color="primary" /></ListItemIcon>
                                        <ListItemText primary={s.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </>
                    )}
                    {results.products.length > 0 && (
                        <>
                            <Divider textAlign="left" sx={{ py: 1 }}><Typography variant="caption" color="text.secondary">PRODUCTS</Typography></Divider>
                            {results.products.map(p => (
                                <ListItem key={p.id} disablePadding>
                                    <ListItemButton onClick={() => handleResultClick('product', p.name)}>
                                        <ListItemIcon sx={{ minWidth: 36 }}><InventoryIcon fontSize="small" color="secondary" /></ListItemIcon>
                                        <ListItemText primary={p.name} secondary={p.additionalInfo?.category} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </>
                    )}
                    {!loading && results.suppliers.length === 0 && results.products.length === 0 && (
                        <ListItem><ListItemText primary="No results found" /></ListItem>
                    )}
                </List>
            </Popover>
        </Box>
    );
};

const Navbar = () => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'primary.main' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        component={Link}
                        href="/"
                    >
                        <NatureIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component={Link}
                        href="/"
                        sx={{
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            color: 'inherit',
                            display: { xs: 'none', sm: 'block' }
                        }}
                    >
                        GreenTrade Hub
                    </Typography>
                </Box>

                <GlobalSearch />

                <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 } }}>
                    <Button color="inherit" component={Link} href="/" sx={{ display: { xs: 'none', md: 'inline-flex' } }}>Dashboard</Button>
                    <Button color="inherit" component={Link} href="/suppliers">Suppliers</Button>
                    <Button color="inherit" component={Link} href="/products">Products</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
