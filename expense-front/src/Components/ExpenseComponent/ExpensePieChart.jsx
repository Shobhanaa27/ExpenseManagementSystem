import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
          {
            label: "Expense Amount by Date Range",
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(121, 19, 152, 0.6)',
                'rgba(251, 181, 4, 0.6)',
                'rgba(2, 50, 3, 0.6)',
                'rgba(12, 231, 247, 0.6)',
                'rgba(34, 4, 95, 0.6)',
            ],
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
          },
        ],
      });
      
  useEffect(() => {
    fetch("http://localhost:9797/exp-mng/expense-total")
      .then((response) => response.json())
      .then((data) => {
        setChartData({
          labels: data.map(([categoryId]) => `Category ${categoryId}`),
          datasets: [
            {
              label: "Total Amount Spent per Category",
              data: data.map(([_, totalAmount]) => totalAmount),
              backgroundColor: [
                "#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800", "#9C27B0",
              ],
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  return (
<div style={{ display: "flex", justifyContent: "flex-start", padding: "20px" }}>
      <div style={{ width: "80%", maxWidth: "400px" }}>

        <h2>Total Amount Spent per Category</h2>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default ExpensePieChart;
