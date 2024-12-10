import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  TextField,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MuiAlert from '@mui/material/Alert';
import { AxiosError } from 'axios';
import { fetchCategoriesEn, fetchCategoriesMn, addSubCategoryEn, addSubCategoryMn } from '@/pages/api/submenu';
import Header from '@/@core/components/Navbar';

// Interfaces for response data
interface SubCategoryEn {
  subcategoryIDEN: number;
  SubCategoryNameEN: string;
  categoryEnId: number;
}

interface SubCategoryMn {
  subCategoryIDMn: number;
  SubCategoryNameMN: string;
  categoryMnId: number;
}

interface CategoryEn {
  categoryEnId: number;
  categoryNameEn: string;
  subcategories?: SubCategoryEn[];
}

interface CategoryMn {
  categoryMnId: number;
  categoryNameMn: string;
  subcategories?: SubCategoryMn[];
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
  const [mnCategories, setMnCategories] = useState<CategoryMn[]>([]);
  const [enCategories, setEnCategories] = useState<CategoryEn[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Fetch categories and process subcategories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const mnData: CategoryMn[] = await fetchCategoriesMn();
        const enData: CategoryEn[] = await fetchCategoriesEn();

        setMnCategories(mnData);
        setEnCategories(enData);

        const unifiedSubCategories: SubCategory[] = [];

        // Process Mongolian subcategories
        mnData.forEach((category) => {
          category.subcategories?.forEach((subCategory) => {
            unifiedSubCategories.push({
              subCategoryId: subCategory.subCategoryIDMn,
              subCategoryNameMn: subCategory.SubCategoryNameMN,
              subCategoryNameEn: 'N/A', // Default until matched with English
            });
          });
        });

        // Process English subcategories and merge with Mongolian
        enData.forEach((category) => {
          category.subcategories?.forEach((subCategory) => {
            const matchingSubCategory = unifiedSubCategories.find(
              (sc) => sc.subCategoryId === subCategory.subcategoryIDEN
            );
            if (matchingSubCategory) {
              matchingSubCategory.subCategoryNameEn = subCategory.SubCategoryNameEN;
            } else {
              unifiedSubCategories.push({
                subCategoryId: subCategory.subcategoryIDEN,
                subCategoryNameEn: subCategory.SubCategoryNameEN,
                subCategoryNameMn: 'N/A', // Default until matched with Mongolian
              });
            }
          });
        });

        setSubCategories(unifiedSubCategories);
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
    if (!subCategoryMn || !subCategoryEn || categoryMnId === null || categoryEnId === null) {
      alert('All fields are required!');
      return;
    }
    try {
      await Promise.all([
        addSubCategoryEn(subCategoryEn, categoryEnId),
        addSubCategoryMn(subCategoryMn, categoryMnId),
      ]);
      setSnackbarMessage('Subcategory added successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add subcategory:', error);
      setSnackbarMessage('Failed to add subcategory.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
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
      <Paper sx={{ bgcolor: '#1a1a1a', p: 2, borderRadius: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>SubCategory ID</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>SubCategory Name (EN)</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>SubCategory Name (MN)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subCategories.map((subcategory) => (
              <TableRow key={subcategory.subCategoryId}>
                <TableCell sx={{ color: '#ffffff' }}>{subcategory.subCategoryId}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{subcategory.subCategoryNameEn}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{subcategory.subCategoryNameMn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

            <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
  <DialogTitle sx={{ color: '#ffffff', backgroundColor: '#1a1a1a' }}>Add SubCategory</DialogTitle>
  <DialogContent sx={{ backgroundColor: '#1a1a1a' }}>
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel sx={{ color: '#ffffff' }}>Category (MN)</InputLabel>
      <Select
        value={categoryMnId || ''}
        onChange={(e) => setCategoryMnId(Number(e.target.value))}
        sx={{
          color: '#ffffff',
          '& .MuiSvgIcon-root': {
            color: '#ffffff', // Change dropdown arrow color
          },
        }}
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
      variant="outlined"
      value={subCategoryMn}
      onChange={(e) => setSubCategoryMn(e.target.value)}
      sx={{
        mb: 2,
        '& .MuiInputBase-input': {
          color: '#ffffff', // White text for input
        },
        '& .MuiInputLabel-root': {
          color: '#ffffff', // White text for label
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ffffff', // Border color
          },
          '&:hover fieldset': {
            borderColor: '#00ffba', // Hover border color
          },
          '&.Mui-focused fieldset': {
            borderColor: '#00ffba', // Focused border color
          },
        },
      }}
    />
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel sx={{ color: '#ffffff' }}>Category (EN)</InputLabel>
      <Select
        value={categoryEnId || ''}
        onChange={(e) => setCategoryEnId(Number(e.target.value))}
        sx={{
          color: '#ffffff',
          '& .MuiSvgIcon-root': {
            color: '#ffffff',
          },
        }}
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
      variant="outlined"
      value={subCategoryEn}
      onChange={(e) => setSubCategoryEn(e.target.value)}
      sx={{
        mb: 2,
        '& .MuiInputBase-input': {
          color: '#ffffff',
        },
        '& .MuiInputLabel-root': {
          color: '#ffffff',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ffffff',
          },
          '&:hover fieldset': {
            borderColor: '#00ffba',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#00ffba',
          },
        },
      }}
    />
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


      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert severity={snackbarSeverity}>{snackbarMessage}</MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default SubMenuAdd;
