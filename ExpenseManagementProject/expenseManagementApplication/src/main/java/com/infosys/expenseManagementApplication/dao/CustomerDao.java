package com.infosys.expenseManagementApplication.dao;

import java.util.List;

import com.infosys.expenseManagementApplication.bean.Customer;
public interface CustomerDao {
	
	public void save(Customer customer);
    public Customer getCustomerById(String id);
    /*public void deleteCustomerById(String id);*/
    public List<Customer> getAllCustomers();
    public String generateCustomerId();
    public List<Customer> getCurrentCustomers();
    public String getCustomerStatusByUsername(String username);
    public Customer getCustomerByUsername(String username);
}
