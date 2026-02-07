import React from 'react';
import { Card, CardContent, Typography, Box, Paper } from '@mui/material';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                            bgcolor: `${color}15`,
                            color: color,
                        }}
                    >
                        {icon}
                    </Paper>
                    <Typography variant="subtitle2" sx={{ ml: 2, color: 'text.secondary', fontWeight: 500 }}>
                        {title}
                    </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StatCard;
