import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  Save,
  Print,
  Calculate,
  Delete,
  Edit,
  Refresh,
  Add,
} from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface CollectionData {
  collectionID?: number;
  collectionDate: string;
  farmerID: number;
  farmerName: string;
  centerID: number;
  quantity: number;
  fatPercentage: number;
  snfPercentage: number;
  temperature: number;
  ratePerLiter: number;
  totalAmount: number;
  shift: 'Morning' | 'Evening' | 'Night';
  paymentStatus: 'Pending' | 'Paid' | 'Partial';
}

const DailyCollection: React.FC = () => {
  const [collectionDate, setCollectionDate] = useState<Dayjs>(dayjs());
  const [collection, setCollection] = useState<CollectionData>({
    collectionDate: dayjs().format('YYYY-MM-DD'),
    farmerID: 0,
    farmerName: '',
    centerID: 1,
    quantity: 0,
    fatPercentage: 0,
    snfPercentage: 0,
    temperature: 0,
    ratePerLiter: 0,
    totalAmount: 0,
    shift: 'Morning',
    paymentStatus: 'Pending',
  });

  const [collections, setCollections] = useState<CollectionData[]>([
    {
      collectionID: 1,
      collectionDate: dayjs().format('YYYY-MM-DD'),
      farmerID: 1,
      farmerName: 'Rajesh Kumar',
      centerID: 1,
      quantity: 42,
      fatPercentage: 4.2,
      snfPercentage: 8.5,
      temperature: 4.2,
      ratePerLiter: 60,
      totalAmount: 2520,
      shift: 'Morning',
      paymentStatus: 'Pending',
    },
    {
      collectionID: 2,
      collectionDate: dayjs().format('YYYY-MM-DD'),
      farmerID: 2,
      farmerName: 'Suresh Patel',
      centerID: 1,
      quantity: 38,
      fatPercentage: 4.5,
      snfPercentage: 8.8,
      temperature: 4.0,
      ratePerLiter: 65,
      totalAmount: 2470,
      shift: 'Morning',
      paymentStatus: 'Paid',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const farmers = [
    { id: 1, name: 'Rajesh Kumar', code: 'FM001' },
    { id: 2, name: 'Suresh Patel', code: 'FM002' },
    { id: 3, name: 'Mohan Singh', code: 'FM003' },
    { id: 4, name: 'Amit Sharma', code: 'FM004' },
  ];

  const centers = [
    { id: 1, name: 'Main Collection Center' },
    { id: 2, name: 'North Zone Center' },
    { id: 3, name: 'South Zone Center' },
  ];

  const calculateRate = (fat: number, snf: number): number => {
    const baseRate = 50;
    const fatRate = fat * 2;
    const snfRate = snf * 1.5;
    return baseRate + fatRate + snfRate;
  };

  const calculateAmount = () => {
    const rate = calculateRate(collection.fatPercentage, collection.snfPercentage);
    const amount = collection.quantity * rate;
    
    setCollection(prev => ({
      ...prev,
      ratePerLiter: parseFloat(rate.toFixed(2)),
      totalAmount: parseFloat(amount.toFixed(2)),
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);

    // Simulate API call
    setTimeout(() => {
      const newCollection: CollectionData = {
        ...collection,
        collectionID: collections.length + 1,
        collectionDate: collectionDate.format('YYYY-MM-DD'),
        farmerName: farmers.find(f => f.id === collection.farmerID)?.name || '',
      };

      setCollections([...collections, newCollection]);
      resetForm();
      setSuccess(true);
      setLoading(false);

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  const resetForm = () => {
    setCollection({
      collectionDate: dayjs().format('YYYY-MM-DD'),
      farmerID: 0,
      farmerName: '',
      centerID: 1,
      quantity: 0,
      fatPercentage: 0,
      snfPercentage: 0,
      temperature: 0,
      ratePerLiter: 0,
      totalAmount: 0,
      shift: 'Morning',
      paymentStatus: 'Pending',
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      setCollections(collections.filter(c => c.collectionID !== id));
    }
  };

  const handleEdit = (collectionData: CollectionData) => {
    setCollection(collectionData);
    setCollectionDate(dayjs(collectionData.collectionDate));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'success';
      case 'Pending': return 'warning';
      case 'Partial': return 'info';
      default: return 'default';
    }
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setCollection(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCollection(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Daily Milk Collection
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Collection recorded successfully!
          </Alert>
        )}

        {/* Collection Form */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            New Collection Entry
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <DatePicker
                label="Collection Date"
                value={collectionDate}
                onChange={(newValue) => setCollectionDate(newValue || dayjs())}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Farmer</InputLabel>
                <Select
                  name="farmerID"
                  value={collection.farmerID}
                  label="Farmer"
                  onChange={handleSelectChange}
                >
                  <MenuItem value={0}>Select Farmer</MenuItem>
                  {farmers.map((farmer) => (
                    <MenuItem key={farmer.id} value={farmer.id}>
                      {farmer.code} - {farmer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Center</InputLabel>
                <Select
                  name="centerID"
                  value={collection.centerID}
                  label="Center"
                  onChange={handleSelectChange}
                >
                  {centers.map((center) => (
                    <MenuItem key={center.id} value={center.id}>
                      {center.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Shift</InputLabel>
                <Select
                  name="shift"
                  value={collection.shift}
                  label="Shift"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Morning">Morning</MenuItem>
                  <MenuItem value="Evening">Evening</MenuItem>
                  <MenuItem value="Night">Night</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Quantity (Liters)"
                name="quantity"
                type="number"
                value={collection.quantity}
                onChange={handleInputChange}
                InputProps={{ inputProps: { min: 0, step: 0.1 } }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Fat %"
                name="fatPercentage"
                type="number"
                value={collection.fatPercentage}
                onChange={handleInputChange}
                InputProps={{ inputProps: { min: 0, max: 10, step: 0.1 } }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="SNF %"
                name="snfPercentage"
                type="number"
                value={collection.snfPercentage}
                onChange={handleInputChange}
                InputProps={{ inputProps: { min: 0, max: 15, step: 0.1 } }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Temperature (°C)"
                name="temperature"
                type="number"
                value={collection.temperature}
                onChange={handleInputChange}
                InputProps={{ inputProps: { min: 0, max: 10, step: 0.1 } }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Rate/Liter"
                name="ratePerLiter"
                type="number"
                value={collection.ratePerLiter}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Total Amount"
                name="totalAmount"
                type="number"
                value={collection.totalAmount}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Calculate />}
                  onClick={calculateAmount}
                  disabled={loading}
                >
                  Calculate
                </Button>
                
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Save />}
                  onClick={handleSave}
                  disabled={loading || collection.farmerID === 0 || collection.quantity === 0}
                >
                  {loading ? 'Saving...' : 'Save Collection'}
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Print />}
                  disabled={loading}
                >
                  Print Receipt
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={resetForm}
                  disabled={loading}
                >
                  Reset
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Recent Collections Table */}
        <Paper sx={{ borderRadius: 2, boxShadow: 2 }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Today's Collections
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                resetForm();
                setCollectionDate(dayjs());
              }}
            >
              Add New
            </Button>
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>Farmer Name</TableCell>
                  <TableCell align="right">Quantity (L)</TableCell>
                  <TableCell align="right">Fat %</TableCell>
                  <TableCell align="right">SNF %</TableCell>
                  <TableCell align="right">Rate/L</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="center">Shift</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {collections.map((row) => (
                  <TableRow key={row.collectionID}>
                    <TableCell>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {row.farmerName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Farmer ID: {row.farmerID}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.fatPercentage}</TableCell>
                    <TableCell align="right">{row.snfPercentage}</TableCell>
                    <TableCell align="right">₹{row.ratePerLiter}</TableCell>
                    <TableCell align="right">
                      <Typography sx={{ fontWeight: 'bold', color: 'green' }}>
                        ₹{row.totalAmount}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={row.shift} size="small" />
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={row.paymentStatus} 
                        color={getStatusColor(row.paymentStatus)}
                        size="small" 
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleEdit(row)}
                          title="Edit"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDelete(row.collectionID!)}
                          title="Delete"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default DailyCollection;