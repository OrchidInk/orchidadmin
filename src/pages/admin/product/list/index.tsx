import React, { useEffect, useState } from 'react';
import Header from "@/@core/components/Navbar";
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import axios from 'axios';
import { apiSuperAdminProduct } from '@/@core/utils/type/router';

interface Product {
    productName: string;
    price: string;
    stockQuantity: number;
    imagesPath: string; // Base64 string with prefix
}

const ProductList = () => {
    const [productsEn, setProductsEn] = useState<Product[]>([]);
    const [productsMn, setProductsMn] = useState<Product[]>([]);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const responseEn = await axios.get(`${apiSuperAdminProduct}/listEn`);
                console.log("English Products:", responseEn.data); // Debugging
                // Map the response to match the structure used in the UI
                const formattedProductsEn = responseEn.data.map((product: any) => ({
                    productName: product.ProductNameEn,
                    price: product.PriceEn,
                    stockQuantity: product.StockQuantity,
                    imagesPath: product.ImagesPathEn, // No further formatting needed
                }));
                setProductsEn(formattedProductsEn);

                const responseMn = await axios.get(`${apiSuperAdminProduct}/listMn`);
                console.log("Mongolian Products:", responseMn.data); // Debugging
                const formattedProductsMn = responseMn.data.map((product: any) => ({
                    productName: product.ProductNameMn,
                    price: product.PriceMn,
                    stockQuantity: product.StockQuantity,
                    imagesPath: product.ImagesPathMn,
                }));
                setProductsMn(formattedProductsMn);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <Box sx={{ backgroundColor: '#0d0d0d',  color: '#ffffff'}}>
            <Header />
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                Product List
            </Typography>

            {/* English Products */}
            <Typography variant="h6" sx={{ mb: 2, color: '#00ffba', textAlign: 'center' }}>
                English Products
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
                {productsEn.length > 0 ? (
                    productsEn.map((product, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card sx={{ backgroundColor: '#1a1a1a', color: '#ffffff', borderRadius: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.imagesPath} // Use directly without formatting
                                    alt={product.productName || "Product Image"}
                                    sx={{ objectFit: 'cover', borderRadius: '4px 4px 0 0' }}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                        sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#00ffba' }}
                                    >
                                        {product.productName}
                                    </Typography>
                                    <Typography variant="body2" color="#ffffff">
                                        Price: ${product.price || "N/A"}
                                    </Typography>
                                    <Typography variant="body2" color="#ffffff">
                                        Stock: {product.stockQuantity || 0}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body2" color="#999" sx={{ textAlign: 'center', width: '100%' }}>
                        No products found.
                    </Typography>
                )}
            </Grid>

            {/* Mongolian Products */}
            <Typography variant="h6" sx={{ mb: 2, color: '#00ffba', textAlign: 'center' }}>
                Mongolian Products
            </Typography>
            <Grid container spacing={2}>
                {productsMn.length > 0 ? (
                    productsMn.map((product, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card sx={{ backgroundColor: '#1a1a1a', color: '#ffffff', borderRadius: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.imagesPath} // Use directly without formatting
                                    alt={product.productName || "Product Image"}
                                    sx={{ objectFit: 'cover', borderRadius: '4px 4px 0 0' }}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                        sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#00ffba' }}
                                    >
                                        {product.productName}
                                    </Typography>
                                    <Typography variant="body2" color="#ffffff">
                                        Price: ₮{product.price || "N/A"}
                                    </Typography>
                                    <Typography variant="body2" color="#ffffff">
                                        Stock: {product.stockQuantity || 0}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body2" color="#999" sx={{ textAlign: 'center', width: '100%' }}>
                        No products found.
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};

export default ProductList;
