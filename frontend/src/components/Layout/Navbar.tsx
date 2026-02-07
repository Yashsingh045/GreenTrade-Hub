'use client';

import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
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
    useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { SearchResult } from '@/types';
import { ColorModeContext } from '@/components/ThemeRegistry';

const GlobalSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<{ suppliers: SearchResult[]; products: SearchResult[] }>({
        suppliers: [],
        products: [],
    });
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const theme = useTheme();
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

    const handleResultClick = (type: string, name: string, id: string) => {
        setQuery('');
        setAnchorEl(null);
        if (type === 'supplier') {
            router.push(`/suppliers?search=${encodeURIComponent(name)}&view=${id}`);
        } else {
            router.push(`/products?search=${encodeURIComponent(name)}&view=${id}`);
        }
    };

    return (
        <Box ref={searchRef} sx={{ position: 'relative', width: { xs: '200px', sm: '400px' } }}>
            <TextField
                size="small"
                fullWidth
                placeholder="Search suppliers, products by name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        bgcolor: theme.palette.mode === 'light' ? '#F1F5F9' : '#1E293B',
                        borderRadius: 2,
                        '& fieldset': { borderColor: 'transparent' },
                        '&:hover fieldset': { borderColor: theme.palette.primary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                        </InputAdornment>
                    ),
                    endAdornment: loading ? <CircularProgress size={18} color="inherit" /> : null,
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
                sx={{ mt: 1 }}
                slotProps={{
                    paper: {
                        sx: {
                            width: 400,
                            borderRadius: 3,
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            maxHeight: 400,
                            overflowY: 'auto'
                        }
                    }
                }}
            >
                <List dense sx={{ py: 1 }}>
                    {results.suppliers.length > 0 && (
                        <>
                            <Divider textAlign="left" sx={{ px: 2, py: 1 }}>
                                <Typography variant="caption" fontWeight={700} color="primary" sx={{ letterSpacing: '0.05em' }}>
                                    SUPPLIERS
                                </Typography>
                            </Divider>
                            {results.suppliers.map(s => (
                                <ListItem key={s.id} disablePadding>
                                    <ListItemButton onClick={() => handleResultClick('supplier', s.name, s.id)}>
                                        <ListItemIcon sx={{ minWidth: 36 }}><BusinessIcon fontSize="small" /></ListItemIcon>
                                        <ListItemText primary={s.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </>
                    )}
                    {results.products.length > 0 && (
                        <>
                            <Divider textAlign="left" sx={{ px: 2, py: 1 }}>
                                <Typography variant="caption" fontWeight={700} color="secondary" sx={{ letterSpacing: '0.05em' }}>
                                    PRODUCTS
                                </Typography>
                            </Divider>
                            {results.products.map(p => (
                                <ListItem key={p.id} disablePadding>
                                    <ListItemButton onClick={() => handleResultClick('product', p.name, p.id)}>
                                        <ListItemIcon sx={{ minWidth: 36 }}><InventoryIcon fontSize="small" /></ListItemIcon>
                                        <ListItemText primary={p.name} secondary={p.additionalInfo?.category?.replace('_', ' ')} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </>
                    )}
                    {!loading && results.suppliers.length === 0 && results.products.length === 0 && (
                        <ListItem><ListItemText primary="No results found" sx={{ textAlign: 'center', py: 2, color: 'text.secondary' }} /></ListItem>
                    )}
                </List>
            </Popover>
        </Box>
    );
};

import MenuIcon from '@mui/icons-material/Menu';

interface NavbarProps {
    onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - 240px)` },
                ml: { sm: `240px` },
                bgcolor: 'background.default',
                color: 'text.primary',
                boxShadow: 'none',
                borderBottom: `1px solid ${theme.palette.divider}`,
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={onMenuClick}
                        sx={{ mr: 1, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <GlobalSearch />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                        onClick={colorMode.toggleColorMode}
                        color="inherit"
                        sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 2,
                            p: 1
                        }}
                    >
                        {theme.palette.mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                    </IconButton>
                    <Box
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.875rem',
                            "&:hover": {
                                "&::after": {
                                    content: "'Admin'",
                                    position: 'absolute',
                                    top: '100%',
                                    right: '0%',
                                    transform: 'translateX(-50%)',
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.875rem',
                                    p: 1,
                                    borderRadius: 2,
                                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                    maxHeight: 400,
                                    overflowY: 'hidden'
                                }
                            }
                        }}
                    >
                        AD
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
