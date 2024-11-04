import { ApexOptions } from 'apexcharts';

const lineChartOptions: ApexOptions = {
  chart: {
    id: 'basic-bar',
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
  colors: ['#1abc9c'],
};

// Line Chart Data
const lineChartData = [
  {
    name: 'Sales',
    data: [30, 40, 35, 50, 49, 60, 70],
  },
];

// Bubble Chart Options
const bubbleChartOptions: ApexOptions = {
  chart: {
    type: 'bubble',
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: ['Facebook', 'Twitter', 'Dribbble'],
  },
};

// Bubble Chart Data
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
