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
  Snackbar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { apiSuperAdminFileUrl, apiSuperAdminProduct } from '@/@core/utils/type/router';

interface Product {
  productName: string;
  subCategoryID: number;
  price: string;
  stockQuantity: number;
  imagesPath: string;
}

const Product = () => {
  const [productNameEn, setProductNameEn] = useState('');
  const [subCategoryEnID, setSubCategoryEnID] = useState<number | null>(null);
  const [priceEn, setPriceEn] = useState('');
  const [stockQuantity, setStockQuantity] = useState<number | null>(null);
  const [imagesPathEn, setImagesPathEn] = useState<File | null>(null);

  const [productNameMn, setProductNameMn] = useState('');
  const [subCategoryMnID, setSubCategoryMnID] = useState<number | null>(null);
  const [priceMn, setPriceMn] = useState('');
  const [stockQuantityMn, setStockQuantityMn] = useState<number | null>(null);
  const [imagesPathMn, setImagesPathMn] = useState<File | null>(null);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [productsEn, setProductsEn] = useState<Product[]>([]);
  const [productsMn, setProductsMn] = useState<Product[]>([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseEn = await axios.get(`${apiSuperAdminProduct}/listEn`);
        setProductsEn(responseEn.data || []);

        const responseMn = await axios.get(`${apiSuperAdminProduct}/listMn`);
        setProductsMn(responseMn.data || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handles submission of product
  const handleAddProduct = async () => {
    if (!productNameEn || subCategoryEnID === null || !priceEn || stockQuantity === null || !imagesPathEn || !productNameMn || subCategoryMnID === null || !priceMn || stockQuantityMn === null || !imagesPathMn) {
      setSnackbarMessage('All fields are required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const formDataEn = new FormData();
      formDataEn.append('productNameEn', productNameEn);
      formDataEn.append('subCategoryEnID', subCategoryEnID.toString());
      formDataEn.append('priceEn', priceEn);
      formDataEn.append('stockQuantity', stockQuantity.toString());
      formDataEn.append('file', imagesPathEn);
      formDataEn.append('foldername', 'product-en');
      await axios.post(`${apiSuperAdminProduct}/createEn`, formDataEn);
      await axios.post(`${apiSuperAdminProduct}/createImagesEn`, formDataEn);

      const formDataMn = new FormData();
      formDataMn.append('productNameMn', productNameMn);
      formDataMn.append('subCategoryMnID', subCategoryMnID.toString());
      formDataMn.append('priceMn', priceMn);
      formDataMn.append('stockQuantity', stockQuantityMn.toString());
      formDataMn.append('file', imagesPathMn);
      formDataMn.append('foldername', 'product-mn');
      await axios.post(`${apiSuperAdminProduct}/createMn`, formDataMn);
      await axios.post(`${apiSuperAdminProduct}/createImagesMn`, formDataMn);

      setSnackbarMessage('Product added successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setAddModalOpen(false);
      clearInputs();
    } catch (error) {
      setSnackbarMessage('Failed to add product. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Handles image upload for general file upload API
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setImagePath: React.Dispatch<React.SetStateAction<File | null>>, foldername: string) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('foldername', foldername);
        await axios.post(apiSuperAdminFileUrl, formData);
        setImagePath(file);
      } catch (error) {
        setSnackbarMessage('Failed to upload image. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  // Clears form input fields
  const clearInputs = () => {
    setProductNameEn('');
    setSubCategoryEnID(null);
    setPriceEn('');
    setStockQuantity(null);
    setImagesPathEn(null);

    setProductNameMn('');
    setSubCategoryMnID(null);
    setPriceMn('');
    setStockQuantityMn(null);
    setImagesPathMn(null);
  };

  return (
    <>
      <Header />

      <Box sx={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#ffffff', p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Product Management
        </Typography>

        {/* Add Product Button */}
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
          Add Product
        </Button>

        {/* Product Table */}
        <TableContainer component={Paper} sx={{ backgroundColor: '#1a1a1a', mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Product Name (EN)</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>SubCategory ID (EN)</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Price (EN)</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Stock Quantity (EN)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsEn.length > 0 ? (
                productsEn.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: '#ffffff' }}>{product.productName}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{product.subCategoryID}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{product.price}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{product.stockQuantity}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: 'center', color: '#999' }}>
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper} sx={{ backgroundColor: '#1a1a1a', mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Product Name (MN)</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>SubCategory ID (MN)</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Price (MN)</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Stock Quantity (MN)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsMn.length > 0 ? (
                productsMn.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: '#ffffff' }}>{product.productName}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{product.subCategoryID}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{product.price}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{product.stockQuantity}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: 'center', color: '#999' }}>
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Product Modal */}
        <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
          <DialogTitle sx={{ color: '#ffffff', backgroundColor: '#1a1a1a' }}>
            Add New Product
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: '#1a1a1a' }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ color: '#00ffba', mb: 1 }}>English Product Details</Typography>
                <TextField
                  margin="dense"
                  label="Product Name (EN)"
                  fullWidth
                  variant="outlined"
                  value={productNameEn}
                  onChange={(e) => setProductNameEn(e.target.value)}
                  sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                />
                <TextField
                  margin="dense"
                  label="SubCategory ID (EN)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={subCategoryEnID || ''}
                  onChange={(e) => setSubCategoryEnID(Number(e.target.value))}
                  sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                />
                <TextField
                  margin="dense"
                  label="Price (EN)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={priceEn}
                  onChange={(e) => setPriceEn(e.target.value)}
                  sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                />
                <TextField
                  margin="dense"
                  label="Stock Quantity (EN)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={stockQuantity || ''}
                  onChange={(e) => setStockQuantity(Number(e.target.value))}
                  sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                />
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e, setImagesPathEn, 'product-en')}
                  style={{ color: '#ffffff', marginBottom: '16px' }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ color: '#00ffba', mb: 1 }}>Mongolian Product Details</Typography>
                <TextField
                  margin="dense"
                  label="Product Name (MN)"
                  fullWidth
                  variant="outlined"
                  value={productNameMn}
                  onChange={(e) => setProductNameMn(e.target.value)}
                  sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                />
                <TextField
                  margin="dense"
                  label="SubCategory ID (MN)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={subCategoryMnID || ''}
                  onChange={(e) => setSubCategoryMnID(Number(e.target.value))}
                  sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                />
                <TextField
                  margin="dense"
                  label="Price (MN)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={priceMn}
                  onChange={(e) => setPriceMn(e.target.value)}
                  sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                />
                <TextField
                  margin="dense"
                  label="Stock Quantity (MN)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={stockQuantityMn || ''}
                  onChange={(e) => setStockQuantityMn(Number(e.target.value))}
                  sx={{ mb: 2, input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                />
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e, setImagesPathMn, 'product-mn')}
                  style={{ color: '#ffffff', marginBottom: '16px' }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#1a1a1a' }}>
            <Button onClick={() => setAddModalOpen(false)} sx={{ color: '#ffffff' }}>
              Cancel
            </Button>
            <Button
              onClick={handleAddProduct}
              variant="contained"
              sx={{ backgroundColor: '#00ffba', color: '#0d0d0d' }}
            >
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
    </>
  );
};

export default Product;
