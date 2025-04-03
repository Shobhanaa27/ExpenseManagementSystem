import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../../LoginView.css';
import { displayAllCustomers } from "../../Services/CustomerService";
import { Form } from "react-bootstrap";

const AdminCustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");
    
    let navigate = useNavigate();
    
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        displayAllCustomers().then((response) => {
            setCustomers(response.data);
            setFilteredCustomers(response.data);
        });
    };
    
    useEffect(() => {
        let filteredList = customers;
    
        if (statusFilter === "true") {
            filteredList = customers.filter(customer => customer.status === "true");
        } else if (statusFilter === "false") {
            filteredList = customers.filter(customer => customer.status === "false");
        }
    
        setFilteredCustomers(filteredList);
    }, [statusFilter, customers]);
    
    
    const returnBack = () => {
        navigate('/AdminMenu');
    }
    
    return (
        <div className="text-center">
            <div>
                <h2 className="text-center">Customer List</h2>
                <hr style={{height: "3px", borderWidth: 0, color: "yellow", backgroundColor: "red"}}/>
                
                <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="mb-3 w-25 mx-auto">
                <option value="all">All</option>
    <option value="true">Active</option>
    <option value="false">Inactive</option>
                </Form.Select>
                
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Customer ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Customer Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Occupation</th>
                                <th>Status</th>
                                <th>Actions</th>
                                <th>View Expenses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map(customer => (
                                <tr key={customer.customerId}>
                                    <td>{customer.customerId}</td>
                                    <td>{customer.username}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.customerName}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.mobile}</td>
                                    <td>{customer.occupation}</td>
                                    <td>{customer.status}</td>
                                    <td>
                                        <Link to={`/customer-update/${customer.customerId}`}>
                                            <button style={{ marginLeft: "10px" }} className="btn btn-info">
                                                Update
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/CustExpenses/${customer.customerId}`}>
                                            <button style={{ marginLeft: "10px" }} className="btn btn-info">
                                                View
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br/>
                    <button style={{marginLeft: "10px"}} onClick={() => returnBack()} className="btn btn-success">Return</button>
                </div>
            </div>
        </div>
    );
};

export default AdminCustomerList;