'use client';

import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Alert, Button, useTheme, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/LocalShippingOutlined';
import ShoppingBasketIcon from '@mui/icons-material/Inventory2Outlined';
import VerifiedIcon from '@mui/icons-material/VerifiedUserOutlined';
import WarningIcon from '@mui/icons-material/ReportProblemOutlined';
import SparklesIcon from '@mui/icons-material/AutoAwesomeOutlined';
import StatCard from '@/components/Dashboard/StatCard';
import AnalyticsCharts from '@/components/Dashboard/AnalyticsCharts';
import api from '@/lib/axios';
import { AnalyticsSummary } from '@/types';
import ProductModal from '@/components/Products/ProductModal';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const theme = useTheme();

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

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress color="primary" thickness={5} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" variant="filled">{error}</Alert>
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

  const certifiedCount = summary?.activeCertificationsCount || 0;
  const totalProducts = summary?.totalProducts || 0;
  const certifiedPercentage = totalProducts > 0 ? Math.round((certifiedCount / totalProducts) * 100) : 0;

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 1, letterSpacing: '-0.02em' }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary" fontWeight={500}>
          Welcome back. Here is the latest status of your sustainability metrics.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Suppliers"
            value={summary?.totalSuppliers || 0}
            icon={<PeopleIcon />}
            color="#22C55E"
            trend={{ text: 'Stable this month', type: 'stable' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Products"
            value={summary?.totalProducts || 0}
            icon={<ShoppingBasketIcon />}
            color="#22C55E"
            trend={{ text: '+1 new addition', type: 'positive' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Active Certifications"
            value={summary?.activeCertificationsCount || 0}
            icon={<VerifiedIcon />}
            color="#22C55E"
            trend={{ text: '1 Pending review', type: 'pending' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Out of Stock"
            value={summary?.outOfStockCount || 0}
            icon={<WarningIcon />}
            color="#F59E0B"
            trend={{ text: 'Healthy inventory levels', type: 'stable' }}
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 5 }}>
        <AnalyticsCharts categoryData={categoryData} certificationData={certificationData} />
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          bgcolor: theme.palette.mode === 'light' ? 'rgba(34, 197, 94, 0.08)' : 'rgba(34, 197, 94, 0.12)',
          border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
            }}
          >
            <SparklesIcon />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Sustainability Insights</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              You are currently hitting {certifiedPercentage}% of your certification goals. Add more certified products to improve your score.
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          disableElevation
          onClick={() => setIsProductModalOpen(true)}
          sx={{
            px: 4,
            py: 1.5,
            bgcolor: '#22C55E',
            '&:hover': { bgcolor: '#16A34A' },
            borderRadius: '10px'
          }}
        >
          Add Certified Product
        </Button>
      </Paper>

      <ProductModal
        open={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSuccess={fetchSummary}
        initialCertificationStatus="CERTIFIED"
      />
    </Container>
  );
};

export default DashboardPage;
