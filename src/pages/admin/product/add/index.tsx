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
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import api from '../../../../@core/utils/api'; // Centralized API utility
import Header from '@/@core/components/Navbar'; // Header component

interface Category {
  id: number;
  name: string;
}


interface ProductEn {
  MaterialEn: unknown;
  ProductEnID: number;
  ProductNameEn: string;
  SCategoryIDEn: number;
  PriceEn: string;
  StockQuantity: number;
  ImagesPathEn: string;
  DescriptionEn: string;
  BrandEn: string;
  ManufacturedCountryEn: string;
  ColorEn: string;
  SizeEn: string;
  ProductCodeEn: string;
  RetailPriceEn: string;
  WarehouseStockEn: number;
  CreatedAt: { Time: string };
}

interface ProductMn {
  InstructionsMn: unknown;
  UsageMn: unknown;
  MaterialMn: unknown;
  ProductMnID: number;
  ProductNameMn: string;
  SCategoryIDMn: number;
  PriceMn: string;
  StockQuantity: number;
  ImagesPathMn: string;
  DescriptionMn: string;
  BrandMn: string;
  ManufacturedCountryMn: string;
  ColorMn: string;
  SizeMn: string;
  ProductCodeMn: string;
  RetailPriceMn: string;
  WarehouseStockMn: number;
  CreatedAt: { Time: string };
}

const Product = () => {
  const [productNameEn, setProductNameEn] = useState('');
  const [sCategoryEnId, setSCategoryEnId] = useState<number | null>(null);
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
  const [weightEn, setWeightEn] = useState<string>('');
  const [thicknessEn, setThinknessEn] = useState<string>('');
  const [packagingEn, setPackagingEn] = useState<string>('');
  const [productCodeEn, setProductCodeEn] = useState<string>('');
  const [costPriceEn, setCostPriceEn] = useState<string>('');
  const [retailPriceEn, setRetailPriceEn] = useState<string>('');
  const [warehouseStockEn, setWarehouseStockEn] = useState<number | null>(null);

  const [productNameMn, setProductNameMn] = useState('');
  const [sCategoryMnId, setSCategoryMnId] = useState<number | null>(null);
  const [priceMn, setPriceMn] = useState('');
  const [imagesPathMn, setImagesPathMn] = useState<string>('');
  const [descriptionMn, setDescriptionMn] = useState<string>('');
  const [brandMn, setBrandMn] = useState<string>('');
  const [manufacturedCountryMn, setManufacturedCountryMn] = useState<string>('');
  const [colorMn, setColorMn] = useState<string>('');
  const [sizeMn, setSizeMn] = useState<string>('');
  const [penOutMn, setPenOutMn] = useState<string>('');
  const [featuresMn, setFeaturesMn] = useState<string>('');
  const [materialMn, setMaterialMn] = useState<string>('');
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
  const [productsEn, setProductsEn] = useState<ProductEn[]>([]);
  const [productsMn, setProductsMn] = useState<ProductMn[]>([]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const [editingProductEn, setEditingProductEn] = useState<ProductEn | null>(null);
  const [editingProductMn, setEditingProductMn] = useState<ProductMn | null>(null);

  const [updateModalEnOpen, setUpdateModalEnOpen] = useState(false);
  const [updateModalMnOpen, setUpdateModalMnOpen] = useState(false);
  // Fetch categories for both EN and MN
  const fetchCategories = async () => {
    try {
      const [responseEn, responseMn] = await Promise.all([
        api.get('/sCategory/listEn'),
        api.get('/sCategory/listMn'),
      ]);
      setCategoriesEn(
        responseEn.data.map((cat: { SCategoryIdEn: number; SCategoryNameEn: string }) => ({
          id: cat.SCategoryIdEn,
          name: cat.SCategoryNameEn,
        }))
      );
      setCategoriesMn(
        responseMn.data.map((cat: { SCategoryIdMn: number; SCategoryNameMn: string }) => ({
          id: cat.SCategoryIdMn,
          name: cat.SCategoryNameMn,
        }))
      );
    } catch {
      setSnackbarMessage('Failed to fetch categories. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Fetch products for both EN and MN
  const fetchProducts = async () => {
    try {
      const [responseEn, responseMn] = await Promise.all([
        api.get<ProductEn[]>('/product/listEn'),
        api.get<ProductMn[]>('/product/listMn'),
      ]);
      setProductsEn(responseEn.data);
      setProductsMn(responseMn.data);
    } catch {
      setSnackbarMessage('Failed to fetch products. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };


  useEffect(() => {
    fetchCategories();
    fetchProducts(); // Fetch products as well
  }, []);

  // Handle product addition
  const handleAddProduct = async () => {
    // Validation omitted for brevity...

    const productDataEn = {
      ProductNameEn: productNameEn,
      SCategoryEnID: sCategoryEnId,
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
      WarehouseStockEn: warehouseStockEn,
    };

    const productDataMn = {
      ProductNameMn: productNameMn,
      SCategoryMnID: sCategoryMnId,
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
      WarehouseStockMn: warehouseStockMn,
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
    setSCategoryEnId(null);
    setPriceEn('');
    setStockQuantity(null);
    setImagesPathEn('');
    setProductNameMn('');
    setSCategoryMnId(null);
    setPriceMn('');
    setImagesPathMn('');
  };
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    lang: "en" | "mn"
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("No file selected.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Selected file is not an image.");
      return;
    }

    // Set maximum dimensions and quality (adjust these values as needed)
    const MAX_WIDTH = 800;  // For example, 800px max width
    const MAX_HEIGHT = 600; // 600px max height
    const QUALITY = 0.6;    // 60% quality

    // Create an image element to load the file.
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = objectUrl;
    img.onload = () => {
      let { width, height } = img;

      // Calculate new dimensions while maintaining aspect ratio.
      if (width > MAX_WIDTH) {
        height = Math.round((MAX_WIDTH / width) * height);
        width = MAX_WIDTH;
      }
      if (height > MAX_HEIGHT) {
        width = Math.round((MAX_HEIGHT / height) * width);
        height = MAX_HEIGHT;
      }

      // Create a canvas and draw the image into it.
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        alert("Canvas not supported.");
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      // Convert the canvas to a Blob.
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            alert("Image compression failed. Please try a different image.");
            return;
          }
          console.log("Compressed file size:", blob.size, "bytes");
          // (Optional) Check if blob size is acceptable.
          if (blob.size > 5 * 1024 * 1024) {
            alert("Compressed image is still too large. Please choose a smaller image.");
            return;
          }
          // Convert Blob to Data URL.
          const reader = new FileReader();
          reader.onloadend = () => {
            if (lang === "en") {
              setImagesPathEn(reader.result as string);
            } else {
              setImagesPathMn(reader.result as string);
            }
          };
          reader.readAsDataURL(blob);
        },
        file.type,
        QUALITY
      );
      URL.revokeObjectURL(objectUrl);
    };
    img.onerror = () => {
      alert("Failed to load image.");
      URL.revokeObjectURL(objectUrl);
    };
  };


  // // Handle image upload
  // const handleImageUploadEn = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagesPathEn(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleImageUploadMn = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagesPathMn(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };


  // Handle update modal open
  const handleUpdateClickEn = (product: ProductEn) => {
    setEditingProductEn(product);
    setUpdateModalEnOpen(true);
  };

  const handleUpdateClickMn = (product: ProductMn) => {
    setEditingProductMn(product);
    setUpdateModalMnOpen(true);
  };

  // Handle product update
  const handleUpdateProduct = async () => {
    try {
      if (editingProductEn) {
        await api.patch(`/product/updateEn/${editingProductEn.ProductEnID}`, editingProductEn);
      }
      if (editingProductMn) {
        await api.patch(`/product/updateMn/${editingProductMn.ProductMnID}`, editingProductMn);
      }

      setSnackbarMessage('Product updated successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setUpdateModalEnOpen(false);
      setUpdateModalMnOpen(false);
      fetchProducts();
    } catch {
      setSnackbarMessage('Failed to update product. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteClickEn = async (product: ProductEn) => {
    try {
      await api.delete(`/product/deleteEn/${product.ProductEnID}`);
      setSnackbarMessage('Product deleted successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchProducts(); // Refresh list after deletion
    } catch {
      setSnackbarMessage('Failed to delete product. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteClickMn = async (product: ProductMn) => {
    try {
      await api.delete(`/product/deleteMn/${product.ProductMnID}`);
      setSnackbarMessage('Product deleted successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchProducts(); // Refresh list after deletion
    } catch {
      setSnackbarMessage('Failed to delete product. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }

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

        {/* Display fetched products (Optional) */}
        {/* English Products List */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>English Products</Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: '#121212', color: '#fff' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#fff' }}>Image</TableCell>
                <TableCell sx={{ color: '#fff' }}>Product Name</TableCell>
                <TableCell sx={{ color: '#fff' }}>Brand</TableCell>
                <TableCell sx={{ color: '#fff' }}>Category ID</TableCell>
                <TableCell sx={{ color: '#fff' }}>Price (₮)</TableCell>
                <TableCell sx={{ color: '#fff' }}>Manufactured Country</TableCell>
                <TableCell sx={{ color: '#fff' }}>Stock</TableCell>
                <TableCell sx={{ color: '#fff' }}>Warehouse Stock</TableCell>
                <TableCell sx={{ color: '#fff' }}>Material</TableCell>
                <TableCell sx={{ color: '#fff' }}>Retail Price</TableCell>
                <TableCell sx={{ color: '#fff' }}>Color</TableCell>
                <TableCell sx={{ color: '#fff' }}>Created At</TableCell>
                <TableCell sx={{ color: '#fff' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(productsEn ?? []).map((product) => (
                <TableRow key={product.ProductEnID || Math.random()}>
                  <TableCell>
                    <Avatar
                      src={product.ImagesPathEn || "/placeholder.jpg"}
                      alt={product.ProductNameEn || "No Image"}
                      sx={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#fff' }}>{product.ProductNameEn || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{product.BrandEn || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{product.SCategoryIDEn || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>₮{product.PriceEn || '0.00'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{product.ManufacturedCountryEn || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{product.StockQuantity ?? 0}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{product.WarehouseStockEn ?? 0}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>
                    {typeof product.MaterialEn === 'string' ? product.MaterialEn : 'N/A'}
                  </TableCell>

                  <TableCell sx={{ color: '#fff' }}>₮{product.RetailPriceEn || '0.00'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{product.ColorEn || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>
                    {product.CreatedAt?.Time ? new Date(product.CreatedAt.Time).toLocaleString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: '#00ffba', color: '#0d0d0d', mr: 1, mb: 1 }}
                      onClick={() => handleUpdateClickEn(product)}
                    >
                      Update
                    </Button>
                    <Button
                      variant='contained'
                      sx={{ background: '#ff3333', color: '#fff', mr: 1, mt: 1 }}
                      onClick={() => handleDeleteClickEn(product)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>


        {/* Mongolian Products List */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Mongolian Products</Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: '#121212', color: '#fff' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#fff' }}>Image</TableCell>
                <TableCell sx={{ color: '#fff' }}>Product Name</TableCell>
                <TableCell sx={{ color: '#fff' }}>Brand</TableCell>
                <TableCell sx={{ color: '#fff' }}>Category ID</TableCell>
                <TableCell sx={{ color: '#fff' }}>Price (₮)</TableCell>
                <TableCell sx={{ color: '#fff' }}>Manufactured Country</TableCell>
                <TableCell sx={{ color: '#fff' }}>Stock</TableCell>
                <TableCell sx={{ color: '#fff' }}>Warehouse Stock</TableCell>
                <TableCell sx={{ color: '#fff' }}>Material</TableCell>
                <TableCell sx={{ color: '#fff' }}>Retail Price</TableCell>
                <TableCell sx={{ color: '#fff' }}>Color</TableCell>
                <TableCell sx={{ color: '#fff' }}>Created At</TableCell>
                <TableCell sx={{ color: '#fff' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(productsMn ?? []).map((product) => (
                <TableRow key={product.ProductMnID || Math.random()}>
                  <TableCell>
                    <Avatar
                      src={product.ImagesPathMn || "/placeholder.jpg"}
                      alt={product.ProductNameMn || "No Image"}
                      sx={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#fff' }}>{product.ProductNameMn || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{product.BrandMn || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{product.SCategoryIDMn || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>₮{product.PriceMn || '0.00'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{product.ManufacturedCountryMn || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{product.StockQuantity ?? 0}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{product.WarehouseStockMn ?? 0}</TableCell>

                  <TableCell sx={{ color: '#fff' }}>
                    {typeof product.MaterialMn === 'string' ? product.MaterialMn : 'N/A'}
                  </TableCell>
                  <TableCell sx={{ color: '#fff' }}>₮{product.RetailPriceMn || '0.00'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{product.ColorMn || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>
                    {product.CreatedAt?.Time ? new Date(product.CreatedAt.Time).toLocaleString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: '#00ffba', color: '#0d0d0d', mr: 1, mb: 1 }}
                      onClick={() => handleUpdateClickMn(product)}
                    >
                      Update
                    </Button>
                    <Button
                      variant='contained'
                      sx={{ background: '#ff3333', color: '#fff', mt: 1, mr: 1 }}
                      onClick={() => handleDeleteClickMn(product)}
                    >

                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>

        {/* Delete Modal */}


        {/* Add Product Modal */}
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
                    value={sCategoryEnId || ''}
                    onChange={(e) => setSCategoryEnId(Number(e.target.value))}
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "en")}
                  style={{ marginTop: 16 }}
                />

                <TextField fullWidth label="DescriptionEn" value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} />
                <TextField fullWidth label="BrandEn" value={brandEn} onChange={(e) => setBrandEn(e.target.value)} />
                <TextField fullWidth label="ManufacturedCountryEn" value={manufacturedCountryEn} onChange={(e) => setManufacturedCountryEn(e.target.value)} />
                <TextField fullWidth label="ColorEn" value={colorEn} onChange={(e) => setColorEn(e.target.value)} />
                <TextField fullWidth label="SizeEn" value={sizeEn} onChange={(e) => setSizeEn(e.target.value)} />
                <TextField fullWidth label="PenoutEn" value={penOutEn} onChange={(e) => setPenOutEn(e.target.value)} />
                <TextField fullWidth label="FeaturesEn" value={featuresEn} onChange={(e) => setFeaturesEn(e.target.value)} />
                <TextField fullWidth label="MaterialEn" value={materialEn} onChange={(e) => setMaterialEn(e.target.value)} />
                <TextField fullWidth label="StapleSizeEn" value={stapleSizeEn} onChange={(e) => setStapleSizeEn(e.target.value)} />
                <TextField fullWidth label="CapacityEn" value={capacityEn} onChange={(e) => setCapacityEn(e.target.value)} />
                <TextField fullWidth label="WeightEn" value={weightEn} onChange={(e) => setWeightEn(e.target.value)} />
                <TextField fullWidth label="ThicknessEn" value={thicknessEn} onChange={(e) => setThinknessEn(e.target.value)} />
                <TextField fullWidth label="PackagingEn" value={packagingEn} onChange={(e) => setPackagingEn(e.target.value)} />
                <TextField fullWidth label="ProductCodeEn" value={productCodeEn} onChange={(e) => setProductCodeEn(e.target.value)} />
                <TextField fullWidth label="CostPriceEn" value={costPriceEn} onChange={(e) => setCostPriceEn(e.target.value)} />
                <TextField fullWidth label="RetailPriceEn" value={retailPriceEn} onChange={(e) => setRetailPriceEn(e.target.value)} />
                <TextField fullWidth label="WarehouseStockEn" type="number" value={warehouseStockEn || ''} onChange={(e) => setWarehouseStockEn(Number(e.target.value))} />
              </Grid>

              {/* Mongolian Product Form */}
              <Grid item xs={6}>
                <Typography variant="h6">Mongolian Product</Typography>
                <TextField fullWidth label="Product Name" value={productNameMn} onChange={(e) => setProductNameMn(e.target.value)} />
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>SubCategory</InputLabel>
                  <Select
                    value={sCategoryMnId || ''}
                    onChange={(e) => setSCategoryMnId(Number(e.target.value))}
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "mn")}
                  style={{ marginTop: 16 }}
                />

                <TextField fullWidth label="DescriptionMn" value={descriptionMn} onChange={(e) => setDescriptionMn(e.target.value)} />
                <TextField fullWidth label="BrandMn" value={brandMn} onChange={(e) => setBrandMn(e.target.value)} />
                <TextField fullWidth label="ManufacturedCountryMn" value={manufacturedCountryMn} onChange={(e) => setManufacturedCountryMn(e.target.value)} />
                <TextField fullWidth label="ColorMn" value={colorMn} onChange={(e) => setColorMn(e.target.value)} />
                <TextField fullWidth label="SizeMn" value={sizeMn} onChange={(e) => setSizeMn(e.target.value)} />
                <TextField fullWidth label="PenoutMn" value={penOutMn} onChange={(e) => setPenOutMn(e.target.value)} />
                <TextField fullWidth label="FeaturesMn" value={featuresMn} onChange={(e) => setFeaturesMn(e.target.value)} />
                <TextField fullWidth label="MaterialMn" value={materialMn} onChange={(e) => setMaterialMn(e.target.value)} />
                <TextField fullWidth label="StapleSizeMn" value={stapleSizeMn} onChange={(e) => setStapleSizeMn(e.target.value)} />
                <TextField fullWidth label="CapacityMn" value={capacityMn} onChange={(e) => setCapacityMn(e.target.value)} />
                <TextField fullWidth label="WeightMn" value={weightMn} onChange={(e) => setWeightMn(e.target.value)} />
                <TextField fullWidth label="ThicknessMn" value={thicknessMn} onChange={(e) => setThinknessMn(e.target.value)} />
                <TextField fullWidth label="PackagingMn" value={packagingMn} onChange={(e) => setPackagingMn(e.target.value)} />
                <TextField fullWidth label="ProductCodeMn" value={productCodeMn} onChange={(e) => setProductCodeMn(e.target.value)} />
                <TextField fullWidth label="CostPriceMn" value={costPriceMn} onChange={(e) => setCostPriceMn(e.target.value)} />
                <TextField fullWidth label="RetailPriceMn" value={retailPriceMn} onChange={(e) => setRetailPriceMn(e.target.value)} />
                <TextField fullWidth label="WarehouseStockMn" type="number" value={warehouseStockMn || ''} onChange={(e) => setWarehouseStockMn(Number(e.target.value))} />
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


        {/* Update Modal En*/}
        <Dialog open={updateModalEnOpen} onClose={() => setUpdateModalEnOpen(false)}>
          <DialogTitle>Update English Product</DialogTitle>
          <DialogContent>
            {editingProductEn && (
              <>
                <Box display="flex" justifyContent="center">
                  <Avatar src={editingProductEn.ImagesPathEn} sx={{ width: 80, height: 80, mb: 2 }} />
                </Box>

                {/* Upload New Image */}
                <Button variant="contained" component="label" sx={{ mb: 2 }}>
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "en")}
                  />
                </Button>

                <TextField fullWidth label="Product Name" value={editingProductEn.ProductNameEn} onChange={(e) => setEditingProductEn({ ...editingProductEn, ProductNameEn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Brand" value={editingProductEn.BrandEn} onChange={(e) => setEditingProductEn({ ...editingProductEn, BrandEn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Price" value={editingProductEn.PriceEn} onChange={(e) => setEditingProductEn({ ...editingProductEn, PriceEn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Stock Quantity" type="number" value={editingProductEn.StockQuantity} onChange={(e) => setEditingProductEn({ ...editingProductEn, StockQuantity: Number(e.target.value) })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Retail Price" value={editingProductEn.RetailPriceEn} onChange={(e) => setEditingProductEn({ ...editingProductEn, RetailPriceEn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Warehouse Stock" type="number" value={editingProductEn.WarehouseStockEn} onChange={(e) => setEditingProductEn({ ...editingProductEn, WarehouseStockEn: Number(e.target.value) })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Material" value={editingProductEn.MaterialEn} onChange={(e) => setEditingProductEn({ ...editingProductEn, MaterialEn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Color" value={editingProductEn.ColorEn} onChange={(e) => setEditingProductEn({ ...editingProductEn, ColorEn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Size" value={editingProductEn.SizeEn} onChange={(e) => setEditingProductEn({ ...editingProductEn, SizeEn: e.target.value })} sx={{ mb: 2 }} />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUpdateModalEnOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateProduct} variant="contained">Update</Button>
          </DialogActions>
        </Dialog>

        {/* Update Modal Mn */}
        <Dialog open={updateModalMnOpen} onClose={() => setUpdateModalMnOpen(false)}>
          <DialogTitle>Update Mongolian Product</DialogTitle>
          <DialogContent>
            {editingProductMn && (
              <>
                {/* Product Image */}
                <Box display="flex" justifyContent="center">
                  <Avatar src={editingProductMn.ImagesPathMn} sx={{ width: 80, height: 80, mb: 2 }} />
                </Box>
                {/* Upload New Image */}
                <Button variant="contained" component="label" sx={{ mb: 2 }}>
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "mn")}
                  />
                </Button>
                <TextField fullWidth label="Product Name" value={editingProductMn.ProductNameMn} onChange={(e) => setEditingProductMn({ ...editingProductMn, ProductNameMn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Brand" value={editingProductMn.BrandMn} onChange={(e) => setEditingProductMn({ ...editingProductMn, BrandMn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Price" value={editingProductMn.PriceMn} onChange={(e) => setEditingProductMn({ ...editingProductMn, PriceMn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Stock Quantity" type="number" value={editingProductMn.StockQuantity} onChange={(e) => setEditingProductMn({ ...editingProductMn, StockQuantity: Number(e.target.value) })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Retail Price" value={editingProductMn.RetailPriceMn} onChange={(e) => setEditingProductMn({ ...editingProductMn, RetailPriceMn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Warehouse Stock" type="number" value={editingProductMn.WarehouseStockMn} onChange={(e) => setEditingProductMn({ ...editingProductMn, WarehouseStockMn: Number(e.target.value) })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Material" value={editingProductMn.MaterialMn} onChange={(e) => setEditingProductMn({ ...editingProductMn, MaterialMn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Color" value={editingProductMn.ColorMn} onChange={(e) => setEditingProductMn({ ...editingProductMn, ColorMn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Size" value={editingProductMn.SizeMn} onChange={(e) => setEditingProductMn({ ...editingProductMn, SizeMn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Usage" value={editingProductMn.UsageMn} onChange={(e) => setEditingProductMn({ ...editingProductMn, UsageMn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Instructions" value={editingProductMn.InstructionsMn} onChange={(e) => setEditingProductMn({ ...editingProductMn, InstructionsMn: e.target.value })} sx={{ mb: 2 }} />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUpdateModalMnOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateProduct} variant="contained">Update</Button>
          </DialogActions>
        </Dialog>


        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
          <MuiAlert severity={snackbarSeverity}>{snackbarMessage}</MuiAlert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Product;