/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Paper,
  TableRow,
  CircularProgress,
  TextField,
  Checkbox,
  Button,
  Snackbar
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
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

  // New state: selected orders for printing
  const [selectedOrders, setSelectedOrders] = useState<FlattenedOrderRecord[]>([]);
  // Snackbar state (if needed)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  // Fetch orders on mount.
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Replace with your endpoint.
        const response = await axios.get("https://api.orchid.mn/api/v1/superadmin/order/list");
        const data = Array.isArray(response.data) ? response.data : [];
        const flattened: FlattenedOrderRecord[] = data.flatMap((order: any) => {
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

  // Helpers for selection:
  const getOrderKey = (order: FlattenedOrderRecord) =>
    `${order.OrderID}-${order.Quantity}-${order.PriceAtOrder}`;

  const handleSelectRow = (order: FlattenedOrderRecord, checked: boolean) => {
    if (checked) {
      setSelectedOrders(prev => [...prev, order]);
    } else {
      setSelectedOrders(prev => prev.filter(o => getOrderKey(o) !== getOrderKey(order)));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders);
    } else {
      setSelectedOrders([]);
    }
  };

  const allSelected = filteredOrders.length > 0 && filteredOrders.every(order =>
    selectedOrders.some(o => getOrderKey(o) === getOrderKey(order))
  );

  // Print selected orders.
  const handlePrintOrders = () => {
    if (selectedOrders.length === 0) {
      alert("No orders selected for printing.");
      return;
    }
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const html = `
        <html>
          <head>
            <title>Print Orders</title>
            <style>
              table, th, td { border: 1px solid black; border-collapse: collapse; padding: 8px; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h2>Selected Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>OrderID</th>
                  <th>CustomerOrderId</th>
                  <th>UserID</th>
                  <th>PhoneNumber</th>
                  <th>CreatedAt</th>
                  <th>Quantity</th>
                  <th>PriceAtOrder</th>
                  <th>SelectedColor</th>
                  <th>SelectedSize</th>
                  <th>ProductMnID</th>
                  <th>ProductEnID</th>
                  <th>ProductName</th>
                </tr>
              </thead>
              <tbody>
                ${selectedOrders.map(order => `
                  <tr>
                    <td>${order.OrderID}</td>
                    <td>${order.CustomerOrderId.Valid ? order.CustomerOrderId.Int32 : "-"}</td>
                    <td>${order.UserId}</td>
                    <td>${order.PhoneNumber}</td>
                    <td>${order.CreatedAt.Valid ? order.CreatedAt.Time : "-"}</td>
                    <td>${order.Quantity}</td>
                    <td>${order.PriceAtOrder}</td>
                    <td>${order.SelectedColor.Valid ? order.SelectedColor.String : "-"}</td>
                    <td>${order.SelectedSize.Valid ? order.SelectedSize.String : "-"}</td>
                    <td>${order.ProductMnID.Valid ? order.ProductMnID.Int32 : "-"}</td>
                    <td>${order.ProductEnID.Valid ? order.ProductEnID.Int32 : "-"}</td>
                    <td>${order.ProductName}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </body>
        </html>
      `;
      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

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
          <Button variant="contained" color="secondary" onClick={handlePrintOrders}>
            Print Selected Orders
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* Master Checkbox */}
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </TableCell>
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
              {filteredOrders.map((order) => {
                const key = `${order.OrderID}-${order.Quantity}-${order.PriceAtOrder}`;
                const isSelected = selectedOrders.some((o) => `${o.OrderID}-${o.Quantity}-${o.PriceAtOrder}` === key);
                return (
                  <TableRow key={key}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(e) => handleSelectRow(order, e.target.checked)}
                      />
                    </TableCell>
                    <TableCell>{order.OrderID}</TableCell>
                    <TableCell>{order.CustomerOrderId.Valid ? order.CustomerOrderId.Int32 : "-"}</TableCell>
                    <TableCell>{order.UserId}</TableCell>
                    <TableCell>{order.PhoneNumber}</TableCell>
                    <TableCell>{order.CreatedAt.Valid ? order.CreatedAt.Time : "-"}</TableCell>
                    <TableCell>{order.Quantity}</TableCell>
                    <TableCell>{order.PriceAtOrder}</TableCell>
                    <TableCell>{order.SelectedColor.Valid ? order.SelectedColor.String : "-"}</TableCell>
                    <TableCell>{order.SelectedSize.Valid ? order.SelectedSize.String : "-"}</TableCell>
                    <TableCell>{order.ProductMnID.Valid ? order.ProductMnID.Int32 : "-"}</TableCell>
                    <TableCell>{order.ProductEnID.Valid ? order.ProductEnID.Int32 : "-"}</TableCell>
                    <TableCell>{order.ProductName}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert severity={snackbarSeverity}>{snackbarMessage}</MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default OrderList;
