import React, { useState, useEffect } from 'react';
import Header from "@/@core/components/Navbar";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
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
} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MuiAlert from '@mui/material/Alert';
import {
  addSubCategoryEn,
  addSubCategoryMn,
  fetchCategoriesEn,
  fetchCategoriesMn,
} from '@/pages/api/submenu';
import { AxiosError } from 'axios';

interface Category {
  categoryEnId: number;
  categoryNameEn: string;
  categoryMnId: number;
  categoryNameMn: string;
  subcategories?: SubCategory[];
}

interface SubCategory {
  subCategoryId: number;
  subCategoryNameEn: string;
  subCategoryNameMn: string;
}

const SubMenuAdd = () => {
  const [subCategoryMn, setSubCategoryMn] = useState('');
  const [subCategoryEn, setSubCategoryEn] = useState('');
  const [categoryMnId, setCategoryMnId] = useState<number | null>(null);
  const [categoryEnId, setCategoryEnId] = useState<number | null>(null);
  const [mnCategories, setMnCategories] = useState<Category[]>([]);
  const [enCategories, setEnCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Fetch Categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const mnData = await fetchCategoriesMn();
        const enData = await fetchCategoriesEn();
        setMnCategories(mnData);
        setEnCategories(enData);

        // Extract subcategories from both English and Mongolian categories
        const extractedSubCategories: SubCategory[] = [];
        mnData.forEach((category: any) => {
          if (category.subcategories) {
            category.subcategories.forEach((subCategory: any) => {
              extractedSubCategories.push({
                subCategoryId: subCategory.subCategoryIDMn,
                subCategoryNameEn: 'N/A', // Default to 'N/A' for English
                subCategoryNameMn: subCategory.SubCategoryNameMN,
              });
            });
          }
        });
        enData.forEach((category: any) => {
          if (category.subcategories) {
            category.subcategories.forEach((subCategory: any) => {
              const existingSubCategory = extractedSubCategories.find(
                (sc) => sc.subCategoryId === subCategory.subcategoryIDEN
              );
              if (existingSubCategory) {
                existingSubCategory.subCategoryNameEn = subCategory.SubCategoryNameEN;
              } else {
                extractedSubCategories.push({
                  subCategoryId: subCategory.subcategoryIDEN,
                  subCategoryNameEn: subCategory.SubCategoryNameEN,
                  subCategoryNameMn: 'N/A', // Default to 'N/A' for Mongolian
                });
              }
            });
          }
        });
        setSubCategories(extractedSubCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        if (error instanceof AxiosError && error.response?.status === 401) {
          alert('Session expired. Redirecting to login...');
          window.location.href = '/login';
        }
      }
    };
    loadCategories();
  }, []);

  const handleAdd = async () => {
    if (validateInputs()) {
      try {
        await addSubCategoryEn(subCategoryEn, categoryEnId!);
        await addSubCategoryMn(subCategoryMn, categoryMnId!);
        setSnackbarMessage('Subcategory added successfully.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setAddModalOpen(false);
        clearInputs();
      } catch (error) {
        console.error('Failed to add subcategory:', error);
        setSnackbarMessage('Failed to add subcategory. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  const validateInputs = () => {
    if (!subCategoryMn || !subCategoryEn || categoryMnId === null || categoryEnId === null) {
      alert('All fields are required and must be valid!');
      return false;
    }
    return true;
  };

  const clearInputs = () => {
    setSubCategoryMn('');
    setSubCategoryEn('');
    setCategoryMnId(null);
    setCategoryEnId(null);
  };

  return (
    <Box sx={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#ffffff' }}>
      <Header />
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          SubCategory Management
        </Typography>

        {/* Add SubCategory Button */}
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={() => setAddModalOpen(true)}
          sx={{
            backgroundColor: '#00ffba',
            color: '#0d0d0d',
            fontWeight: 'bold',
            mb: 2,
            '&:hover': { backgroundColor: '#00e6a0' },
          }}
        >
          Add SubCategory
        </Button>

        {/* Existing SubCategories */}
        <Paper elevation={3} sx={{ overflowX: 'auto', bgcolor: '#1a1a1a', p: 2, borderRadius: 1, mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>SubCategory ID</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>SubCategory Name (EN)</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>SubCategory Name (MN)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subCategories.length > 0 ? (
                subCategories.map((subcategory) => (
                  <TableRow key={subcategory.subCategoryId}>
                    <TableCell sx={{ color: '#ffffff' }}>{subcategory.subCategoryId}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{subcategory.subCategoryNameEn ?? 'N/A'}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{subcategory.subCategoryNameMn ?? 'N/A'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} sx={{ textAlign: 'center', color: '#999' }}>
                    No subcategories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>

        {/* Add SubCategory Modal */}
        <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
          <DialogTitle sx={{ color: '#ffffff', backgroundColor: '#1a1a1a' }}>
            Add New SubCategory
            <IconButton
              aria-label="close"
              onClick={() => setAddModalOpen(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: '#ffffff',
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: '#1a1a1a' }}>
            <TextField
              autoFocus
              margin="dense"
              label="SubCategory Name (MN)"
              fullWidth
              variant="outlined"
              value={subCategoryMn}
              onChange={(e) => setSubCategoryMn(e.target.value)}
              sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: '#ffffff' }}>Category ID (MN)</InputLabel>
              <Select
                value={categoryMnId || ''}
                onChange={(e) => setCategoryMnId(Number(e.target.value))}
                sx={{ color: '#ffffff', '& .MuiSvgIcon-root': { color: '#ffffff' } }}
              >
                {(mnCategories ?? []).map((category) => (
                  <MenuItem key={category.categoryMnId} value={category.categoryMnId}>
                    {category.categoryNameMn}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              margin="dense"
              label="SubCategory Name (EN)"
              fullWidth
              variant="outlined"
              value={subCategoryEn}
              onChange={(e) => setSubCategoryEn(e.target.value)}
              sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: '#ffffff' }}>Category ID (EN)</InputLabel>
              <Select
                value={categoryEnId || ''}
                onChange={(e) => setCategoryEnId(Number(e.target.value))}
                sx={{ color: '#ffffff', '& .MuiSvgIcon-root': { color: '#ffffff' } }}
              >
                {(enCategories ?? []).map((category) => (
                  <MenuItem key={category.categoryEnId} value={category.categoryEnId}>
                    {category.categoryNameEn}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#1a1a1a' }}>
            <Button onClick={() => setAddModalOpen(false)} sx={{ color: '#ffffff' }}>
              Cancel
            </Button>
            <Button onClick={handleAdd} variant="contained" sx={{ backgroundColor: '#00ffba', color: '#0d0d0d' }}>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for Success/Error Messages */}
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
    </Box>
  );
};

export default SubMenuAdd;
