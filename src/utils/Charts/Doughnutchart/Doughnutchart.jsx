"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";

import { Doughnut } from "react-chartjs-2";
import { dailyData } from "../chartData/chartsData";
import { useTheme } from "@/src/Context/ThemeContext";
// import { useTheme } from "@/Context/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const Doughnutchart = () => {
  const { mode, setMode } = useTheme();

  const data = {
    labels: dailyData.map((data) => data.day),
    datasets: [
      {
        label: "Site Visitors",
        data: dailyData.map((data) => data.siteviews),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: mode === "light" ? "#000" : "#fff",
        },
      },
    },
    // scales: {
    //   r: {
    //     ticks: {
    //       color: mode === "light" ? "#000" : "#fff",
    //     },
    //   },
    // },
  };

  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
};

export default Doughnutchart;
