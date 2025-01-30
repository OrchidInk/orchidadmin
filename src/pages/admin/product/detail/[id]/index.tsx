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
} from '@mui/material';
import Header from '@/@core/components/Navbar';

// Type definitions for both English and Mongolian products
interface ProductEn {
  ProductEnID: number;
  ProductNameEn: string;
  SubCategoryIDEn: number;
  PriceEn: string;
  StockQuantity: number;
  ImagesPathEn?: string;
  DescriptionEn: string;
  BrandEn: string;
  ManufacturedCountryEn: string;
  ColorEn: string;
  SizeEn: string;
  ProductCodeEn: string;
  CreatedAt: { Time: string };
  UpdatedAt: { Time: string };
}

interface ProductMn {
  ProductMnID: number;
  ProductNameMn: string;
  SubCategoryIDMn: number;
  PriceMn: string;
  StockQuantity: number;
  ImagesPathMn?: string;
  DescriptionMn: string;
  BrandMn: string;
  ManufacturedCountryMn: string;
  ColorMn: string;
  SizeMn: string;
  ProductCodeMn: string;
  CreatedAt: { Time: string };
  UpdatedAt: { Time: string };
}

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Extract product ID from URL
  const [productEn, setProductEn] = useState<ProductEn | null>(null);
  const [productMn, setProductMn] = useState<ProductMn | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch both English and Mongolian product details
  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [enResponse, mnResponse] = await Promise.all([
          axios.get<ProductEn>(`https://api.orchid.mn/api/v1/superadmin/product/findEn/${id}`),
          axios.get<ProductMn>(`https://api.orchid.mn/api/v1/superadmin/product/findMn/${id}`)
        ]);

        setProductEn(enResponse.data);
        setProductMn(mnResponse.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch product details:', err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ backgroundColor: '#0d0d0d', color: '#ffffff', minHeight: '100vh', p: 4 }}>
        <Typography variant="h5">Loading product details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ backgroundColor: '#0d0d0d', color: '#ffffff', minHeight: '100vh', p: 4 }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#0d0d0d', color: '#ffffff' }}>
      <Header />
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center', color: '#00ffba' }}>
        Product Details
      </Typography>

      {/* English Product Details */}
      {productEn && (
        <>
          <Typography variant="h5" sx={{ color: '#00ffba', mt: 3 }}>English Product</Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box>
              <img
                src={productEn.ImagesPathEn || '/placeholder.jpg'}
                alt={productEn.ProductNameEn}
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <TableContainer component={Paper} sx={{ backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>{productEn.ProductNameEn}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Price</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>${productEn.PriceEn}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Stock</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>{productEn.StockQuantity} units available</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </>
      )}

      {/* Mongolian Product Details */}
      {productMn && (
        <>
          <Typography variant="h5" sx={{ color: '#00ffba', mt: 5 }}>Mongolian Product</Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box>
              <img
                src={productMn.ImagesPathMn || '/placeholder.jpg'}
                alt={productMn.ProductNameMn}
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <TableContainer component={Paper} sx={{ backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>{productMn.ProductNameMn}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Price</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>₮{productMn.PriceMn}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Stock</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>{productMn.StockQuantity} units available</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductDetail;
