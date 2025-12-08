import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./chart.css";
import { useTheme } from "../../../../../Context/ThemeContext";

const data = [
  {
    month: "Jan",
    loss: 60,
    profit: 100,
  },
  {
    month: "Feb",
    loss: 20,
    profit: 50,
  },
  {
    month: "Mar",
    loss: 70,
    profit: 90,
  },
  {
    month: "April",
    loss: 25,
    profit: 45,
  },
  {
    month: "May",
    loss: 10,
    profit: 30,
  },
  {
    month: "Jun",
    loss: 40,
    profit: 55,
  },
  {
    month: "Jul",
    loss: 25,
    profit: 56,
  },
  {
    month: "Aug",
    loss: 5,
    profit: 56,
  },
  {
    month: "Sep",
    loss: 43,
    profit: 74,
  },
];

const Chart = () => {
  const { mode } = useTheme();

  const formatToolkit = (value) => {
    return `${value}k`;
  };

  const formatYAxisLabel = (value) => {
    return `${value}k`;
  };

  const formatLegendValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="bar_chart">
      <div className="bar_chart_info">
        <h5 className="bar_chart_title">Revenue</h5>
        <div className="chart_info_date">
          <div className="info_data_value">50k</div>
          <div className="info_data_text">
            <FontAwesomeIcon icon={faArrowUpLong} />
            <p>5% than last month</p>
          </div>
        </div>
      </div>
      <div className="bar_chart_wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 10,
              bottom: 5,
            }}
          >
            <XAxis
              padding={{ left: 20, right: 20 }}
              dataKey="month"
              tickSize={0}
              axisLine={false}
              tick={{
                fill: `${mode === "dark" ? "#676767" : "#f3f3f3"}`,
                fontSize: 14,
              }}
            />
            <YAxis
              padding={{ top: 10, bottom: 10 }}
              tickFormatter={formatYAxisLabel}
              axisLine={false}
              tickSize={0}
              tick={{
                fill: `${mode === "dark" ? "#676767" : "#f3f3f3"}`,
              }}
            />
            <Tooltip
              formatter={formatToolkit}
              cursor={{
                stroke: "transparent",
              }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              verticalAlign="top"
              align="right"
              formatter={formatLegendValue}
            />
            <Bar
              dataKey="profit"
              fill="#36B64F"
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey="loss"
              fill="#e3e7fc"
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
