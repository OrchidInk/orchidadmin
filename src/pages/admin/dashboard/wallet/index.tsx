import React from 'react';
import Header from "@/@core/components/Navbar";
import { Box, Typography, Paper, Grid } from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  LineChart,
  Legend,
} from 'recharts';

type Props = {};

// Sample data for charts
const data = [
  {
    month: 'Previous Month',
    deliverySuccessRate: 80, // in percentage
    profit: 50000, // in currency units
    revenue: 75000,
    satisfaction: 85,
    avgDeliveryTime: 4.5,
  },
  {
    month: 'Current Month',
    deliverySuccessRate: 90, // in percentage
    profit: 60000, // in currency units
    revenue: 90000,
    satisfaction: 88,
    avgDeliveryTime: 3.9,
  },
];

const Index = (props: Props) => {
  return (
    <Box sx={{ backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white' }}>
      <Header />

      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#00ffba' }}>
            Борлуулалтын ашиг орлого
        </Typography>

        <Grid container spacing={4}>
          {/* Delivery Success Rate and Profit Chart */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#2d2d2d' }}>
              <Typography variant="h6" sx={{ color: '#00ffba', mb: 2 }}>
                Delivery Success and Profit
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => `${value}%`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="deliverySuccessRate" fill="#00ffba" name="Delivery Success Rate" />
                  <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#8884d8" name="Profit" strokeWidth={2} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Monthly Revenue Growth Chart */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#2d2d2d' }}>
              <Typography variant="h6" sx={{ color: '#00ffba', mb: 2 }}>
                Monthly Revenue Growth
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#00ffba" name="Revenue" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Customer Satisfaction Rate */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#2d2d2d' }}>
              <Typography variant="h6" sx={{ color: '#00ffba', mb: 2 }}>
                Customer Satisfaction Rate
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="satisfaction" stroke="#ff7300" name="Satisfaction" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Average Delivery Time */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#2d2d2d' }}>
              <Typography variant="h6" sx={{ color: '#00ffba', mb: 2 }}>
                Average Delivery Time (Days)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value} days`} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgDeliveryTime" fill="#8884d8" name="Avg Delivery Time" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Index;
