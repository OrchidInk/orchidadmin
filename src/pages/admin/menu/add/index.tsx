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
import axios from 'axios';
import Header from '@/@core/components/Navbar';
import { BASEURL } from '@/@core/utils/type/router';

// Types for categories
interface Category {
  id: number;
  categoryNameEn: string;
  categoryNameMn: string;
}

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryEn, setNewCategoryEn] = useState('');
  const [newCategoryMn, setNewCategoryMn] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found.');
      }

      const apiUrlEn = `${BASEURL}/api/v1/superadmin/category/listEn`;
      const apiUrlMn = `${BASEURL}/api/v1/superadmin/category/listMn`;

      const [enResponse, mnResponse] = await Promise.all([
        axios.get<{ categoryEnId: number; categoryNameEn: string }[]>(apiUrlEn, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get<{ categoryMnId: number; categoryNameMn: string }[]>(apiUrlMn, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const enCategories = enResponse.data || [];
      const mnCategories = mnResponse.data || [];

      const mergedCategories: Category[] = enCategories.map((enCategory) => {
        const matchingMnCategory = mnCategories.find(
          (mnCategory) => mnCategory.categoryMnId === enCategory.categoryEnId
        );
        return {
          id: enCategory.categoryEnId,
          categoryNameEn: enCategory.categoryNameEn || 'N/A',
          categoryNameMn: matchingMnCategory ? matchingMnCategory.categoryNameMn : 'N/A',
        };
      });

      setCategories(mergedCategories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setSnackbarMessage('Failed to fetch categories. Please try again.');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add a new category
  const handleAddCategory = async () => {
    if (!newCategoryEn || !newCategoryMn) {
      setSnackbarMessage('Both English and Mongolian category names are required.');
      setSnackbarOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found.');
      }

      const apiUrlEn = `${BASEURL}/api/v1/superadmin/category/createEn`;
      const apiUrlMn = `${BASEURL}/api/v1/superadmin/category/createMn`;

      const [enResponse] = await Promise.all([
        axios.post(apiUrlEn, { categoryNameEn: newCategoryEn }, { headers: { Authorization: `Bearer ${token}` } }),
        axios.post(apiUrlMn, { categoryNameMn: newCategoryMn }, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setCategories((prevCategories) => [
        ...prevCategories,
        {
          id: enResponse.data.categoryId,
          categoryNameEn: newCategoryEn,
          categoryNameMn: newCategoryMn,
        },
      ]);

      setNewCategoryEn('');
      setNewCategoryMn('');
      setAddModalOpen(false);
      setSnackbarMessage('Category added successfully.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to add category:', error);
      setSnackbarMessage('Failed to add category. Please try again.');
      setSnackbarOpen(true);
    }
  };

  // Delete a category
  const handleDeleteCategory = async () => {
    if (categoryToDelete === null) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found.');
      }

      const apiUrlEn = `${BASEURL}/api/v1/superadmin/category/deleteEn/${categoryToDelete}`;
      const apiUrlMn = `${BASEURL}/api/v1/superadmin/category/deleteMn/${categoryToDelete}`;

      await Promise.all([
        axios.delete(apiUrlEn, { headers: { Authorization: `Bearer ${token}` } }),
        axios.delete(apiUrlMn, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryToDelete));
      setDeleteModalOpen(false);
      setSnackbarMessage('Category deleted successfully.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to delete category:', error);
      setSnackbarMessage('Failed to delete category. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
        <Paper sx={{ bgcolor: '#1a1a1a', p: 2, borderRadius: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Category Name (EN)</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Category Name (MN)</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell sx={{ color: '#ffffff' }}>{category.id}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{category.categoryNameEn}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{category.categoryNameMn}</TableCell>
                    <TableCell>
                      <Button
                        variant='contained'
                        color='primary'
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setCategoryToDelete(category.id);
                          setDeleteModalOpen(true);
                        }}
                        sx={{ fontWeight: 'bold' }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: 'center', color: '#ffffff' }}>
                    No Categories Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
      <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <DialogTitle sx={{ color: '#ffffff', backgroundColor: '#1a1a1a' }}>Add Category</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#1a1a1a' }}>
          <TextField
            fullWidth
            label="Category Name (EN)"
            variant="outlined"
            value={newCategoryEn}
            onChange={(e) => setNewCategoryEn(e.target.value)}
            sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
          />
          <TextField
            fullWidth
            label="Category Name (MN)"
            variant="outlined"
            value={newCategoryMn}
            onChange={(e) => setNewCategoryMn(e.target.value)}
            sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#1a1a1a' }}>
          <Button onClick={() => setAddModalOpen(false)} sx={{ color: '#ffffff' }}>
            Cancel
          </Button>
          <Button onClick={handleAddCategory} variant="contained" sx={{ backgroundColor: '#00ffba', color: '#0d0d0d' }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle sx={{ color: '#ffffff', backgroundColor: '#1a1a1a' }}>Delete Category</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#1a1a1a' }}>
          <Typography sx={{ color: '#ffffff' }}>Are you sure you want to delete this category?</Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#1a1a1a' }}>
          <Button onClick={() => setDeleteModalOpen(false)} sx={{ color: '#ffffff' }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteCategory} variant="contained" sx={{ backgroundColor: 'red', color: '#ffffff' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default CategoryManagement;
