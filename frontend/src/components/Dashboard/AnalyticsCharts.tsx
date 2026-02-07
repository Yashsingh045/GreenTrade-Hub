'use client';

import React from 'react';
import { Card, CardContent, Typography, Grid, Box, IconButton, useTheme } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Label,
} from 'recharts';

interface AnalyticsChartsProps {
    categoryData: { name: string; value: number }[];
    certificationData: { name: string; value: number }[];
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ categoryData, certificationData }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    // Map certifications to mockup colors
    const getCertColor = (name: string) => {
        const n = name.toUpperCase();
        if (n.includes('CERTIFIED') && !n.includes('NOT')) return '#22C55E';
        if (n.includes('PENDING')) return '#F59E0B';
        if (n.includes('NOT')) return '#EF4444';
        return theme.palette.primary.main;
    };

    const totalCertifications = certificationData.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ height: 420, position: 'relative' }}>
                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Products by Category</Typography>
                            <IconButton size="small"><MoreHorizIcon /></IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1, width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={categoryData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: theme.palette.text.secondary, fontSize: 11, fontWeight: 500 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}
                                        contentStyle={{
                                            borderRadius: '12px',
                                            border: 'none',
                                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                            backgroundColor: theme.palette.background.paper
                                        }}
                                    />
                                    <Bar dataKey="value" fill="#22C55E" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ height: 420 }}>
                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Certification Status</Typography>
                            <IconButton size="small"><DonutLargeIcon fontSize="small" /></IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ width: { xs: '100%', sm: '60%' }, height: { xs: 240, sm: '100%' }, position: 'relative' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={certificationData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={70}
                                            outerRadius={100}
                                            paddingAngle={4}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {certificationData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={getCertColor(entry.name)} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: '12px',
                                                border: 'none',
                                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                                backgroundColor: theme.palette.background.paper
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                {/* Manual Centered Label */}
                                <Box sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    textAlign: 'center',
                                    pointerEvents: 'none'
                                }}>
                                    <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1, fontSize: { xs: '2rem', sm: '2.5rem' } }}>
                                        {totalCertifications}
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', mt: 0.5, display: 'block' }}>
                                        Total
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Legend */}
                            <Box sx={{ width: { xs: '100%', sm: '40%' }, pl: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 }, display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, flexWrap: 'wrap', gap: { xs: 2, sm: 0 }, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                                {certificationData.map((item, index) => (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: { xs: 0, sm: 2 }, gap: 1.5, minWidth: { xs: '120px', sm: 'auto' } }}>
                                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: getCertColor(item.name), mt: 0.6 }} />
                                        <Box>
                                            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                                                {item.name.replace('_', ' ')}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                                {item.value} Products ({Math.round((item.value / totalCertifications) * 100)}%)
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default AnalyticsCharts;
