import React from 'react';
import { Card, CardContent, Typography, Box, useTheme, Paper } from '@mui/material';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    trend?: {
        text: string;
        type: 'stable' | 'positive' | 'negative' | 'pending';
    };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, trend }) => {
    const theme = useTheme();

    const getTrendColor = (type: string) => {
        switch (type) {
            case 'positive': return '#22C55E';
            case 'negative': return '#EF4444';
            case 'pending': return '#F59E0B';
            case 'stable': return '#22C55E'; // Matching mockup "Stable" color
            default: return theme.palette.text.secondary;
        }
    };

    return (
        <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        {title}
                    </Typography>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                            bgcolor: `${color}15`,
                            color: color,
                        }}
                    >
                        {(React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { fontSize: 'small' }) : icon)}
                    </Paper>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: '-0.03em' }}>
                    {value}
                </Typography>
                {trend && (
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 700,
                            color: getTrendColor(trend.type),
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                        }}
                    >
                        {trend.text}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default StatCard;
