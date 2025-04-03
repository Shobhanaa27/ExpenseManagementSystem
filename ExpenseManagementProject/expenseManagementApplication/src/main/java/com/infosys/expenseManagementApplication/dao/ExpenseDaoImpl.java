package com.infosys.expenseManagementApplication.dao;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.infosys.expenseManagementApplication.bean.Expense;
@Service
@Repository
public class ExpenseDaoImpl implements ExpenseDao {

	@Autowired
	private ExpenseRepository repository;
	//EX1000001
	@Override
	public String generateExpenseNumber() {
		Long id = 0L;   
        String val = repository.getMaxExpenseId();
        if (val == null) {
            id = 1000001L;
        } else {
            id = Long.parseLong(val.substring(2));
            id++;
        }
        String newId="EX" + id;
        return newId;
	}

	 @Override
	    public Expense save(Expense expense) {
	        return repository.save(expense);
	    }
	 
     @Override
	    public List<Expense> getAllExpenses() {
	        return repository.findAll();
	    }

	@Override
	public List<Expense> getExpensesByCustomer(String customerId) {
		return repository.getExpensesByCustomer(customerId);
	}
	
	@Override
	public List<Expense> getExpensesByCategory(Long categoryId) {
	    return repository.getExpensesByCategory(categoryId);
	}

	@Override
	public void deleteExpenseById(String id) {
		repository.deleteById(id);
		
	}
    
	@Override
	public Expense getExpenseById(String id) {
		return repository.findById(id).get();
	}
	
	@Override
	public List<Object[]> getTotalAmountByCategory(String customerId) {
	    return repository.getTotalAmountByCategory(customerId);
	}
	@Override
	public List<Object[]> getTotalAmountByCategoryBetweenDates(String customerId, String startDate, String endDate) {
	    return repository.getTotalAmountByCategoryBetweenDates(customerId, startDate, endDate);
	}
	
	@Override
    public List<Object[]> fetchCategoryWiseTotal(String customerId) {
        return repository.findCategoryWiseTotal(customerId);
    }

    @Override
    public List<Object[]> fetchCategoryWiseTotalByDateRange(String customerId, String startDate, String endDate) {
        return repository.findCategoryWiseTotalByDateRange(customerId, startDate, endDate);
    }



}
