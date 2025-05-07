import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { Observable, combineLatest, map, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-employee-salary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.scss']
})
export class EmployeeSalaryComponent implements OnInit {
  Math = Math;
  selectedDepartment: string = '';
  selectedStatus: string = '';
  searchQuery: string = '';
  showModal = false;
  selectedEmployee: any = null;
  isEditMode = false;
  
  // Pagination
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;
  
  // Observables for data
  employees$: Observable<any[]>;
  departments$: Observable<any[]>;
  filteredEmployees$: Observable<any[]>;

  // Filter subjects
  private departmentFilter$ = new BehaviorSubject<string>('');
  private statusFilter$ = new BehaviorSubject<string>('');
  private searchFilter$ = new BehaviorSubject<string>('');

  // Add a BehaviorSubject to manage employees data
  private employeesSubject = new BehaviorSubject<any[]>([]);

  constructor(private dummyDataService: DummyDataService) {
    // Initialize employees data
    this.dummyDataService.getPersonnel().subscribe(employees => {
      this.employeesSubject.next(employees);
    });

    this.employees$ = this.employeesSubject.asObservable();
    this.departments$ = this.dummyDataService.getDepartments();

    // Combine data for the template with filters
    this.filteredEmployees$ = combineLatest([
      this.employees$,
      this.departments$,
      this.departmentFilter$,
      this.statusFilter$,
      this.searchFilter$
    ]).pipe(
      map(([employees, departments, dept, status, search]) => {
        let filteredEmployees = employees;

        // Apply department filter
        if (dept) {
          filteredEmployees = filteredEmployees.filter(emp => emp.department_id === dept);
        }

        // Apply status filter
        if (status) {
          filteredEmployees = filteredEmployees.filter(emp => emp.status === status);
        }

        // Apply search filter
        if (search) {
          const searchLower = search.toLowerCase();
          filteredEmployees = filteredEmployees.filter(emp => 
            emp.first_name.toLowerCase().includes(searchLower) ||
            emp.last_name.toLowerCase().includes(searchLower) ||
            emp.id.toLowerCase().includes(searchLower)
          );
        }

        // Update pagination
        this.totalItems = filteredEmployees.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.currentPage = Math.min(this.currentPage, this.totalPages || 1);

        // Apply pagination
        const startIndex = (this.currentPage - 1) * this.pageSize;
        filteredEmployees = filteredEmployees.slice(startIndex, startIndex + this.pageSize);

        // Map department names
        return filteredEmployees.map(emp => ({
          ...emp,
          department: departments.find(d => d.id === emp.department_id)
        }));
      })
    );
  }

  ngOnInit(): void {
    // Additional initialization if needed
  }

  // Calculate net salary
  calculateNetSalary(basic: number, allowances: number, deductions: number): number {
    return basic + allowances - deductions;
  }

  // Format currency (Philippine Peso)
  formatCurrency(amount: number): string {
    return '₱' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  // Get status badge class based on employment status
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Filter handlers
  onDepartmentChange(department: string): void {
    this.departmentFilter$.next(department);
    this.currentPage = 1;
  }

  onStatusChange(status: string): void {
    this.statusFilter$.next(status);
    this.currentPage = 1;
  }

  onSearchChange(query: string): void {
    this.searchFilter$.next(query);
    this.currentPage = 1;
  }

  // Modal handlers
  openModal(employee: any, editMode: boolean = false): void {
    this.selectedEmployee = editMode ? { ...employee } : {
      id: Math.random().toString(36).substr(2, 9),
      first_name: '',
      last_name: '',
      salary: 0,
      allowances: 0,
      deductions: 0,
      status: 'Active',
      department_id: '',
      designation: ''
    };
    this.isEditMode = editMode;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedEmployee = null;
    this.isEditMode = false;
  }

  saveEmployee(): void {
    const currentEmployees = this.employeesSubject.value;
    
    if (this.isEditMode) {
      // Update existing employee
      const index = currentEmployees.findIndex(emp => emp.id === this.selectedEmployee.id);
      if (index !== -1) {
        currentEmployees[index] = { ...currentEmployees[index], ...this.selectedEmployee };
        this.employeesSubject.next([...currentEmployees]);
      }
    } else {
      // Add new employee
      this.employeesSubject.next([...currentEmployees, this.selectedEmployee]);
    }

    // Show success message
    alert(this.isEditMode ? 'Employee updated successfully!' : 'Employee added successfully!');
    this.closeModal();
  }

  deleteEmployee(employee: any): void {
    if (confirm('Are you sure you want to delete this employee\'s salary record?')) {
      const currentEmployees = this.employeesSubject.value;
      const updatedEmployees = currentEmployees.filter(emp => emp.id !== employee.id);
      this.employeesSubject.next(updatedEmployees);
      
      // Show success message
      alert('Employee deleted successfully!');
    }
  }

  // Pagination handlers
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.departmentFilter$.next(this.departmentFilter$.value);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.departmentFilter$.next(this.departmentFilter$.value);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.departmentFilter$.next(this.departmentFilter$.value);
    }
  }
}