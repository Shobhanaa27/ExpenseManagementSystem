import axios from "axios";

const BASE_URL = "http://localhost:9797/exp-mng";

export const getAllExpenses = () => {
    return axios.get(`${BASE_URL}/expenses`);
};

export const generateExpenseNumber = () => {
    return axios.get(`${BASE_URL}/expense-number`);
};

export const getExpensesByCustomer = () => {
    return axios.get(`http://localhost:9797/exp-mng/expense-cust`);
};

export const getExpensesByCustomerId = (id) => {
    return axios.get(`${BASE_URL}/expense-cust/${id}`);
};

export const getExpensesByCategory = (categoryId) => {
    return axios.get(`${BASE_URL}/expense-cat/${categoryId}`);
};

export const saveExpense = (expense) => {
    return axios.post(`${BASE_URL}/add-expense`, expense);
};

export const deleteExpenseById = (id) => {
    return axios.delete(`${BASE_URL}/expense/delete/${id}`);
};

export const updateExpense = (id, expense) => {
    return axios.put(`${BASE_URL}/update-expense/${id}`, expense);
};

export const getExpenseById = (id) => {
    return axios.get(`${BASE_URL}/expense/${id}`);
};


{/*const EXPENSE_URL = `http://localhost:9797/exp-mng/expenses`;  //for fetching all the expense
const EXPENSE_NUMBER_URL = `http://localhost:9797/exp-mng/expense-number`;  //for fetching the expense-number
const EXPENSE_BY_ID = `http://locahost:9797/exp-mng/expense/id`;
const EXPENSE_ADD_EXPENSE = `http://localhost:9797/exp-mng/add-expense`;  //for adding the expenses
const EXPENSE_CUST = `http://localhost:9797/exp-mng/expense-cust`;  //for getting the expense of a customer
const EXPENSE_CUST_ID = `http://localhost:9797/exp-mng/expense-cat/id`;  //for getting the expense in a particular category
const EXPENSE_CAT_ID = `http://localhost:9797/exp-mng/expense-cat/id`;  //for getting the expense by categoryId
const EXPENSE_UPDATE = `http://localhost:9797/exp-mng/update-expense/id`; //for updating the expense
const EXPENSE_DELETE = `http://localhost:9797/exp-mng/delete/id`;*/}