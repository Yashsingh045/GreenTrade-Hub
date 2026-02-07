'use client';

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getDesignTokens } from '@/lib/theme';
import { PaletteMode } from '@mui/material';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = React.useState<PaletteMode>('light');

    React.useEffect(() => {
        const savedMode = localStorage.getItem('theme-mode') as PaletteMode;
        if (savedMode) {
            setMode(savedMode);
        }
    }, []);

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === 'light' ? 'dark' : 'light';
                    localStorage.setItem('theme-mode', newMode);
                    return newMode;
                });
            },
        }),
        [],
    );

    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </ColorModeContext.Provider>
        </AppRouterCacheProvider>
    );
}
