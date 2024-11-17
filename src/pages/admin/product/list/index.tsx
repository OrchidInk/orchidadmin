import React, { useEffect, useState } from 'react';
import Header from "@/@core/components/Navbar";
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Paper,
} from "@mui/material";
import axios from 'axios';
import { apiSuperAdminProduct } from '@/@core/utils/type/router';

interface Product {
    productName: string;
    price: string;
    stockQuantity: number;
    imagesPath: string;
}

const ProductList = () => {
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

    return (
        <Box sx={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#ffffff', p: 4 }}>
            <Header />
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Product List
            </Typography>

            {/* English Products */}
            <Typography variant="h6" sx={{ mb: 2, color: '#00ffba' }}>
                English Products
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
                {productsEn.length > 0 ? (
                    productsEn.map((product, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.imagesPath || 'placeholder.jpg'}
                                    alt={product.productName}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {product.productName}
                                    </Typography>
                                    <Typography variant="body2" color="#00ffba">
                                        Price: ${product.price}
                                    </Typography>
                                    <Typography variant="body2" color="#ffffff">
                                        Stock: {product.stockQuantity}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body2" color="#999">
                        No products found.
                    </Typography>
                )}
            </Grid>

            {/* Mongolian Products */}
            <Typography variant="h6" sx={{ mb: 2, color: '#00ffba' }}>
                Mongolian Products
            </Typography>
            <Grid container spacing={2}>
                {productsMn.length > 0 ? (
                    productsMn.map((product, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.imagesPath || 'placeholder.jpg'}
                                    alt={product.productName}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {product.productName}
                                    </Typography>
                                    <Typography variant="body2" color="#00ffba">
                                        Price: ₮{product.price}
                                    </Typography>
                                    <Typography variant="body2" color="#ffffff">
                                        Stock: {product.stockQuantity}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body2" color="#999">
                        No products found.
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};

export default ProductList;
