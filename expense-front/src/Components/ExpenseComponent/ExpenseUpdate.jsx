import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExpenseById, updateExpense } from "../../Services/ExpenseService";
import "bootstrap/dist/css/bootstrap.min.css";

const ExpenseUpdate = () => {
    const { id } = useParams();  // Get expense ID from URL
    const navigate = useNavigate();
    const [expense, setExpense] = useState({
        description: "",
        amount: "",
        categoryId: "",
        expenseDate: "",
    });

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await getExpenseById(id);
                setExpense(response.data);
            } catch (error) {
                console.error("Error fetching expense:", error);
            }
        };
        fetchExpense();
    }, [id]);

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateExpense(id, expense);
            alert("Expense updated successfully!");
            navigate("/expenseListCust"); // Redirect to expense list
        } catch (error) {
            console.error("Error updating expense:", error);
            alert("Failed to update expense.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Update Expense</h2>
            <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" name="description" className="form-control" value={expense.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input type="number" name="amount" className="form-control" value={expense.amount} onChange={handleChange} required />
                </div>
               
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" name="expenseDate" className="form-control" value={expense.expenseDate} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Update Expense</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/expenseListCust")}>Cancel</button>
            </form>
        </div>
    );
};

export default ExpenseUpdate;
