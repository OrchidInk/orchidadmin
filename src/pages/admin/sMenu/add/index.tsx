import Header from '@/@core/components/Navbar';
import {
  Box,
  Button,
  Modal,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TextField,
  Typography,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MuiAlert from '@mui/material/Alert';
import {
  addSCategoryEn,
  AddSCategoryMn,
  deleteSCategoryEn,
  deleteSCategoryMn,
  fetchCategoriesEns,
  fetchCategoriesMns,
  fetchSCategoriesEn,
  fetchSCategoriesMn,
  updateSCategoryEn,
  updateSCategoryMn
} from '@/pages/api/smenu';
import { AxiosError } from 'axios';

// These interfaces must match your API response exactly.
interface SubCategoryEn {
  SubCategoryIDEn: number;
  SubCategoryNameEn: string;
  CategoryEnID: number;
}
interface SubCategoryMn {
  SubCategoryIDMn: number;
  SubCategoryNameMn: string;
  CategoryMnID: number;
}

// sCategory interfaces – these are the records you want to display.
interface SCategoryEn {
  SCategoryIdEn: number;
  SCategoryNameEn: string;
  SubCategoryIDEn: number;
}
interface SCategoryMn {
  SCategoryIdMn: number;
  SCategoryNameMn: string;
  SubCategoryIDMn: number;
}

const Index = () => {
  // State for subcategories (for dropdowns)
  const [enCategories, setEnCategories] = useState<SubCategoryEn[]>([]);
  const [mnCategories, setMnCategories] = useState<SubCategoryMn[]>([]);

  // State for sCategories (to display in tables)
  const [sCategoriesEn, setSCategoriesEn] = useState<SCategoryEn[]>([]);
  const [sCategoriesMn, setSCategoriesMn] = useState<SCategoryMn[]>([]);

  // Modal state and new sCategory input fields
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpenEn, setUpdateModalOpenEn] = useState(false);
  const [updateModalOpenMn, setUpdateModalOpenMn] = useState(false);
  const [selectedSCategoryEn, setSelectedSCategoryEn] = useState<SCategoryEn | null>(null)
  const [selectedSCategoryMn, setSelectedSCategoryMn] = useState<SCategoryMn | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const [newSCategoryNameEn, setNewSCategoryNameEn] = useState<string>('');
  const [subCategoryIDEn, setSubCategoryIDEn] = useState<number>(0);
  const [newSCategoryNameMn, setNewSCategoryNameMn] = useState<string>('');
  const [subCategoryIDMn, setSubCategoryIDMn] = useState<number>(0);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteSCategoryId, setDeleteSCategoryId] = useState<number | null>(null)
  const [deleteType, setDeleteType] = useState<'en' | 'mn' | null>(null)

  // Helper function to load data from API endpoints.
  const loadCategories = async () => {
    try {
      // Fetch subcategories (for dropdown options)
      const mnData: SubCategoryMn[] = await fetchCategoriesMns();
      const enData: SubCategoryEn[] = await fetchCategoriesEns();
      console.log("Fetched English SubCategories:", enData);
      console.log("Fetched Mongolian SubCategories:", mnData);
      setEnCategories(enData ?? []);
      setMnCategories(mnData ?? []);

      // Fetch sCategories (the records to render in the sCategory tables)
      const sCatEnData: SCategoryEn[] = await fetchSCategoriesEn();
      const sCatMnData: SCategoryMn[] = await fetchSCategoriesMn();
      console.log("Fetched sCategories (En):", sCatEnData);
      console.log("Fetched sCategories (Mn):", sCatMnData);
      setSCategoriesEn(sCatEnData ?? []);
      setSCategoriesMn(sCatMnData ?? []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // When adding a new sCategory.
  const handleAdd = async () => {
    if (!newSCategoryNameEn || !newSCategoryNameMn || subCategoryIDEn === 0 || subCategoryIDMn === 0) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await Promise.all([
        addSCategoryEn(newSCategoryNameEn, subCategoryIDEn),
        AddSCategoryMn(newSCategoryNameMn, subCategoryIDMn)
      ]);
      await loadCategories();

      setSnackbarMessage('✅ Subcategory added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setAddModalOpen(false);
      setNewSCategoryNameEn('');
      setSubCategoryIDEn(0);
      setNewSCategoryNameMn('');
      setSubCategoryIDMn(0);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Update sCategory
  const handleUpdateClickMn = (sCategory: SCategoryMn) => {
    setSelectedSCategoryMn(sCategory)
    setUpdateModalOpenMn(true);
  }

  const handleUpdateSubmitMn = async () => {
    if (!selectedSCategoryMn) return;

    try {
      await updateSCategoryMn(selectedSCategoryMn.SCategoryIdMn, selectedSCategoryMn.SCategoryNameMn)

      setSnackbarMessage('✅ Subcategory updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);


      setSCategoriesMn((prev) =>
        prev.map((sub) =>
          sub.SCategoryIdMn === selectedSCategoryMn.SCategoryIdMn
            ? { ...sub, SCategoryNameMn: selectedSCategoryMn.SCategoryNameMn }
            : sub
        )
      );

      setUpdateModalOpenMn(false)

    } catch (error) {
      console.error('❌ Failed to update Mongolian scategory:', error);
      let errorMessage = 'Failed to update scategory.';
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || 'Server error occurred!';
      }
      setSnackbarMessage(`❌ ${errorMessage}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }

  const handleUpdateClickEn = (sCategory: SCategoryEn) => {
    setSelectedSCategoryEn(sCategory)
    setUpdateModalOpenEn(true)
  }

  const handleUpdateSubmitEn = async () => {
    if (!selectedSCategoryEn) return;
    try {
      await updateSCategoryEn(selectedSCategoryEn.SCategoryIdEn, selectedSCategoryEn.SCategoryNameEn)

      setSnackbarMessage('✅ Subcategory updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);


      setSCategoriesEn((prev) =>
        prev.map((sub) =>
          sub.SCategoryIdEn === selectedSCategoryEn.SCategoryIdEn
            ? { ...sub, SCategoryNameEn: selectedSCategoryEn.SCategoryNameEn }
            : sub
        )
      );

      setUpdateModalOpenEn(false)
    } catch (error) {
      console.error('❌ Failed to update English scategory:', error);
      let errorMessage = 'Failed to update scategory.';
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || 'Server error occurred!';
      }
      setSnackbarMessage(`❌ ${errorMessage}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }

  // Delete
  const handleDeleteClick = (id: number, type: 'en' | 'mn') => {
    setDeleteSCategoryId(id);
    setDeleteType(type);
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (deleteSCategoryId === null || deleteType === null) return;

    try {
      if (deleteType === 'en') {
        await deleteSCategoryEn(deleteSCategoryId)
        setSCategoriesEn((prev) => prev.filter((sub) => sub.SCategoryIdEn !== deleteSCategoryId))
      } else {
        await deleteSCategoryMn(deleteSCategoryId)
        setSCategoriesMn((prev) => prev.filter((cat) => cat.SCategoryIdMn !== deleteSCategoryId))
      }

      setSnackbarMessage('✅ Subcategory deleted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      let errorMessage = 'Failed to delete subcategory.';
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || 'Server error occurred!';
      }

      setSnackbarMessage(`❌ ${errorMessage}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
    setDeleteDialogOpen(false)
  }

  return (
    <Box sx={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#ffffff', p: 2 }}>
      <Header />
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        С Ангилал Нэмэх
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={() => setAddModalOpen(true)}
        sx={{ backgroundColor: '#00ffba', color: '#0d0d0d', fontWeight: 'bold', mb: 2 }}
      >
        С Ангилал Нэмэх
      </Button>

      {/* Modal for Adding New sCategory Records */}
      <Modal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        aria-labelledby="add-scategory-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400
          }}
        >
          <Typography id="add-scategory-modal" variant="h6" sx={{ mb: 2 }}>
            Add New sCategory
          </Typography>
          {/* English sCategory Fields */}
          <TextField
            label="sCategory Name (En)"
            fullWidth
            value={newSCategoryNameEn}
            onChange={(e) => setNewSCategoryNameEn(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Select SubCategory (En)"
            fullWidth
            value={subCategoryIDEn}
            onChange={(e) => setSubCategoryIDEn(Number(e.target.value))}
            sx={{ mb: 2 }}
          >
            {enCategories.map((subCat) => (
              <MenuItem key={subCat.SubCategoryIDEn} value={subCat.SubCategoryIDEn}>
                {subCat.SubCategoryNameEn || 'N/A'}
              </MenuItem>
            ))}
          </TextField>
          {/* Mongolian sCategory Fields */}
          <TextField
            label="sCategory Name (Mn)"
            fullWidth
            value={newSCategoryNameMn}
            onChange={(e) => setNewSCategoryNameMn(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Select SubCategory (Mn)"
            fullWidth
            value={subCategoryIDMn}
            onChange={(e) => setSubCategoryIDMn(Number(e.target.value))}
            sx={{ mb: 2 }}
          >
            {mnCategories.map((subCat) => (
              <MenuItem key={subCat.SubCategoryIDMn} value={subCat.SubCategoryIDMn}>
                {subCat.SubCategoryNameMn || 'N/A'}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleAdd} sx={{ mr: 1 }}>
              Add
            </Button>
            <Button variant="outlined" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Table for English sCategories */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#00ffba' }}>
        Англи дахь с Ангилал
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>sCategory ID (En)</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name (En)</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>SubCategory ID</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sCategoriesEn.map((cat) => (
            <TableRow key={cat.SCategoryIdEn}>
              <TableCell sx={{ color: '#ffffff' }}>{cat.SCategoryIdEn}</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>{cat.SCategoryNameEn}</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>{cat.SubCategoryIDEn}</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>
                <Button
                  variant='contained'
                  sx={{ background: "#00ffba", color: "#000", mr: 1 }}
                  onClick={() => handleUpdateClickEn(cat)}
                >
                  Update
                </Button>
                <Button
                  variant='contained'
                  sx={{ background: '#ff0000', color: '#fff', mr: 1 }}
                  onClick={() => handleDeleteClick(cat.SCategoryIdEn, 'en')}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Table for Mongolian sCategories */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold', color: '#00ffba' }}>
        Монгол дахь с Ангилал
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>sCategory ID (Mn)</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name (Mn)</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>SubCategory ID</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sCategoriesMn.map((cat) => (
            <TableRow key={cat.SCategoryIdMn}>
              <TableCell sx={{ color: '#ffffff' }}>{cat.SCategoryIdMn}</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>{cat.SCategoryNameMn}</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>{cat.SubCategoryIDMn}</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>
                <Button
                  variant='contained'
                  sx={{ background: "#00ffba", color: "#000", mr: 1 }}
                  onClick={() => handleUpdateClickMn(cat)}
                >
                  Update
                </Button>
                <Button
                  variant='contained'
                  sx={{ background: '#ff0000', color: '#fff', mr: 1 }}
                  onClick={() => handleDeleteClick(cat.SCategoryIdMn, 'mn')}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Update */}
      <Dialog open={updateModalOpenMn} onClose={() => setUpdateModalOpenMn(false)}>
        <DialogTitle>Дэд ангилал шинэчлэх</DialogTitle>
        <DialogContent>
          {selectedSCategoryMn && (
            <TextField
              fullWidth
              label="Дэд ангилал нэр(Монгол)"
              value={selectedSCategoryMn.SCategoryNameMn}
              onChange={(e) => {
                setSelectedSCategoryMn({ ...selectedSCategoryMn, SCategoryNameMn: e.target.value })
              }}
              sx={{ mb: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateModalOpenMn(false)}>Cancel</Button>
          <Button onClick={handleUpdateSubmitMn} variant="contained" sx={{ background: '#ffcc00', color: '#000' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={updateModalOpenEn} onClose={() => setUpdateModalOpenEn(false)}>
        <DialogTitle>English Category Update</DialogTitle>
        <DialogContent>
          {selectedSCategoryEn && (
            <TextField
              fullWidth
              label="English Category update"
              value={selectedSCategoryEn.SCategoryNameEn}
              onChange={(e) => {
                setSelectedSCategoryEn({ ...selectedSCategoryEn, SCategoryNameEn: e.target.value })
              }}
              sx={{ mb: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateModalOpenEn(false)}>Cancel</Button>
          <Button onClick={handleUpdateSubmitEn} variant="contained" sx={{ background: '#00ffba', color: '#000' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Дэд ангилал устгах</DialogTitle>
        <DialogContent>
          Энэ дэд ангилалыг устгахдаа итгэлтэй байна уу
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Болих</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" sx={{ backgroundColor: '#ff3333', color: '#fff' }}>
            Устгах
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
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>


    </Box>
  );
};

export default Index;
