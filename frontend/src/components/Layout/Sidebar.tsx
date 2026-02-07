'use client';

import React from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/GridView';
import BusinessIcon from '@mui/icons-material/PeopleOutline';
import InventoryIcon from '@mui/icons-material/Inventory2Outlined';
import NatureIcon from '@mui/icons-material/Nature';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const DRAWER_WIDTH = 240;

interface SidebarProps {
    mobileOpen?: boolean;
    onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose }) => {
    const theme = useTheme();
    const pathname = usePathname();

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Suppliers', icon: <BusinessIcon />, path: '/suppliers' },
        { text: 'Products', icon: <InventoryIcon />, path: '/products' },
    ];

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1,
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                    }}
                >
                    <NatureIcon fontSize="small" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.02em' }}>
                    GreenTrade
                </Typography>
            </Box>

            <Box sx={{ overflow: 'auto', px: 2 }}>
                <List>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    component={Link}
                                    href={item.path}
                                    selected={isActive}
                                    onClick={() => onClose && onClose()}
                                    sx={{
                                        borderRadius: 2,
                                        '&.Mui-selected': {
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'primary.dark',
                                            },
                                            '& .MuiListItemIcon-root': {
                                                color: 'white',
                                            },
                                        },
                                        '&:hover': {
                                            backgroundColor: theme.palette.mode === 'light' ? 'rgba(34, 197, 94, 0.08)' : 'rgba(34, 197, 94, 0.15)',
                                        },
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 40,
                                            color: isActive ? 'white' : 'text.secondary',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontWeight: isActive ? 600 : 500,
                                            fontSize: '0.925rem',
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        >
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: DRAWER_WIDTH,
                        borderRight: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: '10px 0 15px -3px rgba(0,0,0,0.05)',
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: DRAWER_WIDTH,
                        borderRight: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.paper,
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
