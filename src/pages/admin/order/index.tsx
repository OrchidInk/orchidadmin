/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Define the type for a flattened order record.
interface FlattenedOrderRecord {
  OrderID: number;
  CustomerOrderId: { Int32: number; Valid: boolean };
  UserId: number;
  PhoneNumber: string;
  CreatedAt: { Time: string; Valid: boolean };
  // Order item details:
  Quantity: number;
  PriceAtOrder: string;
  SelectedColor: { String: string; Valid: boolean };
  SelectedSize: { String: string; Valid: boolean };
  ProductMnID: { Int32: number; Valid: boolean };
  ProductEnID: { Int32: number; Valid: boolean };
  ProductName: string;
}

const OrderList = () => {
  const [orders, setOrders] = useState<FlattenedOrderRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  // Filter state for OrderID and Phone Number.
  const [filterOrderId, setFilterOrderId] = useState("");
  const [filterPhone, setFilterPhone] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // const response = await axios.get("http://localhost:9000/api/v1/superadmin/order/list");
        const response = await axios.get("https://api.orchid.mn/api/v1/superadmin/order/list");
        // Ensure response.data is an array.
        const data = Array.isArray(response.data) ? response.data : [];
        // Flatten the orders: for each order, create one row per order item.
        const flattened: FlattenedOrderRecord[] = data.flatMap((order: any) => {
          // Check if OrderItems exists and is an array.
          if (!Array.isArray(order.OrderItems)) return [];
          return order.OrderItems.map((item: any) => ({
            OrderID: order.OrderID,
            CustomerOrderId: order.CustomerOrderId,
            UserId: order.UserId,
            PhoneNumber: order.PhoneNumber,
            CreatedAt: order.CreatedAt,
            Quantity: item.quantity,
            PriceAtOrder: item.priceAtOrder,
            SelectedColor: { String: item.selectedColor, Valid: item.selectedColor !== "" },
            SelectedSize: { String: item.selectedSize, Valid: item.selectedSize !== "" },
            ProductMnID: { Int32: item.productMnId, Valid: item.productMnId !== 0 },
            ProductEnID: { Int32: item.productEnId, Valid: item.productEnId !== 0 },
            // Use productName from the order if available, otherwise empty string.
            ProductName: item.productName || order.ProductName || "",
          }));
        });
        setOrders(flattened);
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
    const matchesId = filterOrderId ? order.OrderID === Number(filterOrderId) : true;
    const matchesPhone = filterPhone
      ? order.PhoneNumber.toLowerCase().includes(filterPhone.toLowerCase())
      : true;
    return matchesId && matchesPhone;
  });

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>Order List</Typography>

        {/* Filter Section */}
        <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Order ID"
            variant="outlined"
            value={filterOrderId}
            onChange={(e) => setFilterOrderId(e.target.value)}
            sx={{
              input: { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
            }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            value={filterPhone}
            onChange={(e) => setFilterPhone(e.target.value)}
            sx={{
              input: { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
            }}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>OrderID</TableCell>
                <TableCell>CustomerOrderId</TableCell>
                <TableCell>UserID</TableCell>
                <TableCell>PhoneNumber</TableCell>
                <TableCell>CreatedAt</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>PriceAtOrder</TableCell>
                <TableCell>SelectedColor</TableCell>
                <TableCell>SelectedSize</TableCell>
                <TableCell>ProductMnID</TableCell>
                <TableCell>ProductEnID</TableCell>
                <TableCell>ProductName</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={`${order.OrderID}-${order.Quantity}-${order.PriceAtOrder}`}>
                  <TableCell>{order.OrderID}</TableCell>
                  <TableCell>
                    {order.CustomerOrderId.Valid ? order.CustomerOrderId.Int32 : "-"}
                  </TableCell>
                  <TableCell>{order.UserId}</TableCell>
                  <TableCell>{order.PhoneNumber}</TableCell>
                  <TableCell>{order.CreatedAt.Valid ? order.CreatedAt.Time : "-"}</TableCell>
                  <TableCell>{order.Quantity}</TableCell>
                  <TableCell>{order.PriceAtOrder}</TableCell>
                  <TableCell>
                    {order.SelectedColor.Valid ? order.SelectedColor.String : "-"}
                  </TableCell>
                  <TableCell>
                    {order.SelectedSize.Valid ? order.SelectedSize.String : "-"}
                  </TableCell>
                  <TableCell>
                    {order.ProductMnID.Valid ? order.ProductMnID.Int32 : "-"}
                  </TableCell>
                  <TableCell>
                    {order.ProductEnID.Valid ? order.ProductEnID.Int32 : "-"}
                  </TableCell>
                  <TableCell>{order.ProductName}</TableCell>
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
