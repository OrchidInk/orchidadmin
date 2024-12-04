import React, { useState, useEffect } from 'react';
import Header from "@/@core/components/Navbar";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Paper,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { apiSuperAdminOrganization } from '@/@core/utils/type/router';

interface Organization {
  id: number;
  customerName: string;
  contractStartDate: string;
  contractEndDate: string;
  isActive: boolean;
}

const OrgAdd = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [addingOrg, setAddingOrg] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [contractStartDate, setContractStartDate] = useState('');
  const [contractEndDate, setContractEndDate] = useState('');
  const [isActive, setIsActive] = useState<boolean>(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newContractEndDate, setNewContractEndDate] = useState('');
  const [newIsActive, setNewIsActive] = useState<boolean>(true);

  // Fetch organizations
  const fetchOrganizations = async () => {
    try {
      const response = await axios.get(`${apiSuperAdminOrganization}/list`);
      const data = response.data && Array.isArray(response.data) ? response.data.map((org: any) => ({
        id: org.CustomerId,
        customerName: org.CustomerName,
        contractStartDate: org.ContractStartDate,
        contractEndDate: org.ContractEndDate,
        isActive: org.IsActive,
      })) : [];
      setOrganizations(data);
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
      setSnackbarMessage('Failed to fetch organizations. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // Handle Update Organization
  const handleUpdateOrganization = async () => {
    if (!newContractEndDate) {
      setSnackbarMessage('Contract End Date is required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      await axios.put(`${apiSuperAdminOrganization}/update/${editingOrg?.id}`, {
        contractEndDate: new Date(newContractEndDate).toISOString(),
        isActive: newIsActive,
      });

      setSnackbarMessage('Organization updated successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setEditModalOpen(false);
      fetchOrganizations();
    } catch (error) {
      setSnackbarMessage('Failed to update organization. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Handle Add Organization
  const handleAddOrganization = async () => {
    if (!orgName || !contractStartDate || !contractEndDate) {
      setSnackbarMessage('All fields are required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      await axios.post(`${apiSuperAdminOrganization}/create`, {
        customerName: orgName,
        contractStartDate: new Date(contractStartDate).toISOString(),
        contractEndDate: new Date(contractEndDate).toISOString(),
        isActive,
      });

      setSnackbarMessage('Organization added successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setAddingOrg(false);
      fetchOrganizations();
      clearInputs();
    } catch (error) {
      setSnackbarMessage('Failed to add organization. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Handle Delete Organization
  const handleDeleteOrganization = async (id: number) => {
    try {
      await axios.delete(`${apiSuperAdminOrganization}/delete/${id}`);
      setSnackbarMessage('Organization deleted successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchOrganizations();
    } catch (error) {
      setSnackbarMessage('Failed to delete organization. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const clearInputs = () => {
    setOrgName('');
    setContractStartDate('');
    setContractEndDate('');
    setIsActive(true);
  };

  const handleEditOrganization = (org: Organization) => {
    setEditingOrg(org);
    setNewContractEndDate(new Date(org.contractEndDate).toISOString().split('T')[0]);
    setNewIsActive(org.isActive);
    setEditModalOpen(true);
  };

  return (
    <>
      <Header />
      <Box sx={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#ffffff', p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Байгууллага
        </Typography>
        <Button
          variant="contained"
          onClick={() => setAddingOrg(true)}
          sx={{ backgroundColor: '#00ffba', color: '#0d0d0d', fontWeight: 'bold', mb: 3 }}
        >
          Байгууллага нэмэх
        </Button>
        <TableContainer component={Paper} sx={{ backgroundColor: '#1a1a1a', color: '#ffffff', mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Байгууллагын нэр</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Гэрээ эхлэх огноо</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Гэрээ дуусах огноо</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Идэвхтэй эсэх</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell sx={{ color: '#ffffff' }}>{org.id}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{org.customerName}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{new Date(org.contractStartDate).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{new Date(org.contractEndDate).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{org.isActive ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: '#00ffba', color: '#0d0d0d', mr: 1 }}
                      onClick={() => handleEditOrganization(org)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: '#f44336', color: '#ffffff' }}
                      onClick={() => handleDeleteOrganization(org.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Organization Modal */}
        <Dialog open={addingOrg} onClose={() => setAddingOrg(false)}>
          <DialogTitle sx={{ color: '#ffffff', backgroundColor: '#1a1a1a' }}>
            Шинээр Байгууллага бүртгэх
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: '#1a1a1a' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Байгууллагын нэр"
                  variant="outlined"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Гэрээ эхлэх огноо"
                  type="date"
                  value={contractStartDate}
                  onChange={(e) => setContractStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Гэрээ дуусах огноо"
                  type="date"
                  value={contractEndDate}
                  onChange={(e) => setContractEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#1a1a1a' }}>
            <Button onClick={() => setAddingOrg(false)} sx={{ color: '#ffffff' }}>
              Cancel
            </Button>
            <Button
              onClick={handleAddOrganization}
              variant="contained"
              sx={{ backgroundColor: '#00ffba', color: '#0d0d0d' }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <DialogTitle sx={{ color: '#ffffff', backgroundColor: '#1a1a1a' }}>
            Байгууллага засах
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: '#1a1a1a' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Гэрээ дуусах огноо"
                  type="date"
                  value={newContractEndDate}
                  onChange={(e) => setNewContractEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ color: '#ffffff', mb: 1 }}>Идэвхтэй эсэх</Typography>
                <Switch
                  checked={newIsActive}
                  onChange={(e) => setNewIsActive(e.target.checked)}
                  sx={{ color: '#00ffba' }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#1a1a1a' }}>
            <Button onClick={() => setEditModalOpen(false)} sx={{ color: '#ffffff' }}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateOrganization}
              variant="contained"
              sx={{ backgroundColor: '#00ffba', color: '#0d0d0d' }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MuiAlert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{ width: '100%', color: '#ffffff', backgroundColor: snackbarSeverity === 'success' ? '#4caf50' : '#f44336' }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </>
  );
};

export default OrgAdd;
