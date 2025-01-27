import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import api from './api'; // Import your centralized API utility
import Header from '@/@core/components/Navbar'; // Import your header component

interface Category {
  id: number;
  name: string;
}

const Product = () => {
  const [productNameEn, setProductNameEn] = useState('');
  const [subCategoryEnID, setSubCategoryEnID] = useState<number | null>(null);
  const [priceEn, setPriceEn] = useState('');
  const [stockQuantity, setStockQuantity] = useState<number | null>(null);
  const [imagesPathEn, setImagesPathEn] = useState<string>('');
  const [categoriesEn, setCategoriesEn] = useState<Category[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Fetch categories using the API instance
  const fetchCategories = async () => {
    try {
      const response = await api.get('/subCategory/listEn');
      const categories = response.data.map((cat: { SubCategoryIDEn: number; SubCategoryNameEn: string }) => ({
        id: cat.SubCategoryIDEn,
        name: cat.SubCategoryNameEn,
      }));
      setCategoriesEn(categories);
    } catch {
      setSnackbarMessage('Failed to fetch categories. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddProduct = async () => {
    if (!productNameEn || !subCategoryEnID || !priceEn || stockQuantity === null || !imagesPathEn) {
      setSnackbarMessage('All required fields must be filled.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const productData = {
      productNameEn,
      subCategoryEnID,
      priceEn,
      stockQuantity,
      imagesPathEn,
    };

    try {
      await api.post('/product/createEn', productData);
      setSnackbarMessage('Product added successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setAddModalOpen(false);
      resetForm();
    } catch {
      setSnackbarMessage('Failed to add product. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesPathEn(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setProductNameEn('');
    setSubCategoryEnID(null);
    setPriceEn('');
    setStockQuantity(null);
    setImagesPathEn('');
  };

  return (
    <>
      <Header /> {/* Add your header here */}
      <Box sx={{ backgroundColor: '#0d0d0d', color: '#fff', p: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Product Management
        </Typography>
        <Button
          variant="contained"
          onClick={() => setAddModalOpen(true)}
          sx={{ backgroundColor: '#00ffba', mb: 3 }}
        >
          Add Product
        </Button>

        <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
          <DialogTitle>Add Product</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth label="Product Name" value={productNameEn} onChange={(e) => setProductNameEn(e.target.value)} />
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>SubCategory</InputLabel>
                  <Select
                    value={subCategoryEnID || ''}
                    onChange={(e) => setSubCategoryEnID(Number(e.target.value))}
                  >
                    {categoriesEn.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField fullWidth label="Price" value={priceEn} onChange={(e) => setPriceEn(e.target.value)} />
                <TextField fullWidth label="Stock Quantity" type="number" value={stockQuantity || ''} onChange={(e) => setStockQuantity(Number(e.target.value))} />
              </Grid>
              <Grid item xs={6}>
                <input type="file" onChange={handleImageUpload} style={{ marginTop: 16 }} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProduct} variant="contained">
              Add Product
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
    </>
  );
};

export default Product;
