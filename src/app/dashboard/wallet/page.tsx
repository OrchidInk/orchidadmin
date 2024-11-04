'use client';

import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import NavbarLayout from "@/@core/components/navbar/navbarLayout";

// Dynamically import the chart
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DashboardPage = () => {
  // Loss and Income Data
  const lossIncomeOptions: ApexOptions = {
    chart: {
      id: 'loss-income',
      toolbar: { show: false },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      title: {
        text: 'Months',
        style: { color: '#e2e8f0' },
      },
    },
    yaxis: {
      title: {
        text: 'Amount ($)',
        style: { color: '#e2e8f0' },
      },
      labels: { style: { colors: '#e2e8f0' } },
    },
    colors: ['#1abc9c', '#e74c3c'],
    tooltip: {
      theme: 'dark',
    },
    legend: {
      labels: { colors: '#e2e8f0' },
    },
  };

  const lossIncomeData = [
    { name: 'Income', data: [5000, 6000, 7000, 8000, 9000, 10000, 11000] },
    { name: 'Loss', data: [2000, 2500, 3000, 4000, 4500, 4800, 5000] },
  ];

  // Product Sales Data
  const salesOptions: ApexOptions = {
    chart: {
      id: 'product-sales',
      toolbar: { show: false },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      title: {
        text: 'Months',
        style: { color: '#e2e8f0' },
      },
    },
    yaxis: {
      title: {
        text: 'Products Sold',
        style: { color: '#e2e8f0' },
      },
      labels: { style: { colors: '#e2e8f0' } },
    },
    colors: ['#3498db'],
    tooltip: {
      theme: 'dark',
    },
    legend: {
      labels: { colors: '#e2e8f0' },
    },
  };

  const salesData = [
    { name: 'Products Sold', data: [120, 150, 170, 200, 220, 250, 270] },
  ];

  return (
    <NavbarLayout>
      <Box px={4} py={6} bg="gray.900" color="white" minH="100vh">
        <VStack spacing={6}>
          {/* Loss vs. Income Chart */}
          <Box w="full" bg="gray.800" p={6} borderRadius="md" boxShadow="lg">
            <Heading as="h3" size="lg" mb={4} color="white">
              Loss vs. Income Overview
            </Heading>
            <Chart
              options={lossIncomeOptions}
              series={lossIncomeData}
              type="line"
              height={300}
            />
          </Box>

          {/* Product Sales Chart */}
          <Box w="full" bg="gray.800" p={6} borderRadius="md" boxShadow="lg">
            <Heading as="h3" size="lg" mb={4} color="white">
              Product Sales Overview
            </Heading>
            <Chart
              options={salesOptions}
              series={salesData}
              type="bar"
              height={300}
            />
          </Box>
        </VStack>
      </Box>
    </NavbarLayout>
  );
};

export default DashboardPage;
