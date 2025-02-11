import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios, { AxiosError } from 'axios';
import Header from '@/@core/components/Navbar';
import { BASEURL } from '@/@core/utils/type/router';

// Types for categories
interface CategoryEn {
  categoryEnId: number;
  categoryNameEn: string;
}

interface CategoryMn {
  categoryMnId: number;
  categoryNameMn: string;
}

const CategoryManagement = () => {
  const [categoriesEn, setCategoriesEn] = useState<CategoryEn[]>([]);
  const [categoriesMn, setCategoriesMn] = useState<CategoryMn[]>([]);
  const [newCategoryEn, setNewCategoryEn] = useState('');
  const [newCategoryMn, setNewCategoryMn] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [updateModelOpenEn, setUpdateModalOpenEn] = useState(false)
  const [updateModelOpenMn, setUpdateModalOpenMn] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCategoryType, setDeleteCategoryType] = useState<'en' | 'mn' | null>(null);
  // Fetch categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found.');

      const [enResponse, mnResponse] = await Promise.all([
        axios.get<CategoryEn[]>(`${BASEURL}/api/v1/superadmin/category/listEn`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get<CategoryMn[]>(`${BASEURL}/api/v1/superadmin/category/listMn`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setCategoriesEn(enResponse.data || []);
      setCategoriesMn(mnResponse.data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      handleSnackbar('❌ Failed to fetch categories. Please try again.', 'error');
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // **Update English Category**
  const handleUpdateCategoryEn = async () => {
    if (!selectedCategoryId || !newCategoryEn) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found.');

      await axios.patch(`https://api.orchid.mn/api/v1/superadmin/category/updateEn/${selectedCategoryId}`, { categoryNameEn: newCategoryEn }, { headers: { Authorization: `Bearer ${token}` } });

      setCategoriesEn((prev) =>
        prev.map((category) =>
          category.categoryEnId === selectedCategoryId ? { ...category, categoryNameEn: newCategoryEn } : category
        )
      );

      setNewCategoryEn('');
      setUpdateModalOpenEn(false);
      setAddModalOpen(false);
      handleSnackbar('✅ English category updated successfully!', 'success');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      handleSnackbar('❌ Failed to update English category. Try again.', 'error');
    }
  };

  // **Update Mongolian Category**
  const handleUpdateCategoryMn = async () => {
    if (!selectedCategoryId || !newCategoryMn) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found.');

      await axios.patch(`${BASEURL}/api/v1/superadmin/category/updateMn/${selectedCategoryId}`, { categoryNameMn: newCategoryMn }, { headers: { Authorization: `Bearer ${token}` } });

      setCategoriesMn((prev) =>
        prev.map((category) =>
          category.categoryMnId === selectedCategoryId ? { ...category, categoryNameMn: newCategoryMn } : category
        )
      );

      setNewCategoryMn('');
      setUpdateModalOpenMn(false);
      setAddModalOpen(false);
      handleSnackbar('✅ Mongolian category updated successfully!', 'success');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      handleSnackbar('❌ Failed to update Mongolian category. Try again.', 'error');
    }
  };


  const handleUpdateClickEn = (category: CategoryEn) => {
    setSelectedCategoryId(category.categoryEnId);
    setNewCategoryEn(category.categoryNameEn);
    setUpdateModalOpenEn(true);
  };

  // Delete Category
  const handleDeleteCategory = async () => {
    if (!selectedCategoryId || !deleteCategoryType) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found.');

      const apiUrl =
        deleteCategoryType === 'en'
          ? `${BASEURL}/api/v1/superadmin/category/deleteEn/${selectedCategoryId}`
          : `${BASEURL}/api/v1/superadmin/category/deleteMn/${selectedCategoryId}`;

      await axios.delete(apiUrl, { headers: { Authorization: `Bearer ${token}` } });

      if (deleteCategoryType === 'en') {
        setCategoriesEn(categoriesEn.filter((category) => category.categoryEnId !== selectedCategoryId));
      } else {
        setCategoriesMn(categoriesMn.filter((category) => category.categoryMnId !== selectedCategoryId));
      }

      setDeleteModalOpen(false);
      handleSnackbar('✅ Category deleted successfully!', 'success');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      handleSnackbar('❌ Failed to delete category. Please try again.', 'error');
    }
  };
  const handleUpdateClickMn = (category: CategoryMn) => { // Added missing handler
    setSelectedCategoryId(category.categoryMnId);
    setNewCategoryMn(category.categoryNameMn);
    setUpdateModalOpenMn(true);
  };
  const handleDeleteClick = (categoryId: number, type: 'en' | 'mn') => {
    setSelectedCategoryId(categoryId);
    setDeleteCategoryType(type);
    setDeleteModalOpen(true);
  };
  // Snackbar Handler
  const handleSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  // Add a new category
  const handleAddCategory = async () => {
    if (!newCategoryEn || !newCategoryMn) {
      handleSnackbar('⚠️ Both English and Mongolian category names are required.', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found.');

      const [enResponse, mnResponse] = await Promise.all([
        axios.post(`${BASEURL}/api/v1/superadmin/category/createEn`, { categoryNameEn: newCategoryEn }, { headers: { Authorization: `Bearer ${token}` } }),
        axios.post(`${BASEURL}/api/v1/superadmin/category/createMn`, { categoryNameMn: newCategoryMn }, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setCategoriesEn([...categoriesEn, { categoryEnId: enResponse.data.categoryId, categoryNameEn: newCategoryEn }]);
      setCategoriesMn([...categoriesMn, { categoryMnId: mnResponse.data.categoryId, categoryNameMn: newCategoryMn }]);

      setNewCategoryEn('');
      setNewCategoryMn('');
      setAddModalOpen(false);
      handleSnackbar('✅ Category added successfully!', 'success');
    } catch (error) {
      console.error('Failed to add category:', error);
      if (error instanceof AxiosError) {
        handleSnackbar(`❌ ${error.response?.data?.message || 'Failed to add category. Try again.'}`, 'error');
      } else {
        handleSnackbar('❌ Failed to add category. Please try again.', 'error');
      }
    }
  };

  // Snackbar Handler

  return (
    <Box sx={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#ffffff' }}>
      <Header />
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>
          Category Management
        </Typography>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => setAddModalOpen(true)}
            sx={{ bgcolor: '#00ffba', color: '#0d0d0d', fontWeight: 'bold' }}
          >
            Add Category
          </Button>
        </Box>

        {/* English Category Table */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#00ffba' }}>English Categories</Typography>
        <Paper sx={{ bgcolor: '#1a1a1a', p: 2, borderRadius: 1, mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Category Name (EN)</TableCell>
                <TableCell sx={{ color: '#fff' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoriesEn.map((category) => (
                <TableRow key={category.categoryEnId}>
                  <TableCell sx={{ color: '#ffffff' }}>{category.categoryEnId}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{category.categoryNameEn}</TableCell>
                  <TableCell>
                    <Button
                      variant='contained'
                      sx={{ background: "#00ffba", color: "#fff", mr: 1 }}
                      onClick={() => handleUpdateClickEn(category)}

                    >
                      Update
                    </Button>
                    <Button
                      variant='contained'
                      sx={{ background: "#ff0000", color: "#fff", mr: 1 }}
                      onClick={() => handleDeleteClick(category.categoryEnId, 'en')}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* Mongolian Category Table */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#ffcc00' }}>Mongolian Categories</Typography>
        <Paper sx={{ bgcolor: '#1a1a1a', p: 2, borderRadius: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Category Name (MN)</TableCell>
                <TableCell sx={{ color: '#fff' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoriesMn.map((category) => (
                <TableRow key={category.categoryMnId}>
                  <TableCell sx={{ color: '#ffffff' }}>{category.categoryMnId}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{category.categoryNameMn}</TableCell>
                  <TableCell>
                    <Button
                      variant='contained'
                      sx={{ background: "#ffcc00", color: "#fff", mr: 1 }}
                      onClick={() => handleUpdateClickMn(category)}
                    >
                      Update
                    </Button>
                    <Button
                      variant='contained'
                      sx={{ background: "#ff0000", color: "#fff", mr: 1 }}
                      onClick={() => handleDeleteClick(category.categoryMnId, 'mn')}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      <Dialog open={updateModelOpenMn} onClose={() => setUpdateModalOpenMn(false)}>
        <DialogTitle>Update Category (MN)</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Category Name (MN)"
            value={newCategoryMn}
            onChange={(e) => setNewCategoryMn(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateModalOpenMn(false)}>Cancel</Button>
          <Button onClick={handleUpdateCategoryMn} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
      {/* Update Model En */}
      <Dialog open={updateModelOpenEn} onClose={() => setUpdateModalOpenEn(false)}>
        <DialogTitle>Update Category (EN)</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Category Name (EN)"
            value={newCategoryEn}
            onChange={(e) => setNewCategoryEn(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateModalOpenEn(false)}>Cancel</Button>
          <Button onClick={handleUpdateCategoryEn} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this category?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteCategory} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Category Modal */}
      <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Category Name (EN)" value={newCategoryEn} onChange={(e) => setNewCategoryEn(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Category Name (MN)" value={newCategoryMn} onChange={(e) => setNewCategoryMn(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCategory} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <MuiAlert elevation={6} variant="filled" severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default CategoryManagement;
