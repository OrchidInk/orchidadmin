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
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { apiSuperAdminProduct } from '@/@core/utils/type/router';

interface Product {
  productName: string;
  subCategoryID: number;
  price: string;
  stockQuantity: number;
  imagesPath: string;
}

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

  const [productNameMn, setProductNameMn] = useState('');
  const [subCategoryMnID, setSubCategoryMnID] = useState<number | null>(null);
  const [priceMn, setPriceMn] = useState('');
  const [stockQuantityMn, setStockQuantityMn] = useState<number | null>(null);
  const [imagesPathMn, setImagesPathMn] = useState<string>('');

  const [categoriesEn, setCategoriesEn] = useState<Category[]>([]);
  const [categoriesMn, setCategoriesMn] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [productsEn, setProductsEn] = useState<Product[]>([]);
  const [productsMn, setProductsMn] = useState<Product[]>([]);

  // Fetch categories
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const [responseEn, responseMn] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/superadmin/subCategory/listEn`),
        axios.get(`http://localhost:8000/api/v1/superadmin/subCategory/listMn`),
      ]);

      // Map English categories
      const categoriesEnMapped = responseEn.data?.map((cat: any) => ({
        id: cat.SubCategoryIDEn, // Correct field for English category ID
        name: cat.SubCategoryNameEn, // Correct field for English category name
      })) || [];

      // Map Mongolian categories
      const categoriesMnMapped = responseMn.data?.map((cat: any) => ({
        id: cat.SubCategoryIDMn, // Correct field for Mongolian category ID
        name: cat.SubCategoryNameMn, // Correct field for Mongolian category name
      })) || [];

      setCategoriesEn(categoriesEnMapped);
      setCategoriesMn(categoriesMnMapped);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setSnackbarMessage('Failed to fetch categories. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoadingCategories(false);
    }
  };


  // Fetch products
  const fetchProducts = async () => {
    try {
      const responseEn = await axios.get(`${apiSuperAdminProduct}/listEn`);
      const productsEnMapped = responseEn.data?.map((product: any) => ({
        productName: product.ProductNameEn,
        subCategoryID: product.SubCategoryIDEn,
        price: product.PriceEn,
        stockQuantity: product.StockQuantity,
        imagesPath: product.ImagesPathEn,
      })) || [];
      setProductsEn(productsEnMapped);

      const responseMn = await axios.get(`${apiSuperAdminProduct}/listMn`);
      const productsMnMapped = responseMn.data?.map((product: any) => ({
        productName: product.ProductNameMn,
        subCategoryID: product.SubCategoryIDMn,
        price: product.PriceMn,
        stockQuantity: product.StockQuantity,
        imagesPath: product.ImagesPathMn,
      })) || [];
      setProductsMn(productsMnMapped);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setSnackbarMessage('Failed to fetch products. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (
      !productNameEn ||
      subCategoryEnID === null ||
      !priceEn ||
      stockQuantity === null ||
      !imagesPathEn ||
      !productNameMn ||
      subCategoryMnID === null ||
      !priceMn ||
      stockQuantityMn === null ||
      !imagesPathMn
    ) {
      setSnackbarMessage('All fields are required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      // English Product Form Data
      const formDataEn = {
        productNameEN: productNameEn, // Match Go model
        subCategoryEnId: subCategoryEnID, // Match Go model
        priceEn: priceEn.toString(), // Ensure string type
        stockQuantity: stockQuantity,
        imagesPathEn: imagesPathEn,
      };

      // Mongolian Product Form Data
      const formDataMn = {
        productNameMN: productNameMn, // Match Go model
        subCategoryMnId: subCategoryMnID, // Match Go model
        priceMn: priceMn.toString(), // Ensure string type
        stockQuantity: stockQuantityMn,
        imagesPathMn: imagesPathMn,
      };

      // API calls
      await axios.post(`${apiSuperAdminProduct}/createEn`, formDataEn);
      await axios.post(`${apiSuperAdminProduct}/createMn`, formDataMn);

      setSnackbarMessage('Product added successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setAddModalOpen(false);
      clearInputs();
      fetchProducts();
    } catch (error) {
      console.error('Failed to add product:', error);
      setSnackbarMessage('Failed to add product. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setImagePath: React.Dispatch<React.SetStateAction<string>>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePath(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearInputs = () => {
    setProductNameEn('');
    setSubCategoryEnID(null);
    setPriceEn('');
    setStockQuantity(null);
    setImagesPathEn('');
    setProductNameMn('');
    setSubCategoryMnID(null);
    setPriceMn('');
    setStockQuantityMn(null);
    setImagesPathMn('');
  };

  const getCategoryName = (id: number, categories: Category[]) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : 'Unknown';
  };

  return (
    <>
      <Header />
      <Box sx={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#ffffff', p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Product Management
        </Typography>
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

        {/* English Table */}
        <TableContainer component={Paper} sx={{ backgroundColor: '#1a1a1a', mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Product Name (EN)</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>SubCategory (EN)</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Price (EN)</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Stock Quantity (EN)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsEn.map((product, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: '#ffffff' }}>{product.productName}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{getCategoryName(product.subCategoryID, categoriesEn)}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{product.price}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{product.stockQuantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Mongolian Table */}
        <TableContainer component={Paper} sx={{ backgroundColor: '#1a1a1a', mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Product Name (MN)</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>SubCategory (MN)</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Price (MN)</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Stock Quantity (MN)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsMn.map((product, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: '#ffffff' }}>{product.productName}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{getCategoryName(product.subCategoryID, categoriesMn)}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{product.price}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{product.stockQuantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal */}
        <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)} disableScrollLock>
          <DialogTitle sx={{ color: '#ffffff', backgroundColor: '#1a1a1a' }}>Add New Product</DialogTitle>
          <DialogContent sx={{ backgroundColor: '#1a1a1a' }}>
            {loadingCategories ? (
              <CircularProgress color="inherit" />
            ) : (
              <Grid container spacing={2}>
                {/* English Product */}
                <Grid item xs={6}>
                  <Typography variant="h6" sx={{ color: '#00ffba', mb: 2 }}>
                    English Product
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    label="Product Name (EN)"
                    value={productNameEn}
                    onChange={(e) => setProductNameEn(e.target.value)}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                  />
                  <FormControl fullWidth margin="dense">
                    <InputLabel sx={{ color: '#ffffff' }}>SubCategory (EN)</InputLabel>
                    <Select
                      value={subCategoryEnID || ''}
                      onChange={(e) => setSubCategoryEnID(Number(e.target.value))}
                      sx={{ color: '#ffffff' }}
                    >
                      {categoriesEn.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    label="Price (EN)"
                    type="number"
                    value={priceEn}
                    onChange={(e) => setPriceEn(e.target.value)}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    label="Stock Quantity (EN)"
                    type="number"
                    value={stockQuantity || ''}
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                  />
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, setImagesPathEn)}
                    style={{ color: '#ffffff', marginTop: '16px' }}
                  />
                </Grid>

                {/* Mongolian Product */}
                <Grid item xs={6}>
                  <Typography variant="h6" sx={{ color: '#00ffba', mb: 2 }}>
                    Mongolian Product
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    label="Product Name (MN)"
                    value={productNameMn}
                    onChange={(e) => setProductNameMn(e.target.value)}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                  />
                  <FormControl fullWidth margin="dense">
                    <InputLabel sx={{ color: '#ffffff' }}>SubCategory (MN)</InputLabel>
                    <Select
                      value={subCategoryMnID || ''}
                      onChange={(e) => setSubCategoryMnID(Number(e.target.value))}
                      sx={{ color: '#ffffff' }}
                    >
                      {categoriesMn.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    label="Price (MN)"
                    type="number"
                    value={priceMn}
                    onChange={(e) => setPriceMn(e.target.value)}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    label="Stock Quantity (MN)"
                    type="number"
                    value={stockQuantityMn || ''}
                    onChange={(e) => setStockQuantityMn(Number(e.target.value))}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                  />
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, setImagesPathMn)}
                    style={{ color: '#ffffff', marginTop: '16px' }}
                  />
                </Grid>
              </Grid>
            )}
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

        {/* Snackbar for Messages */}
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
