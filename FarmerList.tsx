import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
  InputAdornment,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  Visibility,
  FilterList,
  Download,
  Print,
} from '@mui/icons-material';

interface Farmer {
  farmerID: number;
  farmerCode: string;
  fullName: string;
  contactNumber: string;
  address: string;
  village: string;
  bankAccountNumber: string;
  isActive: boolean;
  totalCollections: number;
  totalAmount: number;
  balanceAmount: number;
}

const FarmerList: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([
    {
      farmerID: 1,
      farmerCode: 'FM001',
      fullName: 'Rajesh Kumar',
      contactNumber: '9876543210',
      address: 'Village Road, Taluka',
      village: 'Village A',
      bankAccountNumber: '123456789012',
      isActive: true,
      totalCollections: 45,
      totalAmount: 45000,
      balanceAmount: 15000,
    },
    {
      farmerID: 2,
      farmerCode: 'FM002',
      fullName: 'Suresh Patel',
      contactNumber: '9876543211',
      address: 'Main Road, City',
      village: 'Village B',
      bankAccountNumber: '234567890123',
      isActive: true,
      totalCollections: 38,
      totalAmount: 38000,
      balanceAmount: 8000,
    },
    {
      farmerID: 3,
      farmerCode: 'FM003',
      fullName: 'Mohan Singh',
      contactNumber: '9876543212',
      address: 'Station Road',
      village: 'Village C',
      bankAccountNumber: '345678901234',
      isActive: true,
      totalCollections: 52,
      totalAmount: 52000,
      balanceAmount: 22000,
    },
    {
      farmerID: 4,
      farmerCode: 'FM004',
      fullName: 'Amit Sharma',
      contactNumber: '9876543213',
      address: 'Gandhi Nagar',
      village: 'Village D',
      bankAccountNumber: '456789012345',
      isActive: false,
      totalCollections: 25,
      totalAmount: 25000,
      balanceAmount: 5000,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  const handleSearch = () => {
    // Filter farmers based on search term
    const filtered = farmers.filter(farmer =>
      farmer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.farmerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.village.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered;
  };

  const filteredFarmers = searchTerm ? handleSearch() : farmers;

  const handleAddFarmer = () => {
    // Logic to add new farmer
    console.log('Add new farmer');
    setOpenDialog(false);
  };

  const handleEditFarmer = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setOpenDialog(true);
  };

  const handleDeleteFarmer = (farmerId: number) => {
    if (window.confirm('Are you sure you want to delete this farmer?')) {
      setFarmers(farmers.filter(f => f.farmerID !== farmerId));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Farmer Management
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download />}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            startIcon={<Print />}
          >
            Print
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => {
              setSelectedFarmer(null);
              setOpenDialog(true);
            }}
          >
            Add Farmer
          </Button>
        </Box>
      </Box>

      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search farmers by name, code, or village..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Farmers Table */}
      <Paper sx={{ borderRadius: 2, boxShadow: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Farmer Code</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Village</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Collections</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Balance</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFarmers.map((farmer) => (
                <TableRow 
                  key={farmer.farmerID}
                  hover
                  sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      {farmer.farmerCode}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                        {farmer.fullName.charAt(0)}
                      </Avatar>
                      <Typography>{farmer.fullName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{farmer.contactNumber}</TableCell>
                  <TableCell>{farmer.village}</TableCell>
                  <TableCell>{farmer.totalCollections}</TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 'bold', color: 'green' }}>
                      ₹{farmer.totalAmount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 'bold', color: 'orange' }}>
                      ₹{farmer.balanceAmount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={farmer.isActive ? 'Active' : 'Inactive'}
                      color={farmer.isActive ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        color="info"
                        title="View Details"
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => handleEditFarmer(farmer)}
                        title="Edit"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteFarmer(farmer.farmerID)}
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

      {/* Add/Edit Farmer Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedFarmer ? 'Edit Farmer' : 'Add New Farmer'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Farmer Code"
              defaultValue={selectedFarmer?.farmerCode || ''}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Full Name"
              defaultValue={selectedFarmer?.fullName || ''}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Contact Number"
              defaultValue={selectedFarmer?.contactNumber || ''}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Village"
              defaultValue={selectedFarmer?.village || ''}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Bank Account Number"
              defaultValue={selectedFarmer?.bankAccountNumber || ''}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddFarmer}>
            {selectedFarmer ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FarmerList;