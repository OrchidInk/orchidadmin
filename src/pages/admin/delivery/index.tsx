import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress } from "@mui/material";
import Header from "@/@core/components/Navbar";

const Delivery = () => {
    const [deliveries, setDeliveries] = useState<Array<{ DeliveryId: number; Name: string; Status: string }> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get("https://api.orchid.mn/api/v1/superadmin/delivery/list")
            // axios.get("http://localhost:9000/api/v1/superadmin/delivery/list")
            .then(({ data }) => setDeliveries(data))
            .catch((error) => setError("Failed to fetch deliveries: " + error.message));
    }, []);

    if (error) {
        return (
            <>
                <Header />
                <Box sx={{ backgroundColor: "#0d0d0d", color: "#fff", minHeight: "100vh", p: 4 }}>
                    <Typography variant="h4" gutterBottom>Delivery List</Typography>
                    <Typography color="error" variant="h6">{error}</Typography>
                </Box>
            </>
        );
    }

    if (!deliveries) {
        return (
            <>
                <Header />
                <Box sx={{ backgroundColor: "#0d0d0d", color: "#fff", minHeight: "100vh", p: 4, textAlign: "center" }}>
                    <CircularProgress color="primary" />
                    <Typography variant="h6" sx={{ mt: 2 }}>Loading deliveries...</Typography>
                </Box>
            </>
        );
    }

    return (
        <>
            <Header />
            <Box sx={{ backgroundColor: "#0d0d0d", color: "#fff", minHeight: "100vh", p: 4 }}>
                <Typography variant="h4" gutterBottom>Delivery List</Typography>
                <TableContainer component={Paper} sx={{ backgroundColor: "#1a1a1a" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#fff" }}>Delivery ID</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deliveries.map(({ DeliveryId, Name, Status }) => (
                                <TableRow key={DeliveryId}>
                                    <TableCell sx={{ color: "#fff" }}>{DeliveryId}</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>{Name}</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>{Status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default Delivery;
