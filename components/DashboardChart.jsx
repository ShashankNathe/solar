"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const mockChartData = [
  { name: "Jun", value: 400 },
  { name: "Jul", value: 300 },
  { name: "Aug", value: 600 },
  { name: "Sep", value: 800 },
  { name: "Oct", value: 500 },
  { name: "Nov", value: 750 },
  { name: "Dec", value: 650 },
  { name: "Jan", value: 850 },
  { name: "Feb", value: 700 },
  { name: "Mar", value: 900 },
  { name: "Apr", value: 950 },
  { name: "May", value: 1000 },
];

const DashboardChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={mockChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;
