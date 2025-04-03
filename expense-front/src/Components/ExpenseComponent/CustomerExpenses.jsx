import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExpensesByCustomerId } from "../../Services/ExpenseService";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomerExpenses = () => {
    const { customerId } = useParams();
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await getExpensesByCustomerId(customerId);
                setExpenses(response.data);
            } catch (error) {
                console.error("Error fetching expenses:", error);
                setError("Failed to fetch expenses");
            } finally {
                setLoading(false);
            }
        };
        fetchExpenses();
    }, [customerId]);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-danger text-center">{error}</p>;
    if (expenses.length === 0) return <p className="text-center">No expenses found for this customer.</p>;

    return (
        <div>
            <h2 className="text-center">Expenses for Customer {customerId}</h2>
            <hr style={{height: "3px", borderWidth: 0, color: "yellow", backgroundColor: "red"}}/>
            <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>Expense ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense.expenseNumber}>
                            <td>{expense.expenseNumber}</td>
                            <td>{expense.description}</td>
                            <td>${expense.amount}</td>
                            <td>{expense.categoryId}</td>
                            <td>{new Date(expense.expenseDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
        </div>
    );
};

export default CustomerExpenses;
