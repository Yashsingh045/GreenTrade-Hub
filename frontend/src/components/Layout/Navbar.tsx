'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import NatureIcon from '@mui/icons-material/Nature';
import Link from 'next/link';

const Navbar = () => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'primary.main' }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <NatureIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    GreenTrade Hub
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" component={Link} href="/">Dashboard</Button>
                    <Button color="inherit" component={Link} href="/suppliers">Suppliers</Button>
                    <Button color="inherit" component={Link} href="/products">Products</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
