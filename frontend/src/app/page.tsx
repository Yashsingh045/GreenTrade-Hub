'use client';

import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import StatCard from '@/components/Dashboard/StatCard';
import AnalyticsCharts from '@/components/Dashboard/AnalyticsCharts';
import api from '@/lib/axios';
import { AnalyticsSummary } from '@/types';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get('analytics/summary');
        setSummary(response.data.data);
      } catch (err: any) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load dashboard data. Please make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const categoryData = summary?.productsByCategory.map((item) => ({
    name: item.category.replace('_', ' '),
    value: item.count,
  })) || [];

  const certificationData = summary?.productsByCertification.map((item) => ({
    name: item.status.replace('_', ' '),
    value: item.count,
  })) || [];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, color: 'primary.main', fontWeight: 'bold' }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard
            title="Total Suppliers"
            value={summary?.totalSuppliers || 0}
            icon={<PeopleIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard
            title="Total Products"
            value={summary?.totalProducts || 0}
            icon={<ShoppingBasketIcon />}
            color="#2e7d32"
          />
        </Grid>
      </Grid>

      <AnalyticsCharts categoryData={categoryData} certificationData={certificationData} />
    </Container>
  );
};

export default DashboardPage;
