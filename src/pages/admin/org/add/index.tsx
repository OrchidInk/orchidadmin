import React, { useState } from 'react';
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
  DialogTitle
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { apiSuperAdminOrganization } from '@/@core/utils/type/router';

type Props = {}

const OrgAdd = (props: Props) => {
  const [orgName, setOrgName] = useState('');
  const [contractStartDate, setContractStartDate] = useState('');
  const [contractEndDate, setContractEndDate] = useState('');
  const [isActive, setIsActive] = useState<boolean>(true); // Default to true
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [addModalOpen, setAddModalOpen] = useState(false);

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
        isActive
      });

      setSnackbarMessage('Organization added successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setAddModalOpen(false);
      clearInputs();
    } catch (error) {
      setSnackbarMessage('Failed to add organization. Please try again.');
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

  return (
    <>
      <Header />
      <Box sx={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#ffffff', p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
         Байгууллага нэмэх 
        </Typography>
        <Button
          variant="contained"
          onClick={() => setAddModalOpen(true)}
          sx={{ backgroundColor: '#00ffba', color: '#0d0d0d', fontWeight: 'bold', mb: 3 }}
        >
         Байгууллага нэмэх 
        </Button>
        <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
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
                  label="Гэрээ байгуулсан огноо"
                  type="date"
                  variant="outlined"
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
                  variant="outlined"
                  value={contractEndDate}
                  onChange={(e) => setContractEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Is Active"
                  variant="outlined"
                  value={isActive ? 'Active' : 'Inactive'}
                  onChange={(e) => setIsActive(e.target.value === 'true')}
                  select
                  SelectProps={{ native: true }}
                  sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </TextField>
              </Grid> */}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#1a1a1a' }}>
            <Button onClick={() => setAddModalOpen(false)} sx={{ color: '#ffffff' }}>
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
