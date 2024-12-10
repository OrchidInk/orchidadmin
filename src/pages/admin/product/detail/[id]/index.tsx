import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
} from '@mui/material';
import Header from '@/@core/components/Navbar';

// Type definitions
interface Product {
  productNameEn: string;
  productNameMn: string;
  imagesPathEn?: string;
  imagesPathMn?: string;
  priceEn?: number;
  priceMn?: number;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
}

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id, type } = router.query; // Extract product ID and type from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  // State for size and color
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false); // Modal state

  useEffect(() => {
    if (!id || !type) return; // Wait for `id` and `type` to be available

    const endpoint = type === 'en' ? `findEn/${id}` : `findMn/${id}`;

    // Fetch product details using the `id` and `type`
    axios
      .get<Product>(`http://103.50.205.86:9000/api/v1/superadmin/product/${endpoint}`, {
        headers: {
          Authorization: 'Bearer <your-auth-token>', // Replace with your actual token
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setProduct(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error('Failed to fetch product details:', err);
        setError('Failed to load product details.');
      });
  }, [id, type]);

  const handleAddDetails = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  if (error) {
    return (
      <Box sx={{ backgroundColor: '#0d0d0d', color: '#ffffff', minHeight: '100vh', p: 4 }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ backgroundColor: '#0d0d0d', color: '#ffffff', minHeight: '100vh', p: 4 }}>
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#0d0d0d', color: '#ffffff' }}>
      <Header />
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center', color: '#00ffba' }}>
        Product Details
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
        {/* Product Image */}
        <Box>
          <img
            src={product.imagesPathEn || product.imagesPathMn || '/placeholder.jpg'}
            alt={product.productNameEn || product.productNameMn}
            style={{
              width: '100%',
              maxWidth: '400px',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
            }}
          />
        </Box>

        {/* Product Details */}
        <Box sx={{ flexGrow: 1 }}>
          <TableContainer component={Paper} sx={{ backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{product.productNameEn || product.productNameMn}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>
                    ${product.priceEn || product.priceMn || 'N/A'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Stock</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{product.stockQuantity} units available</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Created At</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Updated At</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddDetails}
          sx={{ backgroundColor: '#00ffba', color: '#0d0d0d', fontWeight: 'bold' }}
        >
          Add Details
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.back()}
          sx={{ color: '#ffffff', borderColor: '#ffffff' }}
        >
          Go Back
        </Button>
      </Box>

      {/* Modal */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#1a1a1a',
            color: '#ffffff',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', color: '#00ffba' }}>
            Add Product Details
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: '#ffffff' }}>Select Size</InputLabel>
            <Select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              sx={{ color: '#ffffff', backgroundColor: '#1a1a1a' }}
            >
              <MenuItem value="S">Small</MenuItem>
              <MenuItem value="M">Medium</MenuItem>
              <MenuItem value="L">Large</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: '#ffffff' }}>Select Color</InputLabel>
            <Select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              sx={{ color: '#ffffff', backgroundColor: '#1a1a1a' }}
            >
              <MenuItem value="Red">Red</MenuItem>
              <MenuItem value="Blue">Blue</MenuItem>
              <MenuItem value="Green">Green</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{ mt: 2, width: '100%', backgroundColor: '#00ffba', color: '#0d0d0d' }}
            onClick={handleModalClose}
          >
            Save Details
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductDetail;
