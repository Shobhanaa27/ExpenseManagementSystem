import React, { useEffect, useState } from "react";
import { getCustomerByUsername } from "../../Services/CustomerService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerDetails.css"; // Import the updated CSS file

const CustomerDetails = () => {
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        getCustomerByUsername()
            .then((response) => {
                setCustomer(response.data);
            })
            .catch((error) => console.error("Error fetching customer details:", error));
    }, []);

    return (
        <div >
          
          <div className="text-center mt-3 mb-3">
    <h5 className="fw-bold display-6">Customer Profile</h5>
    <hr className="w-50 mx-auto" />
                 <div className="row justify-content-center">
                {customer ? (
                   <div className="container d-flex justify-content-center align-items-center vh-100">
                   <div className="card customer-card">
                       <div className="customer-header">
                           {customer.customerName}
                       </div>
                       <div className="customer-details">
                           <p><strong>ID:</strong> {customer.customerId}</p>
                           <p><strong>Email:</strong> {customer.email}</p>
                           <p><strong>Username:</strong> {customer.username}</p>
                           <p><strong>Mobile:</strong> {customer.mobile}</p>
                           <p><strong>Address:</strong> {customer.address}</p>
                           <p><strong>Occupation:</strong> {customer.occupation}</p>
                           <p><strong>Status:</strong> {customer.status}</p>
                       </div>
                   </div>
               </div>
               
                ) : (
                    <div className="col-12 text-center">
                        <p className="text-muted">No customer details available.</p>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
};

export default CustomerDetails;
