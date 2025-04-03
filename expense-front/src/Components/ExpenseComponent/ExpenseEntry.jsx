import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { saveExpense, updateExpense, generateExpenseNumber, getExpensesByCustomer } from "../../Services/ExpenseService";
import { displayAllCategories } from "../../Services/CategoryService";

const ExpenseEntry = ({ expenseData, onSave }) => {
  const history = useNavigate();
  const [categories, setCategories] = useState([]);
  
  const [expense, setExpense] = useState({
    expenseNumber: "",
    customerId: "",
    categoryId: "",
    expenseDate: "",
    amount: "",
    description: "",
  });

  
  useEffect(() => {
    if (expenseData) {
        setExpense(expenseData);
    } else {
        generateExpenseNumber()
            .then((response) => {
                setExpense((prev) => ({ ...prev, expenseNumber: response.data }));
            })
            .catch((error) => console.error("Error fetching expense number:", error));

    }
}, [expenseData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = expenseData ? updateExpense : saveExpense;

    action(expense)
      .then(() => {
        Swal.fire("Success", `Expense ${expenseData ? "Updated" : "Saved"} Successfully!`, "success");
        onSave();
      })
      .catch(() => {
        
      });
  };

  useEffect(() => {
    displayAllCategories()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleClear = () => {
    setExpense({
      expenseNumber: expense.expenseNumber,
      customerId: expense.customerId,
      categoryId: "",
      expenseDate: "",
      amount: "",
      description: "",
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4 w-50">
                <h2 className="text-center mb-4 text-primary">Expense Entry</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Expense Number:</label>
            <input type="text" className="form-control" value={expense.expenseNumber} disabled />
          </div>

          
          <div className="mb-3">
  <label className="form-label">Category:</label>
  <select
    className="form-control"
    name="categoryId"
    value={expense.categoryId}
    onChange={handleChange}
    required
  >
    <option value="">Select Category</option>
    {categories.map(category => (
      <option key={category.categoryId} value={category.categoryId}>
        {category.categoryName}
      </option>
    ))}
  </select>
</div>

          <div className="mb-3">
            <label className="form-label">Expense Date:</label>
            <input type="date" className="form-control" name="expenseDate" value={expense.expenseDate} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Amount:</label>
            <input type="number" className="form-control" name="amount" value={expense.amount} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Description:</label>
            <textarea className="form-control" name="description" value={expense.description} onChange={handleChange} required />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">{expenseData ? "Update" : "Save"} Expense</button>
            <button type="button" className="" onClick={handleClear}>Clear Form</button>
            <button type="button" className="btn btn-danger" onClick={() => history(-1)}>Return</button>
          </div>
        </form>
      </div>
      </div>
      
    
  );
};

export default ExpenseEntry;