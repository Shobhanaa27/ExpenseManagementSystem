package com.infosys.expenseManagementApplication.bean;

import jakarta.persistence.*;

@Entity
public class Customer {

    @Id
    private String customerId;
    private String username;
    private String email;
    private String customerName;
    private String address;
    private Long mobile;
    private String occupation;
    private String status;

    // Default constructor
    public Customer() {
        super();
    }

    // Parameterized constructor
    public Customer(String customerId, String username, String email, String customerName, 
                    String address, Long mobile, String occupation, String status) {
        this.customerId = customerId;
        this.username = username;
        this.email = email;
        this.customerName = customerName;
        this.address = address;
        this.mobile = mobile;
        this.occupation = occupation;
        this.status = status;
    }

    // Getters and Setters
    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getMobile() {
        return mobile;
    }

    public void setMobile(Long mobile) {
        this.mobile = mobile;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // toString method
    @Override
    public String toString() {
        return "Customer [customerId=" + customerId + 
               ", username=" + username +
               ", email=" + email +
               ", customerName=" + customerName +
               ", address=" + address +
               ", mobile=" + mobile +
               ", occupation=" + occupation +
               ", status=" + status + "]";
    }
}
