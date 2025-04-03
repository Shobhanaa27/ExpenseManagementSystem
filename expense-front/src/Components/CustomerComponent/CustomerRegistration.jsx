import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { saveCustomer, generateCustomerId, getCustomerStatusByUsername} from "../../Services/CustomerService";

const CustomerRegistration = () => {
    const [customer, setCustomer] = useState({
        customerId: "",
        customerName: "",
        email:"",
        username:"",
        mobile: 0,
        address:"",
        occupation:"",
        status:""
        
    });

    const [newId, setNewId] = useState(0);
    let navigate = useNavigate();

    const setCustomerId = () => {
        generateCustomerId().then((response) => {
            setNewId(response.data);
        }).catch(error => console.error(error));
    };

    useEffect(() => {
        setCustomerId();
    }, []);

    const checkStatus=()=>{
        getCustomerStatusByUsername().then(response=>{
            if(response.data===true || response.data===false){
                alert("Customer is already registered...")
                navigate("/CustomerMenu");
            }
            else{
                setCustomerId();
            }
        });

    }
    useEffect(()=>{
        checkStatus();
    },[]);

    const onChangeHandler = (event) => {
        event.persist();
        const name = event.target.name;
        const value = event.target.value;
        setCustomer(values => ({ ...values, [name]: value }));
    };

    const customerSave = (event) => {
        event.preventDefault();
        customer.customerId = newId;
        saveCustomer(customer).then(() => {
            alert("Customer Registered Successfully");
            navigate('/CustomerMenu');
        });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg p-4 w-50">
            <h2 className="text-center mb-4 text-primary">Customer Registration</h2>
                            <form>
                                <div className="form-group">
                                    <label>Customer Id: </label>
                                    <input placeholder="Customer Id" name="customerId" className="form-control" value={newId} readOnly />
                                </div>
                               
                                <div className="form-group">
                                    <label>Customer Name: </label>
                                    <input placeholder="Customer Name" name="customerName" className="form-control"
                                        value={customer.customerName} onChange={onChangeHandler} />
                                </div>
                               
                                <div className="form-group">
                                    <label>Phone Number: </label>
                                    <input placeholder="Phone Number" name="mobile" className="form-control"
                                        value={customer.mobile} onChange={onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Address: </label>
                                    <input placeholder="Enter your Address" name="address" className="form-control"
                                        value={customer.address} onChange={onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Occupation: </label>
                                    <input placeholder="Enter your Occupation" name="occupation" className="form-control"
                                        value={customer.occupation} onChange={onChangeHandler} />
                                </div>
                                {/*<div className="form-group">
                                    <label>Status: </label>
                                    <input placeholder="Enter your Status" name="status" className="form-control"
                                        value={customer.status} onChange={onChangeHandler} />
                                </div>*/}
                                <button className="btn btn-success" onClick={customerSave}>Register</button>
                            </form>
                        </div>
                    </div>
                
    );
};

export default CustomerRegistration;
