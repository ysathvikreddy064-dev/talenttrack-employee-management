package com.employee.management.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.employee.management.entities.Employee;
import com.employee.management.repositories.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    @GetMapping("/employees/{empId}")
    public ResponseEntity<Employee> getAllEmployeeById(@PathVariable int empId) {
        Employee employee = employeeRepository.findById(empId)
                .orElseThrow(() -> new EntityNotFoundException("Employee does not exist"));
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/employees/{empId}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable int empId, @RequestBody Employee updatedEmployeeData) {

        // Step 1: Find the existing employee by ID
        Employee existingEmployee = employeeRepository.findById(empId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with ID: " + empId));

        // Step 2: Update the fields
        existingEmployee.setEmpName(updatedEmployeeData.getEmpName());
        existingEmployee.setEmpDesignation(updatedEmployeeData.getEmpDesignation());
        existingEmployee.setEmpSalary(updatedEmployeeData.getEmpSalary());

        // Step 3: Save the updated employee
        Employee savedEmployee = employeeRepository.save(existingEmployee);

        // Step 4: Return the updated employee with HTTP 200 OK
        return ResponseEntity.ok(savedEmployee);
    }
    
    @DeleteMapping("/employees/{empId}")
    public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable int empId){
        Employee existingEmployee = employeeRepository.findById(empId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with ID: " + empId));
        employeeRepository.delete(existingEmployee);
        Map<String,Boolean> response = new HashMap<String, Boolean>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
