import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    CircularProgress,
    Button,
    Checkbox,
} from "@mui/material";
import Header from "@/@core/components/Navbar";

type DeliveryType = {
    DeliverId: number;
    DeliverName: string;
    OrderId: number;
    DeliveryAmount: string;
    CreatedAt: {
        Time: string;
        Valid: boolean;
    } | null;
};

const Delivery = () => {
    const [deliveries, setDeliveries] = useState<DeliveryType[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedDeliveryIds, setSelectedDeliveryIds] = useState<number[]>([]);

    useEffect(() => {
        axios
            .get("https://api.orchid.mn/api/v1/superadmin/delivery/list")
            // axios.get("http://localhost:9000/api/v1/superadmin/delivery/list")
            .then(({ data }) => setDeliveries(data))
            .catch((error) =>
                setError("Failed to fetch deliveries: " + error.message)
            );
    }, []);

    const handleToggleSelection = (deliveryId: number) => {
        setSelectedDeliveryIds((prev) =>
            prev.includes(deliveryId)
                ? prev.filter((id) => id !== deliveryId)
                : [...prev, deliveryId]
        );
    };

    const handlePrintSelected = () => {
        if (!deliveries) return;
        const selectedDeliveries = deliveries.filter((d) =>
            selectedDeliveryIds.includes(d.DeliverId)
        );
        if (selectedDeliveries.length === 0) {
            alert("Please select at least one delivery to print.");
            return;
        }
        // Create a print-friendly HTML string for selected deliveries.
        const printContent = `
      <html>
         <head>
            <title>Print Selected Deliveries</title>
            <style>
              body { font-family: sans-serif; padding: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 8px; text-align: left; }
              th { background-color: #f0f0f0; }
            </style>
         </head>
         <body>
            <h1>Selected Deliveries</h1>
            <table>
              <thead>
                <tr>
                  <th>Delivery ID</th>
                  <th>Name</th>
                  <th>Delivery Amount</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                ${selectedDeliveries
                .map((d) => `
                  <tr>
                    <td>${d.DeliverId}</td>
                    <td>${d.DeliverName || "N/A"}</td>
                    <td>${d.DeliveryAmount || "N/A"}</td>
                    <td>${d.CreatedAt && d.CreatedAt.Valid
                        ? new Date(d.CreatedAt.Time).toLocaleString("en-US", {
                            timeZone: "Asia/Ulaanbaatar",
                        })
                        : "N/A"
                    }</td>
                  </tr>
                `)
                .join("")}
              </tbody>
            </table>
         </body>
      </html>
    `;
        const printWindow = window.open("", "_blank", "width=800,height=600");
        if (printWindow) {
            printWindow.document.open();
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }
    };

    const handleDelete = (deliveryId: number) => {
        if (!window.confirm("Are you sure you want to delete this delivery?")) return;
        axios
            .delete(`https://api.orchid.mn/api/v1/superadmin/delivery/delete/${deliveryId}`)
            .then(() => {
                if (deliveries) {
                    setDeliveries(deliveries.filter((d) => d.DeliverId !== deliveryId));
                    // Also remove from selected if necessary.
                    setSelectedDeliveryIds((prev) =>
                        prev.filter((id) => id !== deliveryId)
                    );
                }
            })
            .catch((err) => {
                console.error("Failed to delete delivery:", err);
                alert("Failed to delete delivery.");
            });
    };

    if (error) {
        return (
            <>
                <Header />
                <Box
                    sx={{
                        backgroundColor: "#0d0d0d",
                        color: "#fff",
                        minHeight: "100vh",
                        p: 4,
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Delivery List
                    </Typography>
                    <Typography color="error" variant="h6">
                        {error}
                    </Typography>
                </Box>
            </>
        );
    }

    if (!deliveries) {
        return (
            <>
                <Header />
                <Box
                    sx={{
                        backgroundColor: "#0d0d0d",
                        color: "#fff",
                        minHeight: "100vh",
                        p: 4,
                        textAlign: "center",
                    }}
                >
                    <CircularProgress color="primary" />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Loading deliveries...
                    </Typography>
                </Box>
            </>
        );
    }

    return (
        <>
            <Header />
            <Box
                sx={{
                    backgroundColor: "#0d0d0d",
                    color: "#fff",
                    minHeight: "100vh",
                    p: 4,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Delivery List
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePrintSelected}
                    >
                        Print Selected
                    </Button>
                </Box>
                <TableContainer component={Paper} sx={{ backgroundColor: "#1a1a1a" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#fff" }}>Select</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Delivery ID</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Delivery Amount</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Created At</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deliveries.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No deliveries found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                deliveries.map((delivery) => (
                                    <TableRow key={delivery.DeliverId}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedDeliveryIds.includes(delivery.DeliverId)}
                                                onChange={() =>
                                                    handleToggleSelection(delivery.DeliverId)
                                                }
                                                sx={{ color: "#fff" }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ color: "#fff" }}>
                                            {delivery.DeliverId || "N/A"}
                                        </TableCell>
                                        <TableCell sx={{ color: "#fff" }}>
                                            {delivery.DeliverName || "N/A"}
                                        </TableCell>
                                        <TableCell sx={{ color: "#fff" }}>
                                            {delivery.DeliveryAmount || "N/A"}
                                        </TableCell>
                                        <TableCell sx={{ color: "#fff" }}>
                                            {delivery.CreatedAt && delivery.CreatedAt.Valid
                                                ? new Date(delivery.CreatedAt.Time).toLocaleString(
                                                    "en-US",
                                                    { timeZone: "Asia/Ulaanbaatar" }
                                                )
                                                : "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDelete(delivery.DeliverId)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default Delivery;
