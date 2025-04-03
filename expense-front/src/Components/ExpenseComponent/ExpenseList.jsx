import React, { useState, useEffect } from "react";
import { getExpensesByCustomer, deleteExpenseById } from "../../Services/ExpenseService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomerExpenses = async () => {
            try {
                const response = await getExpensesByCustomer();
                setExpenses(response.data);
            } catch (error) {
                console.error("Error fetching expenses:", error);
                setError("Failed to fetch expenses");
            } finally {
                setLoading(false);
            }
        };
        fetchCustomerExpenses();
    }, []);

    const handleDelete = async (expenseId) => {
        if (!window.confirm("Are you sure you want to delete this expense?")) return;
        try {
            await deleteExpenseById(expenseId);
            setExpenses(expenses.filter(expense => expense.expenseNumber !== expenseId));
        } catch (error) {
            console.error("Error deleting expense:", error);
            alert("Failed to delete expense");
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-danger text-center">{error}</p>;
    if (expenses.length === 0) return <p className="text-center">No expenses found for this customer.</p>;

    return (
        <div >
        <div >
            <div>
                <h2 className="text-center">Your Expense</h2>
                <hr style={{height: "3px", borderWidth: 0, color: "yellow", backgroundColor: "red"}}/>
            <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.expenseNumber}>
                            <td>{expense.description}</td>
                            <td>${expense.amount}</td>
                            <td>{expense.categoryId}</td>
                            <td>{new Date(expense.expenseDate).toLocaleDateString()}</td>
                            <td>
                                <button className="btn btn-primary me-2" onClick={() => navigate(`/update-expense/${expense.expenseNumber}`)}>Update</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(expense.expenseNumber)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            </div>
            </div>
        </div>
    );
};

export default ExpenseList;
