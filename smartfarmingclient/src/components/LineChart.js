import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ channelValues }) {
  return (
    <Line
      data={channelValues}
      options={{
        responsive: true,
      }}
    />
  );
}

export default LineChart;
