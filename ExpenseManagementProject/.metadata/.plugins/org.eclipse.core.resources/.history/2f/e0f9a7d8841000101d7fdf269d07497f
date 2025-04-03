package com.infosys.expenseManagementApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.infosys.expenseManagementApplication.bean.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, String> {
      @Query("select max(expenseNumber) from Expense")
      public String getMaxExpenseId();
      
      @Query("select a from Expense a where a.categoryId=?1")
  	  public List<Expense> getExpensesByCategory(Long categoryId);
      
      @Query("select a from Expense a where a.customerId=?1")
  	  public List<Expense> getExpensesByCustomer(String customerId);
      
      @Query("SELECT e.categoryId, SUM(e.amount) FROM Expense e WHERE e.customerId = ?1 GROUP BY e.categoryId")
      List<Object[]> getTotalAmountByCategory(String customerId);
      
      @Query("SELECT e.categoryId, SUM(e.amount) FROM Expense e WHERE e.customerId = ?1 AND e.expenseDate BETWEEN ?2 AND ?3 GROUP BY e.categoryId")
      List<Object[]> getTotalAmountByCategoryBetweenDates(String customerId, String startDate, String endDate);

      @Query("SELECT e.categoryId, SUM(e.amount) FROM Expense e WHERE e.customerId = :customerId GROUP BY e.categoryId")
      List<Object[]> findCategoryWiseTotal(@Param("customerId") String customerId);

      @Query("SELECT e.categoryId, SUM(e.amount) FROM Expense e WHERE e.customerId = :customerId AND e.expenseDate BETWEEN :startDate AND :endDate GROUP BY e.categoryId")
      List<Object[]> findCategoryWiseTotalByDateRange(@Param("customerId") String customerId, @Param("startDate") String startDate, @Param("endDate") String endDate);
  }

