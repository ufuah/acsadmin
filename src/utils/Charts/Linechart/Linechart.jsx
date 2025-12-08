"use client";

import React from "react";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
} from "chart.js/auto";

import { Line } from "react-chartjs-2";
import { monthlyData } from "../chartData/chartsData";
import { useTheme } from "@/src/Context/ThemeContext";
// import { useTheme } from "@/Context/ThemeContext";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

const Linechart = () => {
  const { mode, setMode } = useTheme();

  const data = {
    labels: monthlyData.map((data) => data.month),
    datasets: [
      {
        label: "Monthly Visitors",
        data: monthlyData.map((data) => data.siteviews),
        backgroundColor: "#fff",
        borderColor: "#36B64F",
        pointBorderColor: "#36B64F",
        tension: 0.4,
      },
    ],
  };

  const options = {
    Plugins: {
    //   legend: false,
      legend: {
        labels: {
          color: mode === "light" ? "#000" : "#fff",
        },
      },
    },
    scales: {
      x: {
        ticks: {
            stepsSize: 6,
            // callback: (value) => value + "k",
            color: mode === "light" ? "#000" : "#fff",
          },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          stepsSize: 6,
          callback: (value) => value + "k",
          color: mode === "light" ? "#000" : "#fff",
        },
        grid: {
        //   borderDash: [60],
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
        //   color: mode === "light" ? "#000" : "#fff",
        },
      },

      // responsive: true,
      // maintainAspectRatio: false,
    },
  };

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default Linechart;
