import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-employee.html',
  styleUrls: ['./create-employee.css']
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  constructor(private employeeService: EmployeeService, private route: Router) { }
  ngOnInit(): void {
  }
  onSubmit() {
    this.insertEmployee();
    console.log(this.employee)
  }
  insertEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe(data => {
        this.goToEmployeeList();
        console.log(data);
      })
  }
  goToEmployeeList() {
    this.route.navigate(['employees']);
  }

}