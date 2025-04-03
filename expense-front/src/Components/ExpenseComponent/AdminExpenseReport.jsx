import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { displayAllCustomers } from "../../Services/CustomerService";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminExpenseReport = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [expenseData, setExpenseData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Spent per Category",
        data: [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800", "#9C27B0"],
      },
    ],
  });

  useEffect(() => {
    displayAllCustomers()
      .then((response) => setCustomerList(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const loadExpenseData = () => {
    if (!selectedCustomerId) return;
    fetch(`http://localhost:9797/exp-mng/summary/${selectedCustomerId}`)
      .then((response) => response.json())
      .then((data) => {
        setExpenseData({
          labels: data.map((item) => `Category ${item.categoryId}`),
          datasets: [
            {
              label: "Total Amount Spent",
              data: data.map((item) => item.totalAmount),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800", "#9C27B0"],
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  };

  return (
    <div style={{ width: "600px", margin: "auto", textAlign: "center" }}>
      <h2>Customer Spending Report</h2>
      <select value={selectedCustomerId} onChange={(e) => setSelectedCustomerId(e.target.value)}>
        <option value="">Select Customer</option>
        {customerList.map((customer) => (
          <option key={customer.customerId} value={customer.customerId}>
            {customer.customerName}
          </option>
        ))}
      </select>
      <button onClick={loadExpenseData}>Generate Report</button>
      <div style={{ width: "100%", marginTop: "20px" }}>
        <Bar data={expenseData} />
      </div>
    </div>
  );
};

export default AdminExpenseReport;
