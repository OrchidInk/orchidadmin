import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import Header from '@/@core/components/Navbar';

type PaymentType = {
    PaymentID: number;
    OrderID: number;
    UserID: number;
    PaymentMethod: string;
    PaymentStatus: string | null;
    Amount: string;
    CreatedAt: {
        Time: string;
        Valid: boolean;
    };
    UpdatedAt: {
        Time: string;
        Valid: boolean;
    };
};

const Payments = () => {
    const [payments, setPayments] = useState<PaymentType[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    // Track which rows are in edit mode (keyed by PaymentID)
    const [editingRows, setEditingRows] = useState<{ [key: number]: boolean }>({});
    // Track the edited status for each row
    const [editedStatus, setEditedStatus] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        axios
            .get('https://api.orchid.mn/api/v1/superadmin/payment/list')
            .then(({ data }) => {
                setPayments(data);
            })
            .catch((error) => {
                setError('Failed to fetch payments: ' + error.message);
            });
    }, []);

    const handleEdit = (paymentID: number, currentStatus: string | null) => {
        setEditingRows((prev) => ({ ...prev, [paymentID]: true }));
        // Default to "Pending" if no current status
        setEditedStatus((prev) => ({ ...prev, [paymentID]: currentStatus || 'Pending' }));
    };

    const handleCancel = (paymentID: number) => {
        setEditingRows((prev) => ({ ...prev, [paymentID]: false }));
        setEditedStatus((prev) => {
            const newState = { ...prev };
            delete newState[paymentID];
            return newState;
        });
    };

    const handleSave = async (paymentID: number) => {
        const newStatus = editedStatus[paymentID];
        try {
            // Call the update endpoint with the new paymentStatus.
            const response = await axios.patch(
                `https://api.orchid.mn/api/v1/superadmin/payment/update/${paymentID}`,
                { paymentStatus: newStatus },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log('Payment updated:', response.data);
            // Update the local state with the new status.
            setPayments((prev) => {
                if (!prev) return prev;
                return prev.map((payment) =>
                    payment.PaymentID === paymentID ? { ...payment, PaymentStatus: newStatus } : payment
                );
            });
            setEditingRows((prev) => ({ ...prev, [paymentID]: false }));
        } catch (err) {
            console.error('Failed to update payment:', err);
            alert('Failed to update payment status.');
        }
    };

    if (error) {
        return (
            <>
                <Header />
                <Box sx={{ backgroundColor: '#0d0d0d', color: '#fff', minHeight: '100vh', p: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Payments List
                    </Typography>
                    <Typography color="error" variant="h6">
                        {error}
                    </Typography>
                </Box>
            </>
        );
    }

    if (!payments) {
        return (
            <>
                <Header />
                <Box
                    sx={{
                        backgroundColor: '#0d0d0d',
                        color: '#fff',
                        minHeight: '100vh',
                        p: 4,
                        textAlign: 'center',
                    }}
                >
                    <CircularProgress color="primary" />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Loading payments...
                    </Typography>
                </Box>
            </>
        );
    }

    return (
        <>
            <Header />
            <Box sx={{ backgroundColor: '#0d0d0d', color: '#fff', minHeight: '100vh', p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Payments List
                </Typography>
                <TableContainer component={Paper} sx={{ backgroundColor: '#1a1a1a' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#fff' }}>Payment ID</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Order ID</TableCell>
                                <TableCell sx={{ color: '#fff' }}>User ID</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Payment Method</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Payment Status</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Amount</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        No payments found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                payments.map((payment) => (
                                    <TableRow key={payment.PaymentID}>
                                        <TableCell sx={{ color: '#fff' }}>
                                            {payment.PaymentID || 'N/A'}
                                        </TableCell>
                                        <TableCell sx={{ color: '#fff' }}>
                                            {payment.OrderID || 'N/A'}
                                        </TableCell>
                                        <TableCell sx={{ color: '#fff' }}>
                                            {payment.UserID || 'N/A'}
                                        </TableCell>
                                        <TableCell sx={{ color: '#fff' }}>
                                            {payment.PaymentMethod || 'N/A'}
                                        </TableCell>
                                        <TableCell sx={{ color: '#fff' }}>
                                            {editingRows[payment.PaymentID] ? (
                                                <RadioGroup
                                                    row
                                                    value={editedStatus[payment.PaymentID] || 'Pending'}
                                                    onChange={(e) =>
                                                        setEditedStatus((prev) => ({
                                                            ...prev,
                                                            [payment.PaymentID]: e.target.value,
                                                        }))
                                                    }
                                                >
                                                    <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
                                                    <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
                                                </RadioGroup>
                                            ) : (
                                                payment.PaymentStatus || 'N/A'
                                            )}
                                        </TableCell>
                                        <TableCell sx={{ color: '#fff' }}>
                                            {payment.Amount || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {editingRows[payment.PaymentID] ? (
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleSave(payment.PaymentID)}
                                                        sx={{ mr: 1 }}
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        size="small"
                                                        onClick={() => handleCancel(payment.PaymentID)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() =>
                                                        handleEdit(payment.PaymentID, payment.PaymentStatus)
                                                    }
                                                >
                                                    Edit Status
                                                </Button>
                                            )}
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

export default Payments;
