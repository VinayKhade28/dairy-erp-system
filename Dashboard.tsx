import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import {
  LocalShipping,
  AttachMoney,
  TrendingUp,
  People,
  ShoppingCart,
  Inventory,
  Assessment,
} from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface DashboardStats {
  totalFarmers: number;
  todayCollection: number;
  monthlySales: number;
  pendingPayments: number;
  activeCollections: number;
  stockValue: number;
}

// Sample data for charts
const collectionData = [
  { date: 'Mon', quantity: 4200, amount: 210000 },
  { date: 'Tue', quantity: 3800, amount: 190000 },
  { date: 'Wed', quantity: 4500, amount: 225000 },
  { date: 'Thu', quantity: 4000, amount: 200000 },
  { date: 'Fri', quantity: 4800, amount: 240000 },
  { date: 'Sat', quantity: 3500, amount: 175000 },
  { date: 'Sun', quantity: 4200, amount: 210000 },
];

const centerData = [
  { name: 'Center A', value: 35 },
  { name: 'Center B', value: 25 },
  { name: 'Center C', value: 20 },
  { name: 'Center D', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentCollections = [
  { id: 1, farmer: 'Rajesh Kumar', quantity: 42, fat: 4.2, amount: 2520 },
  { id: 2, farmer: 'Suresh Patel', quantity: 38, fat: 4.5, amount: 2280 },
  { id: 3, farmer: 'Mohan Singh', quantity: 45, fat: 4.0, amount: 2700 },
  { id: 4, farmer: 'Amit Sharma', quantity: 32, fat: 4.8, amount: 1920 },
];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalFarmers: 156,
    todayCollection: 1250,
    monthlySales: 1250000,
    pendingPayments: 285000,
    activeCollections: 42,
    stockValue: 890000,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: 'Total Farmers',
      value: stats.totalFarmers,
      icon: <People fontSize="large" />,
      color: '#3f51b5',
      progress: 75,
    },
    {
      title: "Today's Collection",
      value: `${stats.todayCollection} L`,
      icon: <LocalShipping fontSize="large" />,
      color: '#4caf50',
      progress: 85,
    },
    {
      title: 'Monthly Sales',
      value: `₹${(stats.monthlySales / 1000).toFixed(0)}K`,
      icon: <ShoppingCart fontSize="large" />,
      color: '#ff9800',
      progress: 65,
    },
    {
      title: 'Pending Payments',
      value: `₹${(stats.pendingPayments / 1000).toFixed(0)}K`,
      icon: <AttachMoney fontSize="large" />,
      color: '#f44336',
      progress: 45,
    },
    {
      title: 'Active Collections',
      value: stats.activeCollections,
      icon: <TrendingUp fontSize="large" />,
      color: '#9c27b0',
      progress: 60,
    },
    {
      title: 'Stock Value',
      value: `₹${(stats.stockValue / 1000).toFixed(0)}K`,
      icon: <Inventory fontSize="large" />,
      color: '#009688',
      progress: 80,
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LinearProgress sx={{ width: '50%' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 2,
                boxShadow: 2,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 4,
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      {card.value}
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={card.progress} 
                      sx={{ mt: 1, height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  <Box sx={{ 
                    backgroundColor: `${card.color}15`,
                    p: 1,
                    borderRadius: 2
                  }}>
                    {card.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Collection Trend Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Weekly Collection Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={collectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="quantity" 
                  stroke="#8884d8" 
                  name="Quantity (L)"
                  strokeWidth={2}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#82ca9d" 
                  name="Amount (₹)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Collection by Center Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Collection by Center
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={centerData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {centerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Collections Table */}
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Recent Milk Collections
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Farmer Name</TableCell>
                <TableCell align="right">Quantity (L)</TableCell>
                <TableCell align="right">Fat %</TableCell>
                <TableCell align="right">Amount (₹)</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentCollections.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.farmer}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">₹{row.amount}</TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: '#4caf50',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                      }}
                    >
                      Paid
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Dashboard;