import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { saveExpense, updateExpense, generateExpenseNumber } from "../../Services/ExpenseService";
import { displayAllCategories } from "../../Services/CategoryService";

const ExpenseEntry = ({ expenseData, onSave }) => {
  const history = useNavigate();
  const [categories, setCategories] = useState([]);

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState(""); 

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

  useEffect(() => {
    displayAllCategories()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!expense.categoryId) newErrors.categoryId = "Category is required.";
    if (!expense.expenseDate) newErrors.expenseDate = "Expense date is required.";
    if (!expense.amount || isNaN(expense.amount) || parseFloat(expense.amount) <= 0) {
      newErrors.amount = "Enter a valid amount greater than 0.";
    }
    if (!expense.description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;


    if (!expense.categoryId || !expense.expenseDate || !expense.amount || !expense.description) {
      setMessage("All fields are required.");
      return;
    }
    
    if (expense.amount <= 0) {
      setMessage("Amount should be greater than 0.");
      return;
    }

    const action = expenseData ? updateExpense : saveExpense;

    action(expense)
      .then(() => {
        Swal.fire("Success", `Expense ${expenseData ? "Updated" : "Saved"} Successfully!`, "success");
        onSave();
      })
      .catch(() => {
        
      });
  };

  const handleClear = () => {
    setExpense({
      expenseNumber: expense.expenseNumber,
      customerId: expense.customerId,
      categoryId: "",
      expenseDate: "",
      amount: "",
      description: "",
    });
    setErrors({});
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center mb-4 text-primary">Expense Entry</h2>

        <form onSubmit={handleSubmit} noValidate>

            
        {message && <div className="alert alert-danger text-center">{message}</div>}

       

          <div className="mb-3">
            <label className="form-label">Expense Number:</label>
            <input type="text" className="form-control" value={expense.expenseNumber} disabled />
          </div>

          <div className="mb-3">
            <label className="form-label">Category:</label>
            <select
              className={`form-control ${errors.categoryId ? "is-invalid" : ""}`}
              name="categoryId"
              value={expense.categoryId}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Expense Date:</label>
            <input
              type="date"
              className={`form-control ${errors.expenseDate ? "is-invalid" : ""}`}
              name="expenseDate"
              value={expense.expenseDate}
              onChange={handleChange}
            />
            {errors.expenseDate && <div className="invalid-feedback">{errors.expenseDate}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Amount:</label>
            <input
              type="number"
              className={`form-control ${errors.amount ? "is-invalid" : ""}`}
              name="amount"
              value={expense.amount}
              onChange={handleChange}
            />
            {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Description:</label>
            <textarea
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              name="description"
              value={expense.description}
              onChange={handleChange}
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              {expenseData ? "Update" : "Save"} Expense
            </button>
            <button type="button" className="btn btn-warning" onClick={handleClear}>Clear Form</button>
            <button type="button" className="btn btn-danger" onClick={() => history(-1)}>Return</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseEntry;
