package com.infosys.expenseManagementApplication.bean;
import jakarta.persistence.*;
@Entity
public class Expense {
    @Id
    private String expenseNumber; //auto generated
    private String customerId;  //auto assigned
    private Long categoryId;  //auto assigned
    private String expenseDate;  //date picker
    private Double amount;
    private String description;
    
	public String getExpenseNumber() {
		return expenseNumber;
	}
	public void setExpenseNumber(String expenseNumber) {
		this.expenseNumber = expenseNumber;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public Long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	public String getExpenseDate() {
		return expenseDate;
	}
	public void setExpenseDate(String expenseDate) {
		this.expenseDate = expenseDate;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	@Override
	public String toString() {
		return "Expense [expenseNumber=" + expenseNumber + ", customerId=" + customerId + ", categoryId=" + categoryId
				+ ", expenseDate=" + expenseDate + ", amount=" + amount + ", description=" + description + "]";
	}
	
	public Expense() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Expense(String expenseNumber, String customerId, Long categoryId, String expenseDate, Double amount,
			String description) {
		super();
		this.expenseNumber = expenseNumber;
		this.customerId = customerId;
		this.categoryId = categoryId;
		this.expenseDate = expenseDate;
		this.amount = amount;
		this.description = description;
	}
    
    
    

}