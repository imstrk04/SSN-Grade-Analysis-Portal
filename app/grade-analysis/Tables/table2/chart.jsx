import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import the Chart.js library
import 'chartjs-adapter-date-fns'; // Import the date-fns adapter for Chart.js

// Import the Chart.js scale service for the "category" scale
import { CategoryScale } from 'chart.js';

// Register the "category" scale service globally
Chart.register(CategoryScale);

const Bar = () => {
  const chartData = {
    labels: [
      "9.0 GPA",
      "8.5 GPA",
      "8.0 GPA",
      "7.5 GPA",
      "7.0 GPA",
      "6.5 GPA",
      "6.0 GPA",
      "5.5 GPA",
      "5.0 GPA",
    ],
    datasets: [
      {
        label: "No. of Candidates",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        data: [8, 37, 51, 28, 5, 7, 8, 4, 3],
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "category", // Specify the type of scale for the x-axis
      },
    },
  };

  return (
    <Bar data={chartData} options={chartOptions} /> 
  );
};

export default Bar;
