import Header from "@/@core/components/Navbar";
import { Box, Grid, Paper, Typography } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from 'recharts';
import { FaUser, FaDollarSign, FaTruck } from 'react-icons/fa';

const COLORS = ['#00ffba', '#8884d8', '#82ca9d'];

const Index = () => {
  // Sample data for charts
  const deviceData = [
    { name: 'Desktop', value: 1080 },
    { name: 'Mobile', value: 3200 },
    { name: 'Tablet', value: 8180 },
  ];

  const socialTrafficData = [
    { x: 460, y: 10, z: 20, name: 'Facebook' },
    { x: 470, y: 20, z: 30, name: 'Twitter' },
    { x: 480, y: 15, z: 25, name: 'Dribbble' },
    { x: 490, y: 25, z: 35, name: 'Facebook' },
  ];

  const audienceData = [
    { date: 'Jan 01', rate: 3056, value: 1998 },
    { date: 'Jan 02', rate: 4068, value: 2980 },
    { date: 'Jan 03', rate: 3800, value: 2400 },
    { date: 'Jan 04', rate: 4800, value: 3500 },
  ];

  return (
    <Box>
      <Header />

      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          Dashboard Overview
        </Typography>

        {/* Quick Stats Section */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Total Users */}
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#1a1a1a', color: 'white', textAlign: 'center' }}>
              <FaUser size={40} color="#00ffba" />
              <Typography variant="h6" sx={{ mt: 2 }}>Total Users</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#00ffba' }}>1,200</Typography>
            </Paper>
          </Grid>

          {/* Total Sales */}
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#1a1a1a', color: 'white', textAlign: 'center' }}>
              <FaDollarSign size={40} color="#00ffba" />
              <Typography variant="h6" sx={{ mt: 2 }}>Total Sales</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#00ffba' }}>$45,000</Typography>
            </Paper>
          </Grid>

          {/* Total Deliveries */}
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#1a1a1a', color: 'white', textAlign: 'center' }}>
              <FaTruck size={40} color="#00ffba" />
              <Typography variant="h6" sx={{ mt: 2 }}>Total Deliveries</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#00ffba' }}>850</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={4}>
          {/* Sessions by Device */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#1a1a1a', color: 'white' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Sessions by Device</Typography>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={deviceData} dataKey="value" innerRadius={40} outerRadius={60} fill="#00ffba" label>
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Social Media Traffic */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#1a1a1a', color: 'white' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Social Media Traffic</Typography>
              <ResponsiveContainer width="100%" height={150}>
                <ScatterChart>
                  <XAxis dataKey="x" type="number" name="Traffic" />
                  <YAxis dataKey="y" type="number" name="Engagement" />
                  <ZAxis dataKey="z" range={[60, 400]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Social Traffic" data={socialTrafficData} fill="#00ffba" />
                </ScatterChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Audience Overview */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#1a1a1a', color: 'white' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Audience Overview</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={audienceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rate" fill="#00ffba" />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
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
