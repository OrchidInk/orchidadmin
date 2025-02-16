"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Header from "@/@core/components/Navbar";

interface OrderItem {
  OrderItemId: number;
  CustomerOrderId: { Int32: number; Valid: boolean };
  ProductMnID: { Int32: number; Valid: boolean };
  ProductEnID: { Int32: number; Valid: boolean };
  UserId: number;
  PhoneNumber: string;
  Quantity: number;
  PriceAtOrder: string;
}

const OrderList = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://api.orchid.mn/api/v1/superadmin/order/list");
        // Ensure response.data is an array.
        const data = Array.isArray(response.data) ? response.data : [];
        setOrders(data);
        setError("");
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box >
      <Header />
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Order List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer Order ID</TableCell>
              <TableCell>Product MN ID</TableCell>
              <TableCell>Product EN ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price At Order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.OrderItemId}>
                <TableCell>{order.OrderItemId}</TableCell>
                <TableCell>
                  {order.CustomerOrderId.Valid ? order.CustomerOrderId.Int32 : "-"}
                </TableCell>
                <TableCell>
                  {order.ProductMnID.Valid ? order.ProductMnID.Int32 : "-"}
                </TableCell>
                <TableCell>
                  {order.ProductEnID.Valid ? order.ProductEnID.Int32 : "-"}
                </TableCell>
                <TableCell>{order.UserId}</TableCell>
                <TableCell>{order.PhoneNumber || "-"}</TableCell>
                <TableCell>{order.Quantity}</TableCell>
                <TableCell>{order.PriceAtOrder}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderList;
