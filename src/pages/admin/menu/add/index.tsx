import React, { useState } from 'react';
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
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from '@/@core/components/Navbar';
import MuiAlert from '@mui/material/Alert';

interface Category {
  id: number;
  category_name_en: string;
  category_name_mn: string;
}

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

  const handleAddCategory = () => {
    if (!newCategoryEn || !newCategoryMn) {
      setSnackbarMessage('Both English and Mongolian category names are required.');
      setSnackbarOpen(true);
      return;
    }

    const newCategory: Category = {
      id: categories.length + 1,
      category_name_en: newCategoryEn,
      category_name_mn: newCategoryMn,
    };

    setCategories([...categories, newCategory]);
    setNewCategoryEn('');
    setNewCategoryMn('');
    setAddModalOpen(false);
    setSnackbarMessage('Category added successfully.');
    setSnackbarOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategoryId(category.id);
    setEditingCategoryEn(category.category_name_en);
    setEditingCategoryMn(category.category_name_mn);
  };

  const handleSaveCategory = () => {
    setCategories(categories.map(cat =>
      cat.id === editingCategoryId
        ? { ...cat, category_name_en: editingCategoryEn, category_name_mn: editingCategoryMn }
        : cat
    ));
    setEditingCategoryId(null);
    setEditingCategoryEn('');
    setEditingCategoryMn('');
    setSnackbarMessage('Category updated successfully.');
    setSnackbarOpen(true);
  };

  const openDeleteModal = (id: number) => {
    setCategoryToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteCategory = () => {
    if (categoryToDelete !== null) {
      setCategories(categories.filter(category => category.id !== categoryToDelete));
      setDeleteModalOpen(false);
      setSnackbarMessage('Category deleted successfully.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#ffffff' }}>
      <Header />
      <Box sx={{ p: 4, borderRadius: 2, boxShadow: 3, mt: 4, mx: 'auto', width: isMobile ? '90%' : '60%' }}>
        <Typography variant="h5" sx={{ mb: 3, color: '#ffffff', fontWeight: 'bold' }}>
          Category Management
        </Typography>

        <Button variant="contained" onClick={() => setAddModalOpen(true)} sx={{
          bgcolor: '#00ffba', color: '#0d0d0d', fontWeight: 'bold', mb: 2, '&:hover': { bgcolor: '#00e6a0' }
        }}>
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
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell sx={{ color: '#ffffff' }}>{category.id}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>
                    {editingCategoryId === category.id ? (
                      <TextField
                        variant="outlined"
                        value={editingCategoryEn}
                        onChange={(e) => setEditingCategoryEn(e.target.value)}
                        sx={{ input: { color: '#ffffff' } }}
                      />
                    ) : (
                      category.category_name_en
                    )}
                  </TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>
                    {editingCategoryId === category.id ? (
                      <TextField
                        variant="outlined"
                        value={editingCategoryMn}
                        onChange={(e) => setEditingCategoryMn(e.target.value)}
                        sx={{ input: { color: '#ffffff' } }}
                      />
                    ) : (
                      category.category_name_mn
                    )}
                  </TableCell>
                  <TableCell>
                    {editingCategoryId === category.id ? (
                      <Button variant="contained" onClick={handleSaveCategory} sx={{ mr: 1, fontWeight: 'bold', bgcolor: '#00ffba', color: '#0d0d0d', '&:hover': { bgcolor: '#00e6a0' } }}>
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEditCategory(category)}
                        sx={{ mr: 1, fontWeight: 'bold', color: '#00ffba', borderColor: '#00ffba', '&:hover': { borderColor: '#00e6a0', color: '#00e6a0' } }}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => openDeleteModal(category.id)}
                      sx={{ fontWeight: 'bold', bgcolor: '#ff4d4d', '&:hover': { bgcolor: '#ff3333' } }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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

        {/* Delete Confirmation Modal */}
        <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <DialogTitle sx={{ color: '#ffffff', backgroundColor: '#1a1a1a' }}>Confirm Deletion</DialogTitle>
          <DialogContent sx={{ backgroundColor: '#1a1a1a' }}>
            <DialogContentText sx={{ color: '#ffffff' }}>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#1a1a1a' }}>
            <Button onClick={() => setDeleteModalOpen(false)} sx={{ color: '#ffffff' }}>
              No
            </Button>
            <Button onClick={handleDeleteCategory} variant="contained" color="error">
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar Notification */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%', color: '#ffffff', backgroundColor: '#1a1a1a' }}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default CategoryManagement;
