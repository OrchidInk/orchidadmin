'use client';


import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Heading,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import NavbarLayout from "@/@core/components/navbar/navbarLayout";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const HomePage = () => {
  const miniChartOptions: ApexOptions = {
    chart: {
      sparkline: { enabled: true },
      background: '#1a202c', 
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#1abc9c'],
    tooltip: {
      theme: 'dark', 
    },
  };

  const miniChartDataSessions = [{ data: [20, 30, 25, 40, 35, 50, 30] }];
  const miniChartDataBounce = [{ data: [50, 35, 45, 30, 60, 40, 35] }];
  const miniChartDataGoals = [{ data: [10, 20, 30, 20, 25, 35, 40] }];

  const audienceChartOptions: ApexOptions = {
    chart: {
      id: 'audience-overview',
      toolbar: { show: false },
      background: '#1a202c',
    },
    xaxis: {
      categories: ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
      labels: { style: { colors: '#e2e8f0' } },
    },
    yaxis: {
      labels: { style: { colors: '#e2e8f0' } }, 
    },
    stroke: { curve: 'smooth' },
    grid: {
      borderColor: '#4a5568',
    },
    colors: ['#1abc9c', '#ff7f0e'],
    tooltip: {
      theme: 'dark',
    },
    legend: {
      labels: { colors: '#e2e8f0' },
    },
  };

  const audienceChartData = [
    { name: 'Rate', data: [400, 430, 448, 470, 540, 580, 690] },
    { name: 'Value', data: [20, 24, 30, 35, 40, 45, 50] },
  ];

  const bubbleChartOptions: ApexOptions = {
    chart: {
      type: 'bubble',
      toolbar: { show: false },
      background: '#1a202c',
    },
    xaxis: {
      labels: { style: { colors: '#e2e8f0' } },
    },
    yaxis: {
      labels: { style: { colors: '#e2e8f0' } },
    },
    grid: {
      borderColor: '#4a5568',
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const bubbleChartData = [
    {
      name: 'Social Media Traffic',
      data: [
        { x: 'Facebook', y: 20, z: 15 },
        { x: 'Twitter', y: 30, z: 25 },
        { x: 'Dribbble', y: 40, z: 30 },
      ],
    },
  ];

  const pieChartOptions: ApexOptions = {
    chart: {
      type: 'pie',
      toolbar: { show: false },
      background: '#1a202c',
    },
    labels: ['Desktop', 'Mobile', 'Tablet'],
    colors: ['#1abc9c', '#3498db', '#9b59b6'],
    tooltip: {
      theme: 'dark',
    },
    legend: {
      labels: { colors: '#e2e8f0' },
    },
  };

  const pieChartData = [1080, 3200, 8180];

  return (
    <NavbarLayout>
      <Box px={4} py={6} bg="gray.900" color="white" minH="100vh">
        {/* Welcome Section */}
        <Heading as="h2" size="xl" mb={4}>
          Тавтай морил, Tuya!
        </Heading>

        {/* Statistics Section with Mini Charts */}
        <SimpleGrid columns={[1, 2, 3]} spacing={6} mb={6}>
          <StatCard
            title="Нийт хэрэглэгчид"
            value="22,500"
            helpText="Analytics for last week"
            chartOptions={miniChartOptions}
            chartData={miniChartDataSessions}
          />
          <StatCard
            title="Ашиг"
            value="10K"
            helpText="Analytics for last week"
            chartOptions={miniChartOptions}
            chartData={miniChartDataBounce}
          />
          <StatCard
            title="Нийт орлого"
            value="$1,22,500"
            helpText="Analytics for last week"
            chartOptions={miniChartOptions}
            chartData={miniChartDataGoals}
          />
        </SimpleGrid>

        {/* Audience Overview Section */}
        <Box mb={6}>
          <Heading as="h3" size="lg" mb={4}>
            Audience Overview
          </Heading>
          <Box bg="gray.800" p={6} borderRadius="md" boxShadow="lg">
            <Chart options={audienceChartOptions} series={audienceChartData} type="bar" height={300} />
          </Box>
        </Box>

        {/* Sessions by Device and Social Media Traffic */}
        <SimpleGrid columns={[1, 2]} spacing={6}>
          <Box bg="gray.800" p={6} borderRadius="md" boxShadow="lg">
            <Heading as="h3" size="md" mb={4}>
              Sessions by Device
            </Heading>
            <Chart options={pieChartOptions} series={pieChartData} type="pie" height={300} />
          </Box>
          <Box bg="gray.800" p={6} borderRadius="md" boxShadow="lg">
            <Heading as="h3" size="md" mb={4}>
              Social Media Traffic
            </Heading>
            <Chart options={bubbleChartOptions} series={bubbleChartData} type="bubble" height={300} />
          </Box>
        </SimpleGrid>
      </Box>
    </NavbarLayout>
  );
};

// StatCard Component with types and a mini chart inside each card
interface StatCardProps {
  title: string;
  value: string;
  helpText: string;
  chartOptions: ApexOptions;
  chartData: any[];
}

const StatCard = ({ title, value, helpText, chartOptions, chartData }: StatCardProps) => (
  <Stat p={4} bg="gray.800" color="white" shadow="md" borderRadius="md" border="1px solid" borderColor="gray.700">
    <StatLabel>{title}</StatLabel>
    <StatNumber>{value}</StatNumber>
    <Box mt={4}>
      <Chart options={chartOptions} series={chartData} type="area" height={60} />
    </Box>
  </Stat>
);

export default HomePage;
