import React from "react";
import { Doughnut} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,

} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement
);

function Userchart() {
  const data = {
    labels: ["Social", "Referral", "Direct"],
    datasets: [
      {
        label: "# of Votes",
        data: [15, 55, 30],
        backgroundColor: ["#1cc98a", "#4e73de", "#36b9cd"],
        borderColor: ["#1cc98a", "#4e73de", "#36b9cd"],
        borderWidth: 1,
        radius: 100,
        outerRadius: 150,
      },
    ],
  };

  return <Doughnut data={data} width={300} height={300} />;
}
export function Areachart() {
  const options = {
    responsive: true,
    plugins: {},
  };

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Nov",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Earnings",
        data: [
          0, 10000, 5000, 20000, 15000, 30000, 25000, 40000, 35000, 50000,
          45000, 60000,
        ],
        borderColor: "#45494d",
        backgroundColor: "#f7f8fd",
        pointBackgroundColor: "#212529",
        tension: 0.3,
      },
      {
        label: "Earnings",
        data: [
          0, 15000, 2500, 2000, 1000, 35000, 55000, 40000, 5000, 10000, 4000,
          4000,
        ],
        borderColor: "#7b8187",
        backgroundColor: "#f7f8fd",
        pointBackgroundColor: "#212529",
        tension: 0.3,
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default Userchart;
