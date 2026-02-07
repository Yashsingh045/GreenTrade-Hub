import { PaletteMode } from '@mui/material';
import { createTheme, ThemeOptions } from '@mui/material/styles';

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode,
        primary: {
            main: '#22C55E', // Vibrant Green (Tailwind green-500)
            light: '#4ADE80',
            dark: '#16A34A',
        },
        secondary: {
            main: '#F97316', // Orange
        },
        background: {
            default: mode === 'light' ? '#F8FAFC' : '#0F172A',
            paper: mode === 'light' ? '#FFFFFF' : '#1E293B',
        },
        text: {
            primary: mode === 'light' ? '#1E293B' : '#F8FAFC',
            secondary: mode === 'light' ? '#64748B' : '#94A3B8',
        },
    },
    typography: {
        fontFamily: 'var(--font-roboto), Inter, system-ui, sans-serif',
        h4: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        h6: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: mode === 'dark' ? '#475569 #0F172A' : '#CBD5E1 #F1F5F9',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        backgroundColor: mode === 'dark' ? '#0F172A' : '#F1F5F9',
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: mode === 'dark' ? '#475569' : '#CBD5E1',
                        minHeight: 24,
                        border: mode === 'dark' ? '3px solid #0F172A' : '3px solid #F1F5F9',
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: mode === 'dark' ? '#64748B' : '#94A3B8',
                    },
                    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                        backgroundColor: mode === 'dark' ? '#0F172A' : '#F1F5F9',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '8px 16px',
                },
                containedPrimary: {
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                    },
                    transition: 'all 0.2s ease-in-out',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: mode === 'light'
                        ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
                        : '0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)',
                    border: `1px solid ${mode === 'light' ? '#F1F5F9' : '#334155'}`,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: mode === 'light' ? '#FFFFFF' : '#1E293B',
                    '&.MuiPopover-paper': {
                        boxShadow: mode === 'light'
                            ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                            : '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)',
                        border: `1px solid ${mode === 'light' ? '#E2E8F0' : '#334155'}`,
                    }
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(8px)',
                    color: mode === 'light' ? '#1E293B' : '#F8FAFC',
                    boxShadow: 'none',
                    borderBottom: `1px solid ${mode === 'light' ? '#E2E8F0' : '#1E293B'}`,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: mode === 'light' ? '#94A3B8' : '#64748B',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: mode === 'light' ? '#22C55E' : '#4ADE80',
                        borderWidth: 2,
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: mode === 'light' ? '#E2E8F0' : '#334155',
                    },
                    backgroundColor: mode === 'light' ? 'transparent' : 'rgba(15, 23, 42, 0.3)',
                },
                input: {
                    color: mode === 'light' ? '#1E293B' : '#F8FAFC',
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: mode === 'light' ? '#64748B' : '#94A3B8',
                    '&.Mui-focused': {
                        color: mode === 'light' ? '#22C55E' : '#4ADE80',
                    }
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: mode === 'light' ? '#64748B' : '#94A3B8',
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: `1px solid ${mode === 'light' ? '#F1F5F9' : '#334155'}`,
                    color: mode === 'light' ? '#1E293B' : '#CBD5E1',
                },
                head: {
                    color: mode === 'light' ? '#64748B' : '#94A3B8',
                    backgroundColor: mode === 'light' ? '#F8FAFC' : '#0F172A',
                    fontWeight: 600,
                }
            }
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: mode === 'light' ? '#F8FAFC !important' : 'rgba(30, 41, 59, 0.5) !important',
                    }
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: mode === 'light' ? '#F1F5F9' : '#334155',
                    },
                    '&.Mui-selected': {
                        backgroundColor: mode === 'light' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.2)',
                        '&:hover': {
                            backgroundColor: mode === 'light' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.3)',
                        }
                    }
                }
            }
        },
    },
});

const theme = createTheme(getDesignTokens('light'));

export default theme;
