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
  TextField,
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
  CreatedAt?: string | null; // Optional created date
}

const OrderList = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  // Filter state for Order ID and Phone Number.
  const [filterOrderId, setFilterOrderId] = useState("");
  const [filterPhone, setFilterPhone] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // const response = await axios.get("https://api.orchid.mn/api/v1/superadmin/order/list");
        const response = await axios.get("http://localhost:9000/api/v1/superadmin/order/list");
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

  // Filter orders based on the filter inputs.
  const filteredOrders = orders.filter((order) => {
    const matchesId = filterOrderId
      ? order.OrderItemId === Number(filterOrderId)
      : true;
    const matchesPhone = filterPhone
      ? order.PhoneNumber.toLowerCase().includes(filterPhone.toLowerCase())
      : true;
    return matchesId && matchesPhone;
  });

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
    <Box>
      <Header />
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Order List
        </Typography>

        {/* Filter Section */}
        <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Order ID-гаар хайх"
            variant="outlined"
            value={filterOrderId}
            onChange={(e) => setFilterOrderId(e.target.value)}
            sx={{
              input: { color: "white" },
              "& .MuiInputLabel-root": { color: "white" }
            }}
          />
          <TextField
            label="Утасны дугаараар хайх"
            variant="outlined"
            value={filterPhone}
            onChange={(e) => setFilterPhone(e.target.value)}
            sx={{
              input: { color: "white" },
              "& .MuiInputLabel-root": { color: "white" }
            }}
          />
        </Box>

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
              {filteredOrders.map((order) => (
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
    </Box>
  );
};

export default OrderList;
