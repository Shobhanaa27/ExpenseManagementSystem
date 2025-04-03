import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import ExpensePieChart from "./ExpensePieChart"; // Import Pie Chart

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ExpenseBarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Amount Spent per Category",
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

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = () => {
    if (!startDate || !endDate) return;

    fetch(`http://localhost:9797/exp-mng/expense-total-range?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data) => {
        setChartData({
          labels: data.map(([categoryId]) => `Category ${categoryId}`),
          datasets: [
            {
              label: "Total Amount Spent per Category",
              data: data.map(([_, totalAmount]) => totalAmount),
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(121, 19, 152, 0.6)',
                'rgba(251, 181, 4, 0.6)',
                'rgba(2, 50, 3, 0.6)',
                'rgba(12, 231, 247, 0.6)',
                'rgba(34, 4, 95, 0.6)',
            ],
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", padding: "20px" }}>
  {/* Left Side: Pie Chart */}
  <div style={{ width: "50%", maxWidth: "500px", display: "flex", flexDirection: "column", alignItems: "center" }}>
    
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <ExpensePieChart />
    </div>
  </div>

  {/* Right Side: Bar Chart */}
  <div style={{ width: "50%", maxWidth: "500px", display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h2 style={{ textAlign: "center" }}>Expense Report by Date Range</h2>
    <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={fetchData}>Fetch Data</button>
    </div>
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Bar data={chartData} />
    </div>
  </div>
</div>



  );
};

export default ExpenseBarChart;
