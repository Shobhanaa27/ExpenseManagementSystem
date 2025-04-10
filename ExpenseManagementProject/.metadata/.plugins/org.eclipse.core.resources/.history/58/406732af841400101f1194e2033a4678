package com.infosys.expenseManagementApplication.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.infosys.expenseManagementApplication.bean.Category;
import com.infosys.expenseManagementApplication.bean.Customer;
import com.infosys.expenseManagementApplication.bean.Expense;
import com.infosys.expenseManagementApplication.dao.CustomerDao;
import com.infosys.expenseManagementApplication.dao.ExpenseDao;
import com.infosys.expenseManagementApplication.service.ExpenseUserService;

@RestController
@RequestMapping("/exp-mng/")
@CrossOrigin(origins = "http://localhost:5656")
public class ExpenseReportController {
	@Autowired
	private CustomerDao customerDao;
	
    @Autowired
    private ExpenseUserService service;
    
	@Autowired
    private ExpenseDao expenseDao;

	@GetMapping("/expense-number")
	public String generateExpenseNumber() {
		return expenseDao.generateExpenseNumber();
	}
	
	@GetMapping("/expenses")
	public List<Expense> getAllExpenses(){
		return expenseDao.getAllExpenses();
	}
	
	@GetMapping("/expense-cust")
    public List<Expense> getExpensesByCustomer(){
		String userId=service.getUserId();
    	System.out.println("UserId:"+userId);
		Customer customer=customerDao.getCustomerByUsername(userId);
		String customerId=customer.getCustomerId();
		System.out.println("Customer:"+customerId);
		return expenseDao.getExpensesByCustomer(customerId);
    }  

	@GetMapping("/expense-cust/{id}")
	public List<Expense> getExpensessByCustomer(@PathVariable String id){
		return expenseDao.getExpensesByCustomer(id);
	}
	
	//above both functions have the same name Method Overloading one have
	//same name with no parameter and another with different name 
	
    @GetMapping("/expense-cat/{id}")
    public List<Expense> getExpensesByCategory(@PathVariable Long categoryId) {
        return expenseDao.getExpensesByCategory(categoryId);
    }
    
    @PostMapping("/add-expense")
    public Expense saveExpense(@RequestBody Expense expense) {
    	String userId=service.getUserId();
    	System.out.println("UserId:"+userId);
		Customer customer=customerDao.getCustomerByUsername(userId);
		String customerId=customer.getCustomerId();
		System.out.println("Customer:"+customerId);
		// Set the customerId in the expense
	    expense.setCustomerId(customerId);
        return expenseDao.save(expense);
    }

    @DeleteMapping("/expense/delete/{id}")
    public void deleteExpenseById(@PathVariable String id) {
    	expenseDao.deleteExpenseById(id);
    }
    
    @PutMapping("/update-expense/{id}")
	public void updateExpense(@RequestBody Expense expense){
		expenseDao.save(expense);
	}
    
    @GetMapping("/expense/{id}")
    public Expense getExpenseById(@PathVariable String id) {
    	return expenseDao.getExpenseById(id);
    }
    
    @GetMapping("/expense-total")
    public List<Object[]> getTotalAmountByCategory() {
        String userId = service.getUserId();
        System.out.println("UserId: " + userId);
        Customer customer = customerDao.getCustomerByUsername(userId);
        String customerId = customer.getCustomerId();
        System.out.println("Customer: " + customerId);

        return expenseDao.getTotalAmountByCategory(customerId);
    }

    @GetMapping("/expense-total-range")
    public List<Object[]> getTotalAmountByCategoryBetweenDates(@RequestParam String startDate, @RequestParam String endDate) {
        String userId = service.getUserId();
        Customer customer = customerDao.getCustomerByUsername(userId);
        String customerId = customer.getCustomerId();
        
        return expenseDao.getTotalAmountByCategoryBetweenDates(customerId, startDate, endDate);
    }

    @GetMapping("/summary/{customerId}")
    public List<Map<String, Object>> getCategoryWiseExpenseSummary(@PathVariable String customerId) {
        List<Object[]> results = expenseDao.fetchCategoryWiseTotal(customerId);
        return results.stream().map(row -> {
            Map<String, Object> data = new HashMap<>();
            data.put("categoryId", row[0]);
            data.put("totalAmount", row[1]);
            return data;
        }).toList();
    }

    @GetMapping("/summary-range")
    public List<Map<String, Object>> getCategoryWiseExpenseSummaryByDateRange(@RequestParam String customerId, @RequestParam String startDate, @RequestParam String endDate) {
        List<Object[]> results = expenseDao.fetchCategoryWiseTotalByDateRange(customerId, startDate, endDate);
        return results.stream().map(row -> {
            Map<String, Object> data = new HashMap<>();
            data.put("categoryId", row[0]);
            data.put("totalAmount", row[1]);
            return data;
        }).toList();
    }
	
	


}
