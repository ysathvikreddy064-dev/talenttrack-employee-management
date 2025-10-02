import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee-service';

import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-employee.html',
  styleUrls: ['./update-employee.css']
})
export class UpdateEmployee implements OnInit {
  empId: number = 0;
  employee: Employee = new Employee();
  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.empId = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.empId).subscribe(data => {
      this.employee = data;
    })
  }
  onSubmit() {
    this.employeeService.updateEmployee(this.empId, this.employee).
      subscribe(data => {
        this.employee = data;
        this.goToEmployeeList();
      })
  }
  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}