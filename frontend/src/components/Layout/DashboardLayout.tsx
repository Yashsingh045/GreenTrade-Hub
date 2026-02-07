'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Navbar onMenuClick={handleDrawerToggle} />
                <Box
                    component="main"
                    sx={{
                        pt: { xs: 8, sm: 9 },
                        px: { xs: 2, sm: 4 },
                        pb: 4,
                        flexGrow: 1,
                        bgcolor: 'background.default',
                        width: '100%'
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
