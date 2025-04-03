import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterUser from "./Components/LoginComponent/RegisterUser";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import CustomerMenu from "./Components/LoginComponent/CustomerMenu";
import CategoryAddition from "./Components/CategoryComponent/CategoryAddition";
import AdminCategoryList from "./Components/CategoryComponent/AdminCategoryList";
import CategoryUpdate from "./Components/CategoryComponent/CategoryUpdate";
import CustomerCategoryList from "./Components/CategoryComponent/CustomerCategoryList";
import CustomerRegistration from "./Components/CustomerComponent/CustomerRegistration";
import AdminCustomerList from "./Components/CustomerComponent/AdminCustomerList";
import CustomerUpdate from "./Components/CustomerComponent/CustomerUpdate";
import CustomerDetails from "./Components/CustomerComponent/CustomerDetails";
import ExpenseEntry from "./Components/ExpenseComponent/ExpenseEntry";
import ExpenseListCustomer from "./Components/ExpenseComponent/ExpenseList";
import ExpenseUpdate from "./Components/ExpenseComponent/ExpenseUpdate";
import CustomerExpenses from "./Components/ExpenseComponent/CustomerExpenses";
import ExpenseEntryCategory from "./Components/ExpenseComponent/ExpenseEntryCategory";
import AdminExpenseReport from "./Components/ExpenseComponent/AdminExpenseReport";

import ExpenseBarChart from "./Components/ExpenseComponent/ExpenseBarChart";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/RegisterUser" element={<RegisterUser />} />
        <Route path="/AdminMenu" element={<AdminMenu />} />
        <Route path="/CustomerMenu" element={<CustomerMenu />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/category-add" element={<CategoryAddition />} />
        <Route path="/admin-category-list" element={<AdminCategoryList />} />
        <Route path="/update-category/:id" element={<CategoryUpdate />} />
         
         <Route path="/customer-category-list" element={<CustomerCategoryList />} />
         <Route path="/Customer-reg" element={<CustomerRegistration/>}/>
         <Route path="/admin-customer-list" element={<AdminCustomerList />} />
         <Route path="/customer-update/:id" element={<CustomerUpdate/>} />
         <Route path="/customerdetails" element={<CustomerDetails/>} />
         <Route path="/Expense-entry" element={<ExpenseEntry/>}/>
         <Route path="/expenseListCust" element={<ExpenseListCustomer/>}/>
         <Route path="/update-expense/:id" element={<ExpenseUpdate />} />
         <Route path="/CustExpenses/:customerId" element={<CustomerExpenses/>}/>
         <Route path="/Expense-entry-category/:categoryId" element={<ExpenseEntryCategory/>}/>
         <Route path="/Expense-bar-chart" element={<ExpenseBarChart/>}/>
         <Route path="/admin-report" element={<AdminExpenseReport />}/>


      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;

