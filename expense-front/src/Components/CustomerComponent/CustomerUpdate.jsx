import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { displayCustomerById, updateCustomer } from "../../Services/CustomerService";;

const CustomerUpdate = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState({
        customerId: "",
        customerName: "",
        mobile: "",
        occupation: "",
        address: "",
        status:""
    });

    const navigate = useNavigate();

    useEffect(() => {
        displayCustomerById(id)
            .then((response) => {
                setCustomer({
                    ...response.data,
                    status: response.data.status === "true" ? "true" : "false"
                });
            })
            .catch((error) => {
                console.error("Error fetching customer details:", error);
            });
    }, [id]);
    
    
    
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setCustomer((prevCustomer) => {
            const updatedCustomer = { ...prevCustomer, [name]: value };
            return updatedCustomer;
        });
    };
    
    
    

    const updateCustomerHandler = (event) => {
        event.preventDefault();
         updateCustomer(customer)
            .then(() => {
                alert("Customer updated successfully!");
                navigate('/admin-customer-list');
            })
            .catch((error) => {
                console.error("Error updating customer:", error.response ? error.response.data : error.message);
            });
    };
    

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4 w-50">
                <h2 className="text-center mb-4 text-primary">Update Customer</h2>
                <form onSubmit={updateCustomerHandler}>
                    <div className="form-group mb-3">
                        <label className="fw-bold">Customer ID:</label>
                        <input type="text" name="customerId" className="form-control" value={customer.customerId} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Customer Name:</label>
                        <input
                            type="text"
                            name="customerName"
                            className="form-control"
                            value={customer.customerName}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mobile:</label>
                        <input type="tel" name="mobile" className="form-control" value={customer.mobile} onChange={onChangeHandler} required />
                    </div>
                    <div className="form-group">
                        <label>Occupation:</label>
                        <input type="text" name="occupation" className="form-control" value={customer.occupation} onChange={onChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label>Location:</label>
                        <input type="text" name="address" className="form-control" value={customer.address} onChange={onChangeHandler} />
                    </div>
                   {/* <div className="form-group">
    <label>Status</label>
    <select 
        name="status" 
        className="form-control" 
        value={customer.status} 
        onChange={onChangeHandler}
    >
        <option value="true">Active</option>
        <option value="false">Inactive</option>
    </select>
</div>*/}


                    <div className="text-center">
                        <button type="submit" className="btn btn-success" style={{ marginRight: "10px" }}>Update</button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/CustomerMenu')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerUpdate;
