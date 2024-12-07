import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { AxiosError } from 'axios';
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
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from '@/@core/components/Navbar';
import MuiAlert from '@mui/material/Alert';
import { adminLogin, BASEURL } from '@/@core/utils/type/router';

interface Category {
  id: number;
  categoryNameEn: string;
  categoryNameMn: string;
}

const createCategoryEn = async (categoryNameEn: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const apiUrl = `${BASEURL}/api/v1/superadmin/category/createEn`;
    const response = await axios.post(apiUrl, { categoryNameEn }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 401) {
      console.error('Unauthorized. Redirecting to login.');
      localStorage.removeItem('token');
      window.location.href = adminLogin;
    }
    throw error;
  }
};

const createCategoryMn = async (categoryNameMn: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const apiUrl = `${BASEURL}/api/v1/superadmin/category/createMn`;
    const response = await axios.post(apiUrl, { categoryNameMn }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 401) {
      console.error('Unauthorized. Redirecting to login.');
      localStorage.removeItem('token');
      window.location.href = adminLogin;
    }
    throw error;
  }
};

const deleteCategory = async (categoryId: number) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const apiUrlEn = `${BASEURL}/api/v1/superadmin/category/deleteEn/${categoryId}`;
    const apiUrlMn = `${BASEURL}/api/v1/superadmin/category/deleteMn/${categoryId}`;

    await Promise.all([
      axios.delete(apiUrlEn, { headers: { Authorization: `Bearer ${token}` } }),
      axios.delete(apiUrlMn, { headers: { Authorization: `Bearer ${token}` } }),
    ]);
  } catch (error) {
    throw error;
  }
};

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryEn, setNewCategoryEn] = useState('');
  const [newCategoryMn, setNewCategoryMn] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingCategoryEn, setEditingCategoryEn] = useState('');
  const [editingCategoryMn, setEditingCategoryMn] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found.');
        return;
      }

      const apiUrlEn = `${BASEURL}/api/v1/superadmin/category/listEn`;
      const apiUrlMn = `${BASEURL}/api/v1/superadmin/category/listMn`;

      const [enResponse, mnResponse] = await Promise.all([
        axios.get(apiUrlEn, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(apiUrlMn, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const enCategories = enResponse.data || [];
      const mnCategories = mnResponse.data || [];

      const mergedCategories = enCategories.map((enCategory: any) => {
        const matchingMnCategory = mnCategories.find(
          (mnCategory: any) => mnCategory.categoryMnId === enCategory.categoryEnId
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

  const handleAddCategory = async () => {
    if (!newCategoryEn || !newCategoryMn) {
      setSnackbarMessage('Both English and Mongolian category names are required.');
      setSnackbarOpen(true);
      return;
    }

    try {
      const enResult = await createCategoryEn(newCategoryEn);
      const mnResult = await createCategoryMn(newCategoryMn);

      if (enResult && mnResult) {
        const newCategory: Category = {
          id: enResult.categoryId, // Assuming that the category ID is returned from the response
          categoryNameEn: newCategoryEn,
          categoryNameMn: newCategoryMn,
        };

        setCategories([...categories, newCategory]);
        setNewCategoryEn('');
        setNewCategoryMn('');
        setAddModalOpen(false);
        setSnackbarMessage('Category added successfully.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Failed to add category:', error);
      setSnackbarMessage('Failed to add category. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteCategory = async () => {
    if (categoryToDelete !== null) {
      try {
        await deleteCategory(categoryToDelete);
        setCategories(categories.filter((category) => category.id !== categoryToDelete));
        setDeleteModalOpen(false);
        setSnackbarMessage('Category deleted successfully.');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to delete category:', error);
        setSnackbarMessage('Failed to delete category. Please try again.');
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#ffffff' }}>
      <Header />
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          mt: 4,
          mx: 'auto',
          width: isMobile ? '90%' : '60%',
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: '#ffffff', fontWeight: 'bold' }}>
          Category Management
        </Typography>

        <Button
          variant="contained"
          onClick={() => setAddModalOpen(true)}
          sx={{
            bgcolor: '#00ffba',
            color: '#0d0d0d',
            fontWeight: 'bold',
            mb: 2,
            '&:hover': { bgcolor: '#00e6a0' },
          }}
        >
          Add Category
        </Button>

        <Paper elevation={3} sx={{ overflowX: 'auto', bgcolor: '#1a1a1a', p: 2, borderRadius: 1 }}>
          <Table size={isMobile ? 'small' : 'medium'}>
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
                  <TableCell colSpan={4} sx={{ color: '#ffffff', textAlign: 'center' }}>
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>

        {/* Add Category Modal */}
        <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
          <DialogTitle sx={{ color: '#ffffff', backgroundColor: '#1a1a1a' }}>Add New Category</DialogTitle>
          <DialogContent sx={{ backgroundColor: '#1a1a1a' }}>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name (EN)"
              fullWidth
              variant="outlined"
              value={newCategoryEn}
              onChange={(e) => setNewCategoryEn(e.target.value)}
              sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
            />
            <TextField
              margin="dense"
              label="Category Name (MN)"
              fullWidth
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
            <Button onClick={handleAddCategory} variant="contained" color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Category Modal */}
        <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <DialogTitle sx={{ color: '#ffffff', backgroundColor: '#1a1a1a' }}>Delete Category</DialogTitle>
          <DialogContent sx={{ backgroundColor: '#1a1a1a' }}>
            <Typography sx={{ color: '#ffffff' }}>
              Are you sure you want to delete this category?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#1a1a1a' }}>
            <Button onClick={() => setDeleteModalOpen(false)} sx={{ color: '#ffffff' }}>
              Cancel
            </Button>
            <Button onClick={handleDeleteCategory} variant="contained" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
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
    </Box>
  );
};

export default CategoryManagement;
