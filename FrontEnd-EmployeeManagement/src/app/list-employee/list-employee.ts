import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee-service';
import { Employee } from '../employee';
import { FormsModule } from '@angular/forms';

type SortKey = 'empName' | 'empDesignation' | 'empSalary';

@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-employee.html',
  styleUrls: ['./list-employee.css']
})
export class ListEmployee implements OnInit {
  employees: Employee[] = [];

  // Search
  searchTerm = '';

  // Sort
  sortKey: SortKey = 'empName';
  sortAsc = true;

  // Pagination
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  totalPages = 1;
  filteredTotal = 0;
  startItem = 0;
  endItem = 0;
  pagedEmployees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void { this.getEmployees(); }

  private getEmployees(): void {
    this.employeeService.getEmployeeList().subscribe(data => {
      this.employees = data ?? [];
      this.computeView();
    });
  }

  // UI handlers
  onSearch(q: string): void { this.searchTerm = (q ?? '').trim().toLowerCase(); this.pageIndex = 0; this.computeView(); }
  clearSearch(): void { this.searchTerm = ''; this.pageIndex = 0; this.computeView(); }

  setSort(key: SortKey): void {
    if (this.sortKey === key) this.sortAsc = !this.sortAsc;
    else { this.sortKey = key; this.sortAsc = true; }
    this.computeView();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = Number(size) || 10;
    this.pageIndex = 0;
    this.computeView();
  }

  nextPage(): void { if (this.pageIndex + 1 < this.totalPages) { this.pageIndex++; this.computeView(); } }
  prevPage(): void { if (this.pageIndex > 0) { this.pageIndex--; this.computeView(); } }

  updateEmployee(empId: number): void { this.router.navigate(['update-employee', empId]); }

  deleteEmployee(empId: number): void {
    if (!confirm('Delete this employee?')) return;
    this.employeeService.deleteEmployee(empId).subscribe({
      next: () => this.getEmployees(),
      error: (err: unknown) => console.error(err)
    });
  }

  trackById = (_: number, e: Employee): number => e?.empId ?? _;

  // Filter -> Sort -> Paginate
  private computeView(): void {
    const filtered = !this.searchTerm
      ? this.employees
      : this.employees.filter(e =>
          (e.empName ?? '').toLowerCase().includes(this.searchTerm) ||
          (e.empDesignation ?? '').toLowerCase().includes(this.searchTerm)
        );

    const sorted = [...filtered].sort((a, b) => {
      const get = (x: Employee) =>
        this.sortKey === 'empSalary'
          ? Number(x.empSalary ?? 0)
          : String((x as any)[this.sortKey] ?? '').toLowerCase();
      const A = get(a), B = get(b);
      if (A < B) return this.sortAsc ? -1 : 1;
      if (A > B) return this.sortAsc ? 1 : -1;
      return 0;
    });

    this.filteredTotal = sorted.length;
    this.totalPages = Math.max(1, Math.ceil(sorted.length / this.pageSize));
    if (this.pageIndex >= this.totalPages) this.pageIndex = 0;

    const start = this.pageIndex * this.pageSize;
    const end = Math.min(start + this.pageSize, sorted.length);

    this.startItem = sorted.length ? start + 1 : 0;
    this.endItem = end;
    this.pagedEmployees = sorted.slice(start, end);
  }
}
