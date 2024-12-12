"use client";

import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
// import { useTheme } from "@/Context/ThemeContext";
import { color } from "framer-motion";
import { useTheme } from "@/src/Context/ThemeContext";


ChartJS.register(CategoryScale, LinearScale, BarElement);

const GroupedStackedBarChart = () => {
  const { mode } = useTheme();

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderRadius: 10, // Rounded corners
        stack: 'Stack 0',
      },
      {
        label: 'Dataset 2',
        data: [35, 49, 60, 71, 46, 25, 30],
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderRadius: 10, // Rounded corners
        stack: 'Stack 0',
      },
      {
        label: 'Dataset 3',
        data: [25, 39, 40, 51, 36, 35, 20],
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderRadius: 10, // Rounded corners
        stack: 'Stack 1',
      },
      {
        label: 'Dataset 4',
        data: [15, 29, 20, 41, 26, 25, 10],
        backgroundColor: 'rgba(153, 102, 255, 1)',
        borderRadius: 10, // Rounded corners
        stack: 'Stack 1',
      },
    ],
  };

  // 'rgba(255, 99, 132, 1)',
  // 'rgba(54, 162, 235, 1)',
  // 'rgba(255, 206, 86, 1)',
  // 'rgba(75, 192, 192, 1)',
  // 'rgba(153, 102, 255, 1)',
  // 'rgba(255, 159, 64, 1)',

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: true, // Disable tooltip
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false, // Hide grid lines
        },
        ticks: {
          display: false, // Hide ticks
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false, // Hide grid lines
          
        },
        ticks: {
          display: false, // Hide ticks
        },
      },
    },
  };

  return (
    <Bar data={data} options={options} />
  );
};

export default GroupedStackedBarChart;
