package com.employee.management.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.employee.management.entities.Employee;

@Repository

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

}
