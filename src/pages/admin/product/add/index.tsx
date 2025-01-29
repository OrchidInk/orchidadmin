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
import api from './api'; // Centralized API utility
import Header from '@/@core/components/Navbar'; // Header component

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
  const [descriptionEn, setDescriptionEn] = useState<string>('');
  const [brandEn, setBrandEn] = useState<string>('');
  const [manufacturedCountryEn, setManufacturedCountryEn] = useState<string>('');
  const [colorEn, setColorEn] = useState<string>('');
  const [sizeEn, setSizeEn] = useState<string>('');
  const [penOutEn, setPenOutEn] = useState<string>('');
  const [featuresEn, setFeaturesEn] = useState<string>('');
  const [materialEn, setMaterialEn] = useState<string>('');
  const [stapleSizeEn, setStapleSizeEn] = useState<string>('');
  const [capacityEn, setCapacityEn] = useState<string>('');
  const [weightEn, setWeightEn] = useState<string>('')
  const [thicknessEn, setThinknessEn] = useState<string>('');
  const [packagingEn, setPackagingEn] = useState<string>('');
  const [productCodeEn, setProductCodeEn] = useState<string>('');
  const [costPriceEn, setCostPriceEn] = useState<string>('');
  const [retailPriceEn, setRetailPriceEn] = useState<string>('');
  const [warehouseStockEn, setWarehouseStockEn] = useState<number | null>(null);


  const [productNameMn, setProductNameMn] = useState('');
  const [subCategoryMnID, setSubCategoryMnID] = useState<number | null>(null);
  const [priceMn, setPriceMn] = useState('');
  const [imagesPathMn, setImagesPathMn] = useState<string>('');
  const [descriptionMn, setDescriptionMn] = useState<string>('');
  const [brandMn, setBrandMn] = useState<string>('');
  const [manufacturedCountryMn, setManufacturedCountryMn] = useState<string>('');
  const [colorMn, setColorMn] = useState<string>('');
  const [sizeMn, setSizeMn] = useState<string>('')
  const [penOutMn, setPenOutMn] = useState<string>('')
  const [featuresMn, setFeaturesMn] = useState<string>('');
  const [materialMn, setMaterialMn] = useState<string>('')
  const [stapleSizeMn, setStapleSizeMn] = useState<string>('');
  const [capacityMn, setCapacityMn] = useState<string>('');
  const [weightMn, setWeightMn] = useState<string>('');
  const [thicknessMn, setThinknessMn] = useState<string>('');
  const [packagingMn, setPackagingMn] = useState<string>('');
  const [productCodeMn, setProductCodeMn] = useState<string>('');
  const [costPriceMn, setCostPriceMn] = useState<string>('');
  const [retailPriceMn, setRetailPriceMn] = useState<string>('');
  const [warehouseStockMn, setWarehouseStockMn] = useState<number | null>(null);

  const [categoriesEn, setCategoriesEn] = useState<Category[]>([]);
  const [categoriesMn, setCategoriesMn] = useState<Category[]>([]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Fetch categories for both EN and MN
  const fetchCategories = async () => {
    try {
      const [responseEn, responseMn] = await Promise.all([
        api.get('/subCategory/listEn'),
        api.get('/subCategory/listMn'),
      ]);
      setCategoriesEn(
        responseEn.data.map((cat: { SubCategoryIDEn: number; SubCategoryNameEn: string }) => ({
          id: cat.SubCategoryIDEn,
          name: cat.SubCategoryNameEn,
        }))
      );
      setCategoriesMn(
        responseMn.data.map((cat: { SubCategoryIDMn: number; SubCategoryNameMn: string }) => ({
          id: cat.SubCategoryIDMn,
          name: cat.SubCategoryNameMn,
        }))
      );
    } catch {
      setSnackbarMessage('Failed to fetch categories. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle product addition
  const handleAddProduct = async () => {
    if (
      !productNameEn ||
      !subCategoryEnID ||
      !priceEn ||
      stockQuantity === null ||
      !imagesPathEn ||
      !descriptionEn ||
      !brandEn ||
      !manufacturedCountryEn ||
      !colorEn ||
      !sizeEn ||
      !penOutEn ||
      !featuresEn ||
      !materialEn ||
      !stapleSizeEn ||
      !capacityEn ||
      !weightEn || 
      !thicknessEn ||
      !packagingEn ||
      !productCodeEn ||
      !costPriceEn ||
      !retailPriceEn ||
      !warehouseStockEn ||
      !productNameMn ||
      !subCategoryMnID ||
      !priceMn ||
      !imagesPathMn ||
      !descriptionMn ||
      !brandMn ||
      !manufacturedCountryMn ||
      !colorMn ||
      !sizeMn ||
      !penOutMn ||
      !featuresMn ||
      !materialMn ||     
      !stapleSizeMn ||
      !capacityMn ||
      !weightMn ||
      !thicknessMn ||
      !packagingMn ||
      !productCodeMn ||
      !costPriceMn ||
      !retailPriceMn ||
      !warehouseStockMn
    ) {
      setSnackbarMessage('All required fields must be filled.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const productDataEn = {
      ProductNameEn: productNameEn,
      SubCategoryEnID: subCategoryEnID,
      PriceEn: parseFloat(priceEn).toFixed(2),
      StockQuantity: stockQuantity,
      ImagesPathEn: imagesPathEn,
      DescriptionEn: descriptionEn,
      BrandEn: brandEn,
      ManufacturedCountryEn: manufacturedCountryEn, 
      ColorEn: colorEn,
      SizeEn: sizeEn,
      PenOutEn: penOutEn,
      FeaturesEn: featuresEn,
      StapleSizeEn: stapleSizeEn,
      CapacityEn: capacityEn,
      WeightEn: weightEn,
      ThicknessEn: thicknessEn,
      PackagingEn: packagingEn,
      ProductCodeEn: productCodeEn,
      CostPriceEn: parseFloat(costPriceEn).toFixed(2),
      RetailPriceEn: parseFloat(retailPriceEn).toFixed(2),
      WarehouseStockEn: warehouseStockEn
    };

    const productDataMn = {
      ProductNameMn: productNameMn,
      SubCategoryMnID: subCategoryMnID,
      PriceMn: parseFloat(priceMn).toFixed(2),
      StockQuantity: stockQuantity,
      ImagesPathMn: imagesPathMn,
      DescriptionMn: descriptionMn,
      BrandMn: brandMn,
      ManufacturedCountryMn: manufacturedCountryMn,
      ColorMn: colorMn,
      SizeMn: sizeMn,
      PenOutMn: penOutMn,
      FeaturesMn: featuresMn,
      StapleSizeMn: stapleSizeMn,
      CapacityMn: capacityMn,
      WeightMn: weightMn,
      ThicknessMn: thicknessMn,
      PackagingMn: packagingMn,
      ProductCodeMn: productCodeMn,
      CostPriceMn: parseFloat(costPriceMn).toFixed(2),
      RetailPriceMn: parseFloat(retailPriceMn).toFixed(2),
      WarehouseStockMn: warehouseStockMn
    };

    try {
      await Promise.all([
        api.post('/product/createEn', productDataEn),
        api.post('/product/createMn', productDataMn),
      ]);
      setSnackbarMessage('Products added successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setAddModalOpen(false);
      resetForm();
    } catch {
      setSnackbarMessage('Failed to add products. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Reset form
  const resetForm = () => {
    setProductNameEn('');
    setSubCategoryEnID(null);
    setPriceEn('');
    setStockQuantity(null);
    setImagesPathEn('');
    setProductNameMn('');
    setSubCategoryMnID(null);
    setPriceMn('');
    setImagesPathMn('');
  };

  // Handle image upload
  const handleImageUploadEn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesPathEn(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadMn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesPathMn(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Header />
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
              {/* English Product Form */}
              <Grid item xs={6}>
                <Typography variant="h6">English Product</Typography>
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
                <input type="file" onChange={handleImageUploadEn} style={{ marginTop: 16 }} />
                <TextField fullWidth label="DescriptionEn" value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} />
                <TextField fullWidth label="BrandEn" value={brandEn} onChange={(e)=>setBrandEn(e.target.value)}/>
                <TextField fullWidth label="ManufacturedCountryEn" value={manufacturedCountryEn} onChange={(e)=> setManufacturedCountryEn(e.target.value)}/>
                <TextField fullWidth label="ColorEn" value={colorEn} onChange={(e)=>setColorEn(e.target.value)}/>
                <TextField fullWidth label="SizeEn" value={sizeEn} onChange={(e)=>setSizeEn(e.target.value)} />
                <TextField fullWidth label="PenoutEn" value={penOutEn} onChange={(e)=>setPenOutEn(e.target.value)}/>
                <TextField fullWidth label="FeaturesEn" value={featuresEn} onChange={(e)=>setFeaturesEn(e.target.value)}/>
                <TextField fullWidth label="MaterialEn" value={materialEn} onChange={(e)=>setMaterialEn(e.target.value)}/>
                <TextField fullWidth label="StapleSizeEn" value={stapleSizeEn} onChange={(e)=>setStapleSizeEn(e.target.value)}/>
                <TextField fullWidth label="CapacityEn" value={capacityEn} onChange={(e)=>setCapacityEn(e.target.value)} />
                <TextField fullWidth label="WeigthEn" value={weightEn} onChange={(e)=>setWeightEn(e.target.value)}/>
                <TextField fullWidth label="ThicknessEn" value={thicknessEn} onChange={(e)=>setThinknessEn(e.target.value)}/>
                <TextField fullWidth label="PackagingEn" value={packagingEn} onChange={(e)=>setPackagingEn(e.target.value)} />
                <TextField fullWidth label="ProductCodeEn" value={productCodeEn} onChange={(e)=>setProductCodeEn(e.target.value)} />
                <TextField fullWidth label="CostPriceEn" value={costPriceEn} onChange={(e)=>setCostPriceEn(e.target.value)} />
                <TextField fullWidth label="RetailPriceEn" value={retailPriceEn} onChange={(e)=>setRetailPriceEn(e.target.value)} />
                <TextField fullWidth label="WarehouesStockEn" type="number" value={warehouseStockEn || ''} onChange={(e) => setWarehouseStockEn(Number(e.target.value))} />
              </Grid>

              {/* Mongolian Product Form */}
              <Grid item xs={6}>
                <Typography variant="h6">Mongolian Product</Typography>
                <TextField fullWidth label="Product Name" value={productNameMn} onChange={(e) => setProductNameMn(e.target.value)} />
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>SubCategory</InputLabel>
                  <Select
                    value={subCategoryMnID || ''}
                    onChange={(e) => setSubCategoryMnID(Number(e.target.value))}
                  >
                    {categoriesMn.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField fullWidth label="Price" value={priceMn} onChange={(e) => setPriceMn(e.target.value)} />
                <TextField fullWidth label="Stock Quantity" type="number" value={stockQuantity || ''} onChange={(e) => setStockQuantity(Number(e.target.value))} />
                <input type="file" onChange={handleImageUploadMn} style={{ marginTop: 16 }} />
                <TextField fullWidth label="DescriptionMn" value={descriptionMn} onChange={(e) => setDescriptionMn(e.target.value)} />
                <TextField fullWidth label="BrandMn" value={brandMn} onChange={(e)=>setBrandMn(e.target.value)}/>
                <TextField fullWidth label="ManufacturedCountryMn" value={manufacturedCountryMn} onChange={(e)=> setManufacturedCountryMn(e.target.value)}/>
                <TextField fullWidth label="ColorMn" value={colorMn} onChange={(e)=>setColorMn(e.target.value)}/>
                <TextField fullWidth label="SizeMn" value={sizeMn} onChange={(e)=>setSizeMn(e.target.value)} />
                <TextField fullWidth label="PenoutMn" value={penOutMn} onChange={(e)=>setPenOutMn(e.target.value)}/>
                <TextField fullWidth label="FeaturesMn" value={featuresMn} onChange={(e)=>setFeaturesMn(e.target.value)}/>
                <TextField fullWidth label="MaterialMn" value={materialMn} onChange={(e)=>setMaterialMn(e.target.value)}/>
                <TextField fullWidth label="StapleSizeMn" value={stapleSizeMn} onChange={(e)=>setStapleSizeMn(e.target.value)}/>
                <TextField fullWidth label="CapacityMn" value={capacityMn} onChange={(e)=>setCapacityMn(e.target.value)} />
                <TextField fullWidth label="WeigthMn" value={weightMn} onChange={(e)=>setWeightMn(e.target.value)}/>
                <TextField fullWidth label="ThicknessMn" value={thicknessMn} onChange={(e)=>setThinknessMn(e.target.value)}/>
                <TextField fullWidth label="PackagingMn" value={packagingMn} onChange={(e)=>setPackagingMn(e.target.value)} />
                <TextField fullWidth label="ProductCodeMn" value={productCodeMn} onChange={(e)=>setProductCodeMn(e.target.value)} />
                <TextField fullWidth label="CostPriceMn" value={costPriceMn} onChange={(e)=>setCostPriceMn(e.target.value)} />
                <TextField fullWidth label="RetailPriceMn" value={retailPriceMn} onChange={(e)=>setRetailPriceMn(e.target.value)} />
                <TextField fullWidth label="WarehouesStockMn" type="number" value={warehouseStockMn || ''} onChange={(e) => setWarehouseStockMn(Number(e.target.value))} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProduct} variant="contained">
              Add Products
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
