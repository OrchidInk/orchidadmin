import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';
import { apiSuperAdminProduct } from '@/@core/utils/type/router';

interface ProductDetails {
    ProductId: number;
    ProductNameEn?: string;
    ProductNameMn?: string;
    PriceEn?: string;
    PriceMn?: string;
    StockQuantity: number;
    DescriptionEn?: string;
    DescriptionMn?: string;
    ImagesPathEn?: string;
    ImagesPathMn?: string;
}

const ProductDetail = () => {
    const router = useRouter();
    const { id } = router.query; // Extract product ID from the route
    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchProductDetails = async () => {
                try {
                    const response = await axios.get(`${apiSuperAdminProduct}/detail/${id}`);
                    setProduct(response.data);
                } catch (error) {
                    console.error('Failed to fetch product details:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProductDetails();
        }
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!product) {
        return (
            <Box sx={{ textAlign: 'center', padding: 4 }}>
                <Typography variant="h5">Product not found.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ backgroundColor: '#0d0d0d', color: '#ffffff', padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                {product.ProductNameEn || product.ProductNameMn}
            </Typography>
            <Typography variant="h6">Price: ${product.PriceEn || product.PriceMn}</Typography>
            <Typography variant="body1" sx={{ marginBottom: 3 }}>
                Stock: {product.StockQuantity}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 3 }}>
                {product.DescriptionEn || product.DescriptionMn}
            </Typography>
            {product.ImagesPathEn || product.ImagesPathMn ? (
                <Box
                    component="img"
                    src={product.ImagesPathEn || product.ImagesPathMn}
                    alt={product.ProductNameEn || product.ProductNameMn}
                    sx={{
                        maxWidth: '100%',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                    }}
                />
            ) : (
                <Typography>No product image available.</Typography>
            )}
        </Box>
    );
};

export default ProductDetail;
