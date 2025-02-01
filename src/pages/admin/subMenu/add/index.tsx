import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Snackbar,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MuiAlert from '@mui/material/Alert';
import {
  fetchCategoriesEn,
  fetchCategoriesMn,
  addSubCategoryEn,
  addSubCategoryMn,
  updateSubCategoryEn,
  updateSubCategoryMn,
  deleteSubCategoryEn,
  deleteSubCategoryMn,
} from '@/pages/api/submenu';
import Header from '@/@core/components/Navbar';
import { AxiosError } from 'axios';

interface SubCategoryEn {
  SubCategoryIDEn: number;
  SubCategoryNameEN: string;
  categoryEnId: number;
}

interface SubCategoryMn {
  SubCategoryIDMn: number;
  SubCategoryNameMN: string;
  categoryMnId: number;
}

interface CategoryEn {
  categoryEnId: number;
  categoryNameEn: string;
  subcategories?: SubCategoryEn[]; // ✅ Added optional `subcategories`
}

interface CategoryMn {
  categoryMnId: number;
  categoryNameMn: string;
  subcategories?: SubCategoryMn[]; // ✅ Added optional `subcategories`
}


const SubMenuAdd = () => {
  const [mnCategories, setMnCategories] = useState<CategoryMn[]>([]);
  const [enCategories, setEnCategories] = useState<CategoryEn[]>([]);
  const [subCategoriesMn, setSubCategoriesMn] = useState<SubCategoryMn[]>([]);
  const [subCategoriesEn, setSubCategoriesEn] = useState<SubCategoryEn[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [subCategoryMn, setSubCategoryMn] = useState('');
  const [subCategoryEn, setSubCategoryEn] = useState('');
  const [categoryMnId, setCategoryMnId] = useState<number | null>(null);
  const [categoryEnId, setCategoryEnId] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryEn | null>(null);
  const [updateModalOpenMn, setUpdateModalOpenMn] = useState(false);
  const [selectedSubCategoryMn, setSelectedSubCategoryMn] = useState<SubCategoryMn | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteSubCategoryId, setDeleteSubCategoryId] = useState<number | null>(null);
  const [deleteType, setDeleteType] = useState<'en' | 'mn' | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const mnData: CategoryMn[] = await fetchCategoriesMn();
        const enData: CategoryEn[] = await fetchCategoriesEn();

        setMnCategories(mnData);
        setEnCategories(enData);

        const mnSubcategories: SubCategoryMn[] = [];
        const enSubcategories: SubCategoryEn[] = [];

        mnData.forEach((category: CategoryMn) => {
          if (category.subcategories) { // ✅ Ensure subcategories exist before accessing
            category.subcategories.forEach((subCategory: SubCategoryMn) => {
              mnSubcategories.push(subCategory);
            });
          }
        });

        enData.forEach((category: CategoryEn) => {
          if (category.subcategories) { // ✅ Ensure subcategories exist before accessing
            category.subcategories.forEach((subCategory: SubCategoryEn) => {
              enSubcategories.push(subCategory);
            });
          }
        });

        setSubCategoriesMn(mnSubcategories);
        setSubCategoriesEn(enSubcategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    loadCategories();
  }, []);


  const handleAdd = async () => {
    if (!subCategoryMn || !subCategoryEn || categoryMnId === null || categoryEnId === null) {
      setSnackbarMessage('⚠️ All fields are required!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      await Promise.all([
        addSubCategoryEn(subCategoryEn, categoryEnId),
        addSubCategoryMn(subCategoryMn, categoryMnId),
      ]);

      setSnackbarMessage('✅ Subcategory added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setAddModalOpen(false);
      setSubCategoryMn('');
      setSubCategoryEn('');
      setCategoryMnId(null);
      setCategoryEnId(null);
    } catch (error) {
      console.error('❌ Failed to add subcategory:', error);

      let errorMessage = 'Failed to add subcategory.';
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || 'Server error occurred!';
      }

      setSnackbarMessage(`❌ ${errorMessage}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };


  const handleUpdateClick = (subcategory: SubCategoryEn) => {
    setSelectedSubCategory(subcategory);
    setUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    if (!selectedSubCategory) return;

    try {
      await updateSubCategoryEn(selectedSubCategory.SubCategoryIDEn, selectedSubCategory.SubCategoryNameEN);

      setSnackbarMessage('✅ Subcategory updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Update UI
      setSubCategoriesEn((prev) =>
        prev.map((sub) =>
          sub.SubCategoryIDEn === selectedSubCategory.SubCategoryIDEn
            ? { ...sub, SubCategoryNameEN: selectedSubCategory.SubCategoryNameEN }
            : sub
        )
      );

      setUpdateModalOpen(false);
    } catch (error) {
      console.error('❌ Failed to update subcategory:', error);
      let errorMessage = 'Failed to update subcategory.';
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || 'Server error occurred!';
      }
      setSnackbarMessage(`❌ ${errorMessage}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleUpdateClickMn = (subcategory: SubCategoryMn) => {
    setSelectedSubCategoryMn(subcategory);
    setUpdateModalOpenMn(true);
  };

  const handleUpdateSubmitMn = async () => {
    if (!selectedSubCategoryMn) return;

    try {
      await updateSubCategoryMn(selectedSubCategoryMn.SubCategoryIDMn, selectedSubCategoryMn.SubCategoryNameMN);

      setSnackbarMessage('✅ Mongolian Subcategory updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Update UI
      setSubCategoriesMn((prev) =>
        prev.map((sub) =>
          sub.SubCategoryIDMn === selectedSubCategoryMn.SubCategoryIDMn
            ? { ...sub, SubCategoryNameMN: selectedSubCategoryMn.SubCategoryNameMN }
            : sub
        )
      );

      setUpdateModalOpenMn(false);
    } catch (error) {
      console.error('❌ Failed to update Mongolian subcategory:', error);
      let errorMessage = 'Failed to update subcategory.';
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || 'Server error occurred!';
      }
      setSnackbarMessage(`❌ ${errorMessage}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteClick = (id: number, type: 'en' | 'mn') => {
    setDeleteSubCategoryId(id);
    setDeleteType(type);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteSubCategoryId === null || deleteType === null) return;

    try {
      if (deleteType === 'en') {
        await deleteSubCategoryEn(deleteSubCategoryId);
        setSubCategoriesEn((prev) => prev.filter((sub) => sub.SubCategoryIDEn !== deleteSubCategoryId));
      } else {
        await deleteSubCategoryMn(deleteSubCategoryId);
        setSubCategoriesMn((prev) => prev.filter((sub) => sub.SubCategoryIDMn !== deleteSubCategoryId));
      }

      setSnackbarMessage('✅ Subcategory deleted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('❌ Failed to delete subcategory:', error);

      let errorMessage = 'Failed to delete subcategory.';
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || 'Server error occurred!';
      }

      setSnackbarMessage(`❌ ${errorMessage}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }

    setDeleteDialogOpen(false);
  };
  return (
    <Box sx={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#ffffff' }}>
      <Header />
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', p: 2 }}>
        SubCategory Management
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={() => setAddModalOpen(true)}
        sx={{ backgroundColor: '#00ffba', color: '#0d0d0d', fontWeight: 'bold', mb: 2 }}
      >
        Add SubCategory
      </Button>

      {/* English Table */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#00ffba' }}>English SubCategories</Typography>
      <Paper sx={{ bgcolor: '#1a1a1a', p: 2, borderRadius: 1, mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name (EN)</TableCell>
              <TableCell sx={{ color: '#fff' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subCategoriesEn.map((subcategory) => (
              <TableRow key={subcategory.SubCategoryIDEn}>
                <TableCell sx={{ color: '#ffffff' }}>{subcategory.SubCategoryIDEn}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{subcategory.SubCategoryNameEN}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ background: '#00ffba', color: '#000', mr: 1 }}
                    onClick={() => handleUpdateClick(subcategory)}
                  >
                    Update
                  </Button>
                  <Button
                    variant='contained'
                    sx={{ background: '#ff0000', color: '#fff', mr: 1 }}
                    onClick={() => handleDeleteClick(subcategory.SubCategoryIDEn, 'en')}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Mongolian Table */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#ffcc00' }}>Mongolian SubCategories</Typography>
      <Paper sx={{ bgcolor: '#1a1a1a', p: 2, borderRadius: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name (MN)</TableCell>
              <TableCell sx={{ color: '#fff' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subCategoriesMn.map((subcategory) => (
              <TableRow key={subcategory.SubCategoryIDMn}>
                <TableCell sx={{ color: '#ffffff' }}>{subcategory.SubCategoryIDMn}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{subcategory.SubCategoryNameMN}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    sx={{ background: '#ffcc00', color: '#fff', mr: 1 }}
                    onClick={() => handleUpdateClickMn(subcategory)}
                  >
                    Update
                  </Button>
                  <Button
                    variant='contained'
                    sx={{ background: '#ff0000', color: '#fff', mr: 1 }}
                    onClick={() => handleDeleteClick(subcategory.SubCategoryIDMn, 'mn')}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this subcategory?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" sx={{ backgroundColor: '#ff3333', color: '#fff' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* {Update} */}
      <Dialog open={updateModalOpenMn} onClose={() => setUpdateModalOpenMn(false)}>
        <DialogTitle>Update Mongolian SubCategory</DialogTitle>
        <DialogContent>
          {selectedSubCategoryMn && (
            <TextField
              fullWidth
              label="SubCategory Name (MN)"
              value={selectedSubCategoryMn.SubCategoryNameMN}
              onChange={(e) =>
                setSelectedSubCategoryMn({ ...selectedSubCategoryMn, SubCategoryNameMN: e.target.value })
              }
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
      {/* Update Modal */}
      <Dialog open={updateModalOpen} onClose={() => setUpdateModalOpen(false)}>
        <DialogTitle>Update SubCategory</DialogTitle>
        <DialogContent>
          {selectedSubCategory && (
            <TextField
              fullWidth
              label="SubCategory Name (EN)"
              value={selectedSubCategory.SubCategoryNameEN}
              onChange={(e) =>
                setSelectedSubCategory({ ...selectedSubCategory, SubCategoryNameEN: e.target.value })
              }
              sx={{ mb: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateSubmit} variant="contained" sx={{ background: '#00ffba', color: '#000' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add SubCategory Modal */}
      <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <DialogTitle>Add SubCategory</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category (EN)</InputLabel>
            <Select
              value={categoryEnId || ''}
              onChange={(e) => setCategoryEnId(Number(e.target.value))}
            >
              {enCategories.map((category) => (
                <MenuItem key={category.categoryEnId} value={category.categoryEnId}>
                  {category.categoryNameEn}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="SubCategory Name (EN)"
            fullWidth
            value={subCategoryEn}
            onChange={(e) => setSubCategoryEn(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category (MN)</InputLabel>
            <Select
              value={categoryMnId || ''}
              onChange={(e) => setCategoryMnId(Number(e.target.value))}
            >
              {mnCategories.map((category) => (
                <MenuItem key={category.categoryMnId} value={category.categoryMnId}>
                  {category.categoryNameMn}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="SubCategory Name (MN)"
            fullWidth
            value={subCategoryMn}
            onChange={(e) => setSubCategoryMn(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddModalOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAdd}
            variant="contained"
            sx={{ backgroundColor: '#00ffba', color: '#0d0d0d' }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Alert */}
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

export default SubMenuAdd;
