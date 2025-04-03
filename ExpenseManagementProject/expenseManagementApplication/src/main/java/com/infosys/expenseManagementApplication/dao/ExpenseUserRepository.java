package com.infosys.expenseManagementApplication.dao;

import com.infosys.expenseManagementApplication.bean.*;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseUserRepository extends JpaRepository<ExpenseUser,String> {

}
