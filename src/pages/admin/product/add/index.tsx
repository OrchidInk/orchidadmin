/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
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
  IconButton,
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import api from '../../../../@core/utils/api'
import Header from '@/@core/components/Navbar'

// --- Types ---
interface Category {
  id: number
  name: string
}

interface ProductEn {
  MaterialEn: any
  ProductEnID: number
  ProductNameEn: string | null
  SCategoryIDEn: number | null
  PriceEn: string | null
  StockQuantity: number | null
  ImagesPathEn: string | null
  DescriptionEn: string | null
  BrandEn: string | null
  ManufacturedCountryEn: string | null
  // For add/update, we send the selected colors/sizes as comma‑separated strings
  ColorEn: string | null
  SizeEn: string | null
  ProductCodeEn: string | null
  RetailPriceEn: string | null
  WarehouseStockEn: number | null
  CreatedAt: { Time: string } | null
  // Extra fields returned by your enhanced query:
  ColorIds: string | null
  ColorNames: string | null
  SizeIds: string | null
  SizeNames: string | null
}

interface ProductMn {
  InstructionsMn: any
  UsageMn: any
  MaterialMn: any
  ProductMnID: number
  ProductNameMn: string | null
  SCategoryIDMn: number | null
  PriceMn: string | null
  StockQuantity: number | null
  ImagesPathMn: string | null
  DescriptionMn: string | null
  BrandMn: string | null
  ManufacturedCountryMn: string | null
  ColorMn: string | null
  SizeMn: string | null
  ProductCodeMn: string | null
  RetailPriceMn: string | null
  WarehouseStockMn: number | null
  CreatedAt: { Time: string } | null
}

interface ColorItem {
  id: number
  colorName: string
}

interface Size2Item {
  id: number
  sizeName: string
}

// --- Helper to parse Postgres array strings ---
const parseArrayString = (str: string): string[] => {
  if (!str || str === '{}') return []
  return str.replace(/^{|}$/g, '').split(',').map(item => item.trim())
}

// --- Helper to display fallback text if value is null/empty ---
const displayValue = (value: string | number | null): string => {
  if (value === null || value === undefined || value === '') {
    return 'Одоогоор бүтээгдэхүүн алга байна'
  }
  return value.toString()
}

const Product = () => {
  // ===== (1) English Product Form States =====
  const [productNameEn, setProductNameEn] = useState('')
  const [sCategoryEnId, setSCategoryEnId] = useState<number | null>(null)
  const [priceEn, setPriceEn] = useState('')
  const [stockQuantity, setStockQuantity] = useState<number | null>(null)
  const [imagesPathEn, setImagesPathEn] = useState<string>('')
  const [descriptionEn, setDescriptionEn] = useState('')
  const [brandEn, setBrandEn] = useState('')
  const [manufacturedCountryEn, setManufacturedCountryEn] = useState('')
  // Multi‑select arrays for colors and sizes:
  const [selectedColorsEn, setSelectedColorsEn] = useState<string[]>([])
  const [selectedSizesEn, setSelectedSizesEn] = useState<string[]>([])
  const [penOutEn, setPenOutEn] = useState('')
  const [featuresEn, setFeaturesEn] = useState('')
  const [materialEn, setMaterialEn] = useState('')
  const [stapleSizeEn, setStapleSizeEn] = useState('')
  const [capacityEn, setCapacityEn] = useState('')
  const [weightEn, setWeightEn] = useState('')
  const [thicknessEn, setThinknessEn] = useState('')
  const [packagingEn, setPackagingEn] = useState('')
  const [productCodeEn, setProductCodeEn] = useState('')
  const [costPriceEn, setCostPriceEn] = useState('')
  const [retailPriceEn, setRetailPriceEn] = useState('')
  const [warehouseStockEn, setWarehouseStockEn] = useState<number | null>(null)

  // ===== (2) Mongolian Product Form States =====
  const [productNameMn, setProductNameMn] = useState('')
  const [sCategoryMnId, setSCategoryMnId] = useState<number | null>(null)
  const [priceMn, setPriceMn] = useState('')
  const [imagesPathMn, setImagesPathMn] = useState<string>('')
  const [descriptionMn, setDescriptionMn] = useState('')
  const [brandMn, setBrandMn] = useState('')
  const [manufacturedCountryMn, setManufacturedCountryMn] = useState('')
  // Multi‑select arrays for colors and sizes:
  const [selectedColorsMn, setSelectedColorsMn] = useState<string[]>([])
  const [selectedSizesMn, setSelectedSizesMn] = useState<string[]>([])
  const [penOutMn, setPenOutMn] = useState('')
  const [featuresMn, setFeaturesMn] = useState('')
  const [materialMn, setMaterialMn] = useState('')
  const [stapleSizeMn, setStapleSizeMn] = useState('')
  const [capacityMn, setCapacityMn] = useState('')
  const [weightMn, setWeightMn] = useState('')
  const [thicknessMn, setThinknessMn] = useState('')
  const [packagingMn, setPackagingMn] = useState('')
  const [productCodeMn, setProductCodeMn] = useState('')
  const [costPriceMn, setCostPriceMn] = useState('')
  const [retailPriceMn, setRetailPriceMn] = useState('')
  const [warehouseStockMn, setWarehouseStockMn] = useState<number | null>(null)

  // ===== (3) Lists & Modal States =====
  const [categoriesEn, setCategoriesEn] = useState<Category[]>([])
  const [productsEn, setProductsEn] = useState<ProductEn[]>([])
  const [productsMn, setProductsMn] = useState<ProductMn[]>([])

  // Product modals (for add and update)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [addModalMnOpen, setAddModalMnOpen] = useState(false)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [updateModalMnOpen, setUpdateModalMnOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ProductEn | null>(null)
  const [editingProductMn, setEditingProductMn] = useState<ProductMn | null>(null)

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')

  // ===== (4) Management modals for Colors and Sizes =====
  const [colorModalOpen, setColorModalOpen] = useState(false)
  const [currentLangForColor, setCurrentLangForColor] = useState<'en' | 'mn'>('en')
  const [tempColor, setTempColor] = useState('')
  const [editingColorId, setEditingColorId] = useState<number | null>(null)
  const [colorsEn, setColorsEn] = useState<ColorItem[]>([])
  const [colorsMn, setColorsMn] = useState<ColorItem[]>([])

  const [size2ModalOpen, setSize2ModalOpen] = useState(false)
  const [currentLangForSize2, setCurrentLangForSize2] = useState<'en' | 'mn'>('en')
  const [tempSize2, setTempSize2] = useState('')
  const [editingSize2Id, setEditingSize2Id] = useState<number | null>(null)
  const [size2En, setSize2En] = useState<Size2Item[]>([])
  const [size2Mn, setSize2Mn] = useState<Size2Item[]>([])

  // ===== (5) Detail modals for aggregated Colors & Sizes =====
  const [openColorDetailModal, setOpenColorDetailModal] = useState(false)
  const [colorDetails, setColorDetails] = useState<string[]>([])
  const [openSizeDetailModal, setOpenSizeDetailModal] = useState(false)
  const [sizeDetails, setSizeDetails] = useState<string[]>([])

  // ===== Fetch Functions =====
  const fetchCategories = async () => {
    try {
      const response = await api.get('/sCategory/listEn')
      setCategoriesEn(
        response.data.map((cat: any) => ({
          id: cat.SCategoryIdEn,
          name: cat.SCategoryNameEn,
        }))
      )
    } catch (err) {
      setSnackbarMessage('Failed to fetch categories.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  const fetchProductsEn = async () => {
    try {
      const response = await api.get<ProductEn[]>('/product/listEn')
      setProductsEn(response.data || [])
    } catch (err) {
      setSnackbarMessage('Failed to fetch English products.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  const fetchProductsMn = async () => {
    try {
      const response = await api.get<ProductMn[]>('/product/listMn')
      setProductsMn(response.data || [])
    } catch (err) {
      setSnackbarMessage('Failed to fetch Mongolian products.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  // Fetch available colors and sizes for use in the multi-selects
  const fetchColors = async () => {
    try {
      const response = await api.get('/color/list')
      // Assuming response.data is an array of objects with id and colorName.
      setColorsEn(response.data || [])
      setColorsMn(response.data || [])
    } catch (err) {
      console.error('Error fetching colors:', err)
    }
  }

  const fetchSizes = async () => {
    try {
      const response = await api.get('/size/list')
      // Assuming response.data is an array of objects with id and sizeName.
      setSize2En(response.data || [])
      setSize2Mn(response.data || [])
    } catch (err) {
      console.error('Error fetching sizes:', err)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchProductsEn()
    fetchProductsMn()
    fetchColors()
    fetchSizes()
  }, [])

  // ===== Detail Modal Handlers =====
  const handleShowColorDetails = (product: ProductEn) => {
    const colors = parseArrayString(product.ColorNames || '')
    setColorDetails(colors.length ? colors : ['Одоогоор бүтээгдэхүүн алга байна'])
    setOpenColorDetailModal(true)
  }

  const handleShowSizeDetails = (product: ProductEn) => {
    const sizes = parseArrayString(product.SizeNames || '')
    setSizeDetails(sizes.length ? sizes : ['Одоогоор бүтээгдэхүүн алга байна'])
    setOpenSizeDetailModal(true)
  }

  // ===== Image Upload Handler =====
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, lang: 'en' | 'mn') => {
    const file = event.target.files?.[0]
    if (!file) {
      alert('No file selected.')
      return
    }
    if (!file.type.startsWith('image/')) {
      alert('Selected file is not an image.')
      return
    }
    const MAX_WIDTH = 800
    const MAX_HEIGHT = 600
    const QUALITY = 0.6
    const objectUrl = URL.createObjectURL(file)
    const img = new Image()
    img.src = objectUrl
    img.onload = () => {
      let { width, height } = img
      if (width > MAX_WIDTH) {
        height = Math.round((MAX_WIDTH / width) * height)
        width = MAX_WIDTH
      }
      if (height > MAX_HEIGHT) {
        width = Math.round((MAX_HEIGHT / height) * width)
        height = MAX_HEIGHT
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        alert('Canvas not supported.')
        return
      }
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        blob => {
          if (!blob) {
            alert('Image compression failed. Please try another image.')
            return
          }
          if (blob.size > 5 * 1024 * 1024) {
            alert('Compressed image is too large. Please choose a smaller image.')
            return
          }
          const reader = new FileReader()
          reader.onloadend = () => {
            if (lang === 'en') {
              setImagesPathEn(reader.result as string)
            } else {
              setImagesPathMn(reader.result as string)
            }
          }
          reader.readAsDataURL(blob)
        },
        file.type,
        QUALITY
      )
      URL.revokeObjectURL(objectUrl)
    }
    img.onerror = () => {
      alert('Failed to load image.')
      URL.revokeObjectURL(objectUrl)
    }
  }

  // ===== Add Product Handlers =====
  const handleAddProductEn = async () => {
    const productDataEn = {
      ProductNameEn: productNameEn,
      SCategoryEnID: sCategoryEnId,
      PriceEn: parseFloat(priceEn || '0').toFixed(2),
      StockQuantity: stockQuantity,
      ImagesPathEn: imagesPathEn,
      DescriptionEn: descriptionEn,
      BrandEn: brandEn,
      ManufacturedCountryEn: manufacturedCountryEn,
      // Merge multi-select arrays into comma-separated strings:
      ColorEn: selectedColorsEn.join(','),
      SizeEn: selectedSizesEn.join(','),
      PenOutEn: penOutEn,
      FeaturesEn: featuresEn,
      MaterialEn: materialEn,
      StapleSizeEn: stapleSizeEn,
      CapacityEn: capacityEn,
      WeightEn: weightEn,
      ThicknessEn: thicknessEn,
      PackagingEn: packagingEn,
      ProductCodeEn: productCodeEn,
      CostPriceEn: parseFloat(costPriceEn || '0').toFixed(2),
      RetailPriceEn: parseFloat(retailPriceEn || '0').toFixed(2),
      WarehouseStockEn: warehouseStockEn,
    }
    try {
      await api.post('/product/createEn', productDataEn)
      setSnackbarMessage('English product added successfully.')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      setAddModalOpen(false)
      resetForm()
      fetchProductsEn()
    } catch (err) {
      console.error(err)
      setSnackbarMessage('Failed to add English product.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  const handleAddProductMn = async () => {
    const productDataMn = {
      ProductNameMn: productNameMn,
      SCategoryMnID: sCategoryMnId,
      PriceMn: parseFloat(priceMn || '0').toFixed(2),
      StockQuantity: stockQuantity,
      ImagesPathMn: imagesPathMn,
      DescriptionMn: descriptionMn,
      BrandMn: brandMn,
      ManufacturedCountryMn: manufacturedCountryMn,
      ColorMn: selectedColorsMn.join(','),
      SizeMn: selectedSizesMn.join(','),
      PenOutMn: penOutMn,
      FeaturesMn: featuresMn,
      MaterialMn: materialMn,
      StapleSizeMn: stapleSizeMn,
      CapacityMn: capacityMn,
      WeightMn: weightMn,
      ThicknessMn: thicknessMn,
      PackagingMn: packagingMn,
      ProductCodeMn: productCodeMn,
      CostPriceMn: parseFloat(costPriceMn || '0').toFixed(2),
      RetailPriceMn: parseFloat(retailPriceMn || '0').toFixed(2),
      WarehouseStockMn: warehouseStockMn,
    }
    try {
      await api.post('/product/createMn', productDataMn)
      setSnackbarMessage('Mongolian product added successfully.')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      setAddModalMnOpen(false)
      resetForm()
      fetchProductsMn()
    } catch (err) {
      console.error(err)
      setSnackbarMessage('Failed to add Mongolian product.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  // ===== Update Product Handlers =====
  const handleUpdateProductEn = async () => {
    if (!editingProduct) return
    try {
      await api.patch(`/product/updateEn/${editingProduct.ProductEnID}`, editingProduct)
      setSnackbarMessage('English product updated successfully.')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      setUpdateModalOpen(false)
      fetchProductsEn()
    } catch (err) {
      console.error(err)
      setSnackbarMessage('Failed to update English product.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  const handleUpdateProductMn = async () => {
    if (!editingProductMn) return
    try {
      await api.patch(`/product/updateMn/${editingProductMn.ProductMnID}`, editingProductMn)
      setSnackbarMessage('Mongolian product updated successfully.')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      setUpdateModalMnOpen(false)
      fetchProductsMn()
    } catch (err) {
      console.error(err)
      setSnackbarMessage('Failed to update Mongolian product.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  // ===== Delete Product Handlers =====
  const handleDeleteProductEn = async (product: ProductEn) => {
    try {
      await api.delete(`/product/deleteEn/${product.ProductEnID}`)
      setSnackbarMessage('English product deleted successfully.')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      fetchProductsEn()
    } catch (err) {
      console.error(err)
      setSnackbarMessage('Failed to delete English product.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  const handleDeleteProductMn = async (product: ProductMn) => {
    try {
      await api.delete(`/product/deleteMn/${product.ProductMnID}`)
      setSnackbarMessage('Mongolian product deleted successfully.')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      fetchProductsMn()
    } catch (err) {
      console.error(err)
      setSnackbarMessage('Failed to delete Mongolian product.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  // ===== Reset Form Handler =====
  const resetForm = () => {
    // Reset English product form
    setProductNameEn('')
    setSCategoryEnId(null)
    setPriceEn('')
    setStockQuantity(null)
    setImagesPathEn('')
    setDescriptionEn('')
    setBrandEn('')
    setManufacturedCountryEn('')
    setSelectedColorsEn([])
    setSelectedSizesEn([])
    setPenOutEn('')
    setFeaturesEn('')
    setMaterialEn('')
    setStapleSizeEn('')
    setCapacityEn('')
    setWeightEn('')
    setThinknessEn('')
    setPackagingEn('')
    setProductCodeEn('')
    setCostPriceEn('')
    setRetailPriceEn('')
    setWarehouseStockEn(null)
    // Reset Mongolian product form
    setProductNameMn('')
    setSCategoryMnId(null)
    setPriceMn('')
    setImagesPathMn('')
    setDescriptionMn('')
    setBrandMn('')
    setManufacturedCountryMn('')
    setSelectedColorsMn([])
    setSelectedSizesMn([])
    setPenOutMn('')
    setFeaturesMn('')
    setMaterialMn('')
    setStapleSizeMn('')
    setCapacityMn('')
    setWeightMn('')
    setThinknessMn('')
    setPackagingMn('')
    setProductCodeMn('')
    setCostPriceMn('')
    setRetailPriceMn('')
    setWarehouseStockMn(null)
  }

  // ===== Color Management Modal Handlers =====
  const openColorModalFn = (lang: 'en' | 'mn') => {
    setCurrentLangForColor(lang)
    setColorModalOpen(true)
    setTempColor('')
    setEditingColorId(null)
  }

  const handleAddOrEditColor = async () => {
    try {
      if (editingColorId !== null) {
        await api.patch(`/color/update/${editingColorId}`, { ColorId: editingColorId, Color: tempColor })
        if (currentLangForColor === 'en') {
          setColorsEn(prev => prev.map(item => item.id === editingColorId ? { ...item, colorName: tempColor } : item))
        } else {
          setColorsMn(prev => prev.map(item => item.id === editingColorId ? { ...item, colorName: tempColor } : item))
        }
      } else {
        const response = await api.post('/color/create', { colorName: tempColor })
        const { ColorId, Color } = response.data
        if (currentLangForColor === 'en') {
          setColorsEn(prev => [...prev, { id: ColorId, colorName: Color }])
        } else {
          setColorsMn(prev => [...prev, { id: ColorId, colorName: Color }])
        }
      }
      setSnackbarMessage('Color saved successfully!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      setTempColor('')
      setEditingColorId(null)
    } catch (err) {
      console.error(err)
      setSnackbarMessage('Failed to save color.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  const handleEditColor = (item: ColorItem) => {
    setEditingColorId(item.id)
    setTempColor(item.colorName)
  }

  const handleDeleteColor = async (id: number) => {
    try {
      await api.delete(`/color/delete/${id}`)
      if (currentLangForColor === 'en') {
        setColorsEn(prev => prev.filter(item => item.id !== id))
      } else {
        setColorsMn(prev => prev.filter(item => item.id !== id))
      }
      setSnackbarMessage('Color deleted successfully!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
    } catch (err) {
      console.error(err)
      setSnackbarMessage('Failed to delete color.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  // ===== Size Management Modal Handlers =====
  const openSize2ModalFn = (lang: 'en' | 'mn') => {
    setCurrentLangForSize2(lang)
    setSize2ModalOpen(true)
    setTempSize2('')
    setEditingSize2Id(null)
  }

  const handleAddOrEditSize2 = async () => {
    try {
      if (editingSize2Id !== null) {
        await api.patch(`/size/update/${editingSize2Id}`, { SizeId: editingSize2Id, Size: tempSize2 })
        if (currentLangForSize2 === 'en') {
          setSize2En(prev => prev.map(item => item.id === editingSize2Id ? { ...item, sizeName: tempSize2 } : item))
        } else {
          setSize2Mn(prev => prev.map(item => item.id === editingSize2Id ? { ...item, sizeName: tempSize2 } : item))
        }
      } else {
        const response = await api.post('/size/create', { sizeName: tempSize2 })
        const { SizeId, Size } = response.data
        if (currentLangForSize2 === 'en') {
          setSize2En(prev => [...prev, { id: SizeId, sizeName: Size }])
        } else {
          setSize2Mn(prev => [...prev, { id: SizeId, sizeName: Size }])
        }
      }
      setSnackbarMessage('Size saved successfully!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      setTempSize2('')
      setEditingSize2Id(null)
    } catch (err) {
      console.error(err)
      setSnackbarMessage('Failed to save size.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  const handleEditSize2 = (item: Size2Item) => {
    setEditingSize2Id(item.id)
    setTempSize2(item.sizeName)
  }

  const handleDeleteSize2 = async (id: number) => {
    try {
      await api.delete(`/size/delete/${id}`)
      if (currentLangForSize2 === 'en') {
        setSize2En(prev => prev.filter(item => item.id !== id))
      } else {
        setSize2Mn(prev => prev.filter(item => item.id !== id))
      }
      setSnackbarMessage('Size deleted successfully!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
    } catch (err) {
      console.error(err)
      setSnackbarMessage('Failed to delete size.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  // ===== Render =====
  return (
    <>
      <Header />
      <Box sx={{ backgroundColor: '#0d0d0d', color: '#fff', p: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Product Management</Typography>
        {/* Top Buttons */}
        <Box sx={{ mb: 3 }}>
          <Button variant="contained" onClick={() => setAddModalOpen(true)} sx={{ backgroundColor: '#00ffba', mr: 2, color: 'black' }}>
            Add English Product
          </Button>
          <Button variant="contained" onClick={() => setAddModalMnOpen(true)} sx={{ backgroundColor: '#00ffba', mr: 2, color: 'black' }}>
            Add Mongolian Product
          </Button>
          {/* (Optionally you can include separate manage buttons for colors and sizes here) */}
        </Box>

        {/* ===== English Products Table ===== */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>English Products</Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: '#121212' }}>
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
                <TableCell sx={{ color: '#fff' }}>Colors</TableCell>
                <TableCell sx={{ color: '#fff' }}>Sizes</TableCell>
                <TableCell sx={{ color: '#fff' }}>Created At</TableCell>
                <TableCell sx={{ color: '#fff' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsEn.length > 0 ? (
                productsEn.map((product) => (
                  <TableRow key={product.ProductEnID}>
                    <TableCell>
                      <Avatar src={product.ImagesPathEn || '/placeholder.jpg'} alt={displayValue(product.ProductNameEn)} sx={{ width: 50, height: 50 }} />
                    </TableCell>
                    <TableCell sx={{ color: '#fff' }}>{displayValue(product.ProductNameEn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{displayValue(product.BrandEn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{displayValue(product.SCategoryIDEn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>₮{displayValue(product.PriceEn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{displayValue(product.ManufacturedCountryEn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{displayValue(product.StockQuantity)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{displayValue(product.WarehouseStockEn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{displayValue(product.MaterialEn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>₮{displayValue(product.RetailPriceEn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>
                      <Button variant="outlined" size="small" onClick={() => handleShowColorDetails(product)}>
                        View Colors
                      </Button>
                    </TableCell>
                    <TableCell sx={{ color: '#fff' }}>
                      <Button variant="outlined" size="small" onClick={() => handleShowSizeDetails(product)}>
                        View Sizes
                      </Button>
                    </TableCell>
                    <TableCell sx={{ color: '#fff' }}>
                      {product.CreatedAt?.Time ? new Date(product.CreatedAt.Time).toLocaleString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" sx={{ backgroundColor: '#00ffba', color: '#0d0d0d', mr: 1 }}
                        onClick={() => {
                          setEditingProduct(product)
                          setUpdateModalOpen(true)
                        }}
                      >
                        Update
                      </Button>
                      <Button variant="contained" sx={{ background: '#ff3333', color: '#fff' }}
                        onClick={() => handleDeleteProductEn(product)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={14} align="center">
                    Одоогоор бүтээгдэхүүн алга байна
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ===== Mongolian Products Table ===== */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Mongolian Products</Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: '#121212' }}>
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
                <TableCell sx={{ color: '#fff' }}>Colors</TableCell>
                <TableCell sx={{ color: '#fff' }}>Sizes</TableCell>
                <TableCell sx={{ color: '#fff' }}>Created At</TableCell>
                <TableCell sx={{ color: '#fff' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsMn.length > 0 ? (
                productsMn.map((product) => (
                  <TableRow key={product.ProductMnID}>
                    <TableCell>
                      <Avatar src={product.ImagesPathMn || '/placeholder.jpg'} alt={displayValue(product.ProductNameMn)} sx={{ width: 50, height: 50 }} />
                    </TableCell>
                    <TableCell sx={{ color: '#fff' }}>{displayValue(product.ProductNameMn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{displayValue(product.BrandMn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{displayValue(product.SCategoryIDMn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>₮{displayValue(product.PriceMn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{displayValue(product.ManufacturedCountryMn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{displayValue(product.StockQuantity)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{displayValue(product.WarehouseStockMn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{displayValue(product.MaterialMn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>₮{displayValue(product.RetailPriceMn)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>
                      <Button variant="outlined" size="small">
                        View Colors
                      </Button>
                    </TableCell>
                    <TableCell sx={{ color: '#fff' }}>
                      <Button variant="outlined" size="small">
                        View Sizes
                      </Button>
                    </TableCell>
                    <TableCell sx={{ color: '#fff' }}>
                      {product.CreatedAt?.Time ? new Date(product.CreatedAt.Time).toLocaleString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" sx={{ backgroundColor: '#00ffba', color: '#0d0d0d', mr: 1 }}
                        onClick={() => {
                          setEditingProductMn(product)
                          setUpdateModalMnOpen(true)
                        }}
                      >
                        Update
                      </Button>
                      <Button variant="contained" sx={{ background: '#ff3333', color: '#fff' }}
                        onClick={() => handleDeleteProductMn(product)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={14} align="center">
                    Одоогоор бүтээгдэхүүн алга байна
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ===== English Product Add Modal (with integrated multi-selects for Colors & Sizes) ===== */}
        <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)} fullWidth maxWidth="md">
          <DialogTitle>Add English Product</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {/* Left Column: Basic Details */}
              <Grid item xs={6}>
                <Typography variant="h6">Product Details</Typography>
                <TextField fullWidth label="Product Name" value={productNameEn} onChange={e => setProductNameEn(e.target.value)} />
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>SubCategory</InputLabel>
                  <Select value={sCategoryEnId || ''} onChange={e => setSCategoryEnId(Number(e.target.value))}>
                    {categoriesEn.map(category => (
                      <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField fullWidth label="Price" value={priceEn} onChange={e => setPriceEn(e.target.value)} />
                <TextField fullWidth label="Stock Quantity" type="number" value={stockQuantity || ''} onChange={e => setStockQuantity(Number(e.target.value))} />
                <Box sx={{ mt: 2 }}>
                  <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'en')} />
                </Box>
                <TextField fullWidth label="Description" value={descriptionEn} onChange={e => setDescriptionEn(e.target.value)} />
                <TextField fullWidth label="Brand" value={brandEn} onChange={e => setBrandEn(e.target.value)} />
                <TextField fullWidth label="Manufactured Country" value={manufacturedCountryEn} onChange={e => setManufacturedCountryEn(e.target.value)} />
              </Grid>
              {/* Right Column: Colors, Sizes & Additional Details */}
              <Grid item xs={6}>
                <Typography variant="h6">Select Colors & Sizes</Typography>
                {/* Multi-select for Colors */}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="colors-en-label">Colors</InputLabel>
                  <Select
                    labelId="colors-en-label"
                    multiple
                    value={selectedColorsEn}
                    onChange={(e) =>
                      setSelectedColorsEn(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
                    }
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {colorsEn.map((color) => (
                      <MenuItem key={color.id} value={color.colorName}>
                        {color.colorName}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button variant="outlined" onClick={() => openColorModalFn('en')} sx={{ mt: 1 }}>
                    Manage Colors
                  </Button>
                </FormControl>
                {/* Multi-select for Sizes */}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="sizes-en-label">Sizes</InputLabel>
                  <Select
                    labelId="sizes-en-label"
                    multiple
                    value={selectedSizesEn}
                    onChange={(e) =>
                      setSelectedSizesEn(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
                    }
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {size2En.map((size) => (
                      <MenuItem key={size.id} value={size.sizeName}>
                        {size.sizeName}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button variant="outlined" onClick={() => openSize2ModalFn('en')} sx={{ mt: 1 }}>
                    Manage Sizes
                  </Button>
                </FormControl>
                {/* Additional Fields */}
                <TextField fullWidth label="PenOutput" value={penOutEn} onChange={e => setPenOutEn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Features" value={featuresEn} onChange={e => setFeaturesEn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Material" value={materialEn} onChange={e => setMaterialEn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Staple Size" value={stapleSizeEn} onChange={e => setStapleSizeEn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Capacity" value={capacityEn} onChange={e => setCapacityEn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Weight" value={weightEn} onChange={e => setWeightEn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Thickness" value={thicknessEn} onChange={e => setThinknessEn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Packaging" value={packagingEn} onChange={e => setPackagingEn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Product Code" value={productCodeEn} onChange={e => setProductCodeEn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Cost Price" value={costPriceEn} onChange={e => setCostPriceEn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Retail Price" value={retailPriceEn} onChange={e => setRetailPriceEn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Warehouse Stock" type="number" value={warehouseStockEn || ''} onChange={e => setWarehouseStockEn(Number(e.target.value))} sx={{ mt: 2 }} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProductEn} variant="contained">Add English Product</Button>
          </DialogActions>
        </Dialog>

        {/* ===== Mongolian Product Add Modal (with integrated multi-selects for Colors & Sizes) ===== */}
        <Dialog open={addModalMnOpen} onClose={() => setAddModalMnOpen(false)} fullWidth maxWidth="md">
          <DialogTitle>Add Mongolian Product</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">Product Details</Typography>
                <TextField fullWidth label="Product Name" value={productNameMn} onChange={e => setProductNameMn(e.target.value)} />
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>SubCategory</InputLabel>
                  <Select value={sCategoryMnId || ''} onChange={e => setSCategoryMnId(Number(e.target.value))}>
                    {categoriesEn.map(category => (
                      <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField fullWidth label="Price" value={priceMn} onChange={e => setPriceMn(e.target.value)} />
                <TextField fullWidth label="Stock Quantity" type="number" value={stockQuantity || ''} onChange={e => setStockQuantity(Number(e.target.value))} />
                <Box sx={{ mt: 2 }}>
                  <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'mn')} />
                </Box>
                <TextField fullWidth label="Description" value={descriptionMn} onChange={e => setDescriptionMn(e.target.value)} />
                <TextField fullWidth label="Brand" value={brandMn} onChange={e => setBrandMn(e.target.value)} />
                <TextField fullWidth label="Manufactured Country" value={manufacturedCountryMn} onChange={e => setManufacturedCountryMn(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Select Colors & Sizes</Typography>
                {/* Multi-select for Colors */}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="colors-mn-label">Colors</InputLabel>
                  <Select
                    sx={{
                      color: 'fff',
                      backgroundColor: "#121212"
                    }}
                    labelId="colors-mn-label"
                    multiple
                    value={selectedColorsMn}
                    onChange={(e) =>
                      setSelectedColorsMn(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
                    }
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {colorsMn.map((color) => (
                      <MenuItem key={color.id} value={color.colorName} sx={{ color: '#fff', backgroundColor: '#121212' }}>
                        {color.colorName}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button variant="outlined" onClick={() => openColorModalFn('mn')} sx={{ mt: 1 }}>
                    Manage Colors
                  </Button>
                </FormControl>
                {/* Multi-select for Sizes */}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="sizes-mn-label">Sizes</InputLabel>
                  <Select
                    labelId="sizes-mn-label"
                    multiple
                    value={selectedSizesMn}
                    onChange={(e) =>
                      setSelectedSizesMn(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
                    }
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {size2Mn.map((size) => (
                      <MenuItem key={size.id} value={size.sizeName}>
                        {size.sizeName}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button variant="outlined" onClick={() => openSize2ModalFn('mn')} sx={{ mt: 1 }}>
                    Manage Sizes
                  </Button>
                </FormControl>
                <TextField fullWidth label="PenOutput" value={penOutMn} onChange={e => setPenOutMn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Features" value={featuresMn} onChange={e => setFeaturesMn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Material" value={materialMn} onChange={e => setMaterialMn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Staple Size" value={stapleSizeMn} onChange={e => setStapleSizeMn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Capacity" value={capacityMn} onChange={e => setCapacityMn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Weight" value={weightMn} onChange={e => setWeightMn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Thickness" value={thicknessMn} onChange={e => setThinknessEn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Packaging" value={packagingMn} onChange={e => setPackagingMn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Product Code" value={productCodeMn} onChange={e => setProductCodeMn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Cost Price" value={costPriceMn} onChange={e => setCostPriceMn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Retail Price" value={retailPriceMn} onChange={e => setRetailPriceMn(e.target.value)} sx={{ mt: 2 }} />
                <TextField fullWidth label="Warehouse Stock" type="number" value={warehouseStockMn || ''} onChange={e => setWarehouseStockMn(Number(e.target.value))} sx={{ mt: 2 }} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddModalMnOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProductMn} variant="contained">Add Mongolian Product</Button>
          </DialogActions>
        </Dialog>

        {/* ===== English Product Update Modal ===== */}
        <Dialog open={updateModalOpen} onClose={() => setUpdateModalOpen(false)} fullWidth maxWidth="md">
          <DialogTitle>Update English Product</DialogTitle>
          <DialogContent>
            {editingProduct && (
              <>
                <Box display="flex" justifyContent="center">
                  <Avatar src={editingProduct.ImagesPathEn || '/placeholder.jpg'} sx={{ width: 80, height: 80, mb: 2 }} />
                </Box>
                <Button variant="contained" component="label" sx={{ mb: 2 }}>
                  Upload Image
                  <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, 'en')} />
                </Button>
                <TextField fullWidth label="Product Name" value={editingProduct.ProductNameEn || ''} onChange={e => setEditingProduct({ ...editingProduct, ProductNameEn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Brand" value={editingProduct.BrandEn || ''} onChange={e => setEditingProduct({ ...editingProduct, BrandEn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Price" value={editingProduct.PriceEn || ''} onChange={e => setEditingProduct({ ...editingProduct, PriceEn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Stock Quantity" type="number" value={editingProduct.StockQuantity || ''} onChange={e => setEditingProduct({ ...editingProduct, StockQuantity: Number(e.target.value) })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Retail Price" value={editingProduct.RetailPriceEn || ''} onChange={e => setEditingProduct({ ...editingProduct, RetailPriceEn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Warehouse Stock" type="number" value={editingProduct.WarehouseStockEn || ''} onChange={e => setEditingProduct({ ...editingProduct, WarehouseStockEn: Number(e.target.value) })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Material" value={editingProduct.MaterialEn as string || ''} onChange={e => setEditingProduct({ ...editingProduct, MaterialEn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Color" value={editingProduct.ColorEn || ''} onChange={e => setEditingProduct({ ...editingProduct, ColorEn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Size" value={editingProduct.SizeEn || ''} onChange={e => setEditingProduct({ ...editingProduct, SizeEn: e.target.value })} sx={{ mb: 2 }} />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUpdateModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateProductEn} variant="contained">Update English Product</Button>
          </DialogActions>
        </Dialog>

        {/* ===== Mongolian Product Update Modal ===== */}
        <Dialog open={updateModalMnOpen} onClose={() => setUpdateModalMnOpen(false)} fullWidth maxWidth="md">
          <DialogTitle>Update Mongolian Product</DialogTitle>
          <DialogContent>
            {editingProductMn && (
              <>
                <Box display="flex" justifyContent="center">
                  <Avatar src={editingProductMn.ImagesPathMn || '/placeholder.jpg'} sx={{ width: 80, height: 80, mb: 2 }} />
                </Box>
                <Button variant="contained" component="label" sx={{ mb: 2 }}>
                  Upload Image
                  <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, 'mn')} />
                </Button>
                <TextField fullWidth label="Product Name" value={editingProductMn.ProductNameMn || ''} onChange={e => setEditingProductMn({ ...editingProductMn, ProductNameMn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Brand" value={editingProductMn.BrandMn || ''} onChange={e => setEditingProductMn({ ...editingProductMn, BrandMn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Price" value={editingProductMn.PriceMn || ''} onChange={e => setEditingProductMn({ ...editingProductMn, PriceMn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Stock Quantity" type="number" value={editingProductMn.StockQuantity || ''} onChange={e => setEditingProductMn({ ...editingProductMn, StockQuantity: Number(e.target.value) })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Retail Price" value={editingProductMn.RetailPriceMn || ''} onChange={e => setEditingProductMn({ ...editingProductMn, RetailPriceMn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Warehouse Stock" type="number" value={editingProductMn.WarehouseStockMn || ''} onChange={e => setEditingProductMn({ ...editingProductMn, WarehouseStockMn: Number(e.target.value) })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Material" value={editingProductMn.MaterialMn as string || ''} onChange={e => setEditingProductMn({ ...editingProductMn, MaterialMn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Color" value={editingProductMn.ColorMn || ''} onChange={e => setEditingProductMn({ ...editingProductMn, ColorMn: e.target.value })} sx={{ mb: 2 }} />
                <TextField fullWidth label="Size" value={editingProductMn.SizeMn || ''} onChange={e => setEditingProductMn({ ...editingProductMn, SizeMn: e.target.value })} sx={{ mb: 2 }} />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUpdateModalMnOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateProductMn} variant="contained">Update Mongolian Product</Button>
          </DialogActions>
        </Dialog>

        {/* ===== Detail Modals for Aggregated Colors & Sizes ===== */}
        <Dialog open={openColorDetailModal} onClose={() => setOpenColorDetailModal(false)}>
          <DialogTitle>Product Colors</DialogTitle>
          <DialogContent>
            {colorDetails.length > 0 ? (
              <Box>
                {colorDetails.map((color, index) => (
                  <Typography key={index}>{color}</Typography>
                ))}
              </Box>
            ) : (
              <Typography>Одоогоор бүтээгдэхүүн алга байна</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenColorDetailModal(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openSizeDetailModal} onClose={() => setOpenSizeDetailModal(false)}>
          <DialogTitle>Product Sizes</DialogTitle>
          <DialogContent>
            {sizeDetails.length > 0 ? (
              <Box>
                {sizeDetails.map((size, index) => (
                  <Typography key={index}>{size}</Typography>
                ))}
              </Box>
            ) : (
              <Typography>Одоогоор бүтээгдэхүүн алга байна</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenSizeDetailModal(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* ===== Snackbar ===== */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MuiAlert severity={snackbarSeverity}>{snackbarMessage}</MuiAlert>
        </Snackbar>
      </Box >

      {/* ===== Color Management Modal ===== */}
      <Dialog open={colorModalOpen} onClose={() => setColorModalOpen(false)}>
        <DialogTitle>
          {currentLangForColor === 'en' ? 'Manage Colors (English)' : 'Manage Colors (Mongolian)'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Color Name"
            value={tempColor}
            onChange={e => setTempColor(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" onClick={handleAddOrEditColor} sx={{ mt: 2 }}>
            {editingColorId !== null ? 'Update Color' : 'Add Color'}
          </Button>
          <Box mt={2}>
            <Typography variant="subtitle1">Available Colors:</Typography>
            {(currentLangForColor === 'en' ? colorsEn : colorsMn).map((item) => (
              <Box key={item.id} display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                <Typography variant="body2">Color: {item.colorName}</Typography>
                <Box>
                  <IconButton size="small" onClick={() => handleEditColor(item)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteColor(item.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setColorModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ===== Size Management Modal ===== */}
      <Dialog open={size2ModalOpen} onClose={() => setSize2ModalOpen(false)}>
        <DialogTitle>
          {currentLangForSize2 === 'en' ? 'Manage Sizes (English)' : 'Manage Sizes (Mongolian)'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Size Name"
            value={tempSize2}
            onChange={e => setTempSize2(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" onClick={handleAddOrEditSize2} sx={{ mt: 2 }}>
            {editingSize2Id !== null ? 'Update Size' : 'Add Size'}
          </Button>
          <Box mt={2}>
            <Typography variant="subtitle1">Available Sizes:</Typography>
            {(currentLangForSize2 === 'en' ? size2En : size2Mn).map((item) => (
              <Box key={item.id} display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                <Typography variant="body2">Size: {item.sizeName}</Typography>
                <Box>
                  <IconButton size="small" onClick={() => handleEditSize2(item)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteSize2(item.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSize2ModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default Product
