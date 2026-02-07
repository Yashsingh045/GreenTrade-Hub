'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2e7d32', // Green
        },
        secondary: {
            main: '#f57c00', // Orange
        },
        background: {
            default: '#f4f7f6',
        },
    },
    typography: {
        fontFamily: 'var(--font-roboto), Arial, sans-serif',
        h1: {
            fontWeight: 700,
        },
        h4: {
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                },
            },
        },
    },
});

export default theme;
