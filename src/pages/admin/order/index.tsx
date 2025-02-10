import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Header from '@/@core/components/Navbar';

const Order = () => {
  const orders = [
    { id: 1, customer: 'John Doe', status: 'Pending', total: '$45.00', date: '2024-02-01' },
    { id: 2, customer: 'Alice Smith', status: 'Completed', total: '$120.50', date: '2024-01-28' },
    { id: 3, customer: 'Bob Johnson', status: 'Cancelled', total: '$25.00', date: '2024-01-25' },
  ];

  return (
    <Box>
      <Header />
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#00ffba' }}>
          Захиалгын жагсаалт (Order List)
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1a1a1a' }}>
                <TableCell sx={{ color: '#00ffba', fontWeight: 'bold' }}>Захиалга ID</TableCell>
                <TableCell sx={{ color: '#00ffba', fontWeight: 'bold' }}>Хэрэглэгч</TableCell>
                <TableCell sx={{ color: '#00ffba', fontWeight: 'bold' }}>Төлөв</TableCell>
                <TableCell sx={{ color: '#00ffba', fontWeight: 'bold' }}>Нийт</TableCell>
                <TableCell sx={{ color: '#00ffba', fontWeight: 'bold' }}>Огноо</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell 
                    sx={{ 
                      color: order.status === 'Pending' ? 'orange' : 
                            order.status === 'Completed' ? 'green' : 'red',
                      fontWeight: 'bold'
                    }}
                  >
                    {order.status}
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Order;
