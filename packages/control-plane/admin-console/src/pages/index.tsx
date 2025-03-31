import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Button,
} from '@mui/material';
import {
  DevicesOutlined,
  SecurityOutlined,
  PeopleOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';

// Dashboard statistics component
const StatCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="div" color="text.secondary">
          {title}
        </Typography>
        <Box sx={{ backgroundColor: `${color}20`, p: 1, borderRadius: '50%' }}>{icon}</Box>
      </Box>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default function Home() {
  // In a real application, these would be fetched from an API
  const [stats] = useState({
    devices: {
      total: 124,
      compliant: 118,
      nonCompliant: 6,
    },
    users: {
      total: 156,
      active: 143,
    },
    policies: {
      total: 12,
    },
  });

  return (
    <Layout>
      <Head>
        <title>OpenZTNA Admin Console</title>
        <meta name="description" content="Administrative console for OpenZTNA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid item xs={12} md={3}>
            <StatCard
              title="Total Devices"
              value={stats.devices.total.toString()}
              icon={<DevicesOutlined sx={{ color: '#1976d2' }} />}
              color="#1976d2"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard
              title="Compliant Devices"
              value={stats.devices.compliant.toString()}
              icon={<SecurityOutlined sx={{ color: '#2e7d32' }} />}
              color="#2e7d32"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard
              title="Active Users"
              value={stats.users.active.toString()}
              icon={<PeopleOutlined sx={{ color: '#ed6c02' }} />}
              color="#ed6c02"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard
              title="Security Policies"
              value={stats.policies.total.toString()}
              icon={<SettingsOutlined sx={{ color: '#9c27b0' }} />}
              color="#9c27b0"
            />
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Link href="/devices" passHref legacyBehavior>
                  <Button variant="contained" startIcon={<DevicesOutlined />} component="a">
                    Manage Devices
                  </Button>
                </Link>
                <Link href="/policies" passHref legacyBehavior>
                  <Button variant="contained" startIcon={<SecurityOutlined />} component="a">
                    Configure Policies
                  </Button>
                </Link>
                <Link href="/users" passHref legacyBehavior>
                  <Button variant="contained" startIcon={<PeopleOutlined />} component="a">
                    Manage Users
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • User john.doe@example.com logged in from a new device (10 minutes ago)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Device MacBook-Pro-123 failed compliance check: Disk encryption not enabled (30
                minutes ago)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • New policy "Engineering Team Access" created by admin@example.com (2 hours ago)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • System update completed successfully (6 hours ago)
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
