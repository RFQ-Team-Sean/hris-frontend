import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PayrollService, PayrollRecord, CreatePayrollRecordDto, UpdatePayrollRecordDto } from '../../../../core/services/payroll.service';
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
  payrollRecords$: Observable<PayrollRecord[]>;
  departments$: Observable<any[]>;
  filteredPayrollRecords$: Observable<PayrollRecord[]>;

  // Filter subjects
  private departmentFilter$ = new BehaviorSubject<string>('');
  private statusFilter$ = new BehaviorSubject<string>('');
  private searchFilter$ = new BehaviorSubject<string>('');

  // Add a BehaviorSubject to manage payroll records data
  private payrollRecordsSubject = new BehaviorSubject<PayrollRecord[]>([]);

  constructor(private payrollService: PayrollService) {
    // Initialize payroll records data
    this.payrollService.getAllPayrollRecords().subscribe(records => {
      this.payrollRecordsSubject.next(records);
    });

    this.payrollRecords$ = this.payrollRecordsSubject.asObservable();
    this.departments$ = this.payrollService.getDepartments();

    // Combine data for the template with filters
    this.filteredPayrollRecords$ = combineLatest([
      this.payrollRecords$,
      this.departments$,
      this.departmentFilter$,
      this.statusFilter$,
      this.searchFilter$
    ]).pipe(
      map(([records, departments, dept, status, search]) => {
        let filteredRecords = records;

        // Apply department filter
        if (dept) {
          filteredRecords = filteredRecords.filter(record => record.personnel_id === dept);
        }

        // Apply status filter
        if (status) {
          filteredRecords = filteredRecords.filter(record => record.payment_status === status);
        }

        // Apply search filter
        if (search) {
          const searchLower = search.toLowerCase();
          filteredRecords = filteredRecords.filter(record => 
            record.personnel_id.toLowerCase().includes(searchLower)
          );
        }

        // Update pagination
        this.totalItems = filteredRecords.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.currentPage = Math.min(this.currentPage, this.totalPages || 1);

        // Apply pagination
        const startIndex = (this.currentPage - 1) * this.pageSize;
        filteredRecords = filteredRecords.slice(startIndex, startIndex + this.pageSize);

        return filteredRecords;
      })
    );
  }

  ngOnInit(): void {
    // Additional initialization if needed
  }

  // Calculate net salary
  calculateNetSalary(basic: number, adjustments: number, deductions: number): number {
    return basic + adjustments - deductions;
  }

  // Format currency (Philippine Peso)
  formatCurrency(amount: number): string {
    return '₱' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  // Get status badge class based on payment status
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
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
  openModal(record: PayrollRecord | null, editMode: boolean = false): void {
    this.selectedEmployee = editMode ? { ...record } : {
      personnel_id: '',
      payroll_period_start: new Date(),
      payroll_period_end: new Date(),
      basic_salary: 0,
      salary_adjustments: 0,
      bank_account_number: ''
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
    if (this.isEditMode) {
      // Update existing record
      const updateData: UpdatePayrollRecordDto = {
        basic_salary: this.selectedEmployee.basic_salary,
        salary_adjustments: this.selectedEmployee.salary_adjustments,
        bank_account_number: this.selectedEmployee.bank_account_number,
        payment_status: this.selectedEmployee.payment_status
      };

      this.payrollService.updatePayrollRecord(this.selectedEmployee.id, updateData)
        .subscribe({
          next: (updatedRecord) => {
            const currentRecords = this.payrollRecordsSubject.value;
            const index = currentRecords.findIndex(r => r.id === updatedRecord.id);
            if (index !== -1) {
              currentRecords[index] = updatedRecord;
              this.payrollRecordsSubject.next([...currentRecords]);
            }
            alert('Payroll record updated successfully!');
            this.closeModal();
          },
          error: (error) => {
            console.error('Error updating payroll record:', error);
            alert('Failed to update payroll record');
          }
        });
    } else {
      // Create new record
      const createData: CreatePayrollRecordDto = {
        personnel_id: this.selectedEmployee.personnel_id,
        payroll_period_start: this.selectedEmployee.payroll_period_start,
        payroll_period_end: this.selectedEmployee.payroll_period_end,
        basic_salary: this.selectedEmployee.basic_salary,
        salary_adjustments: this.selectedEmployee.salary_adjustments,
        bank_account_number: this.selectedEmployee.bank_account_number
      };

      this.payrollService.createPayrollRecord(createData)
        .subscribe({
          next: (newRecord) => {
            const currentRecords = this.payrollRecordsSubject.value;
            this.payrollRecordsSubject.next([...currentRecords, newRecord]);
            alert('Payroll record created successfully!');
            this.closeModal();
          },
          error: (error) => {
            console.error('Error creating payroll record:', error);
            alert('Failed to create payroll record');
          }
        });
    }
  }

  deleteEmployee(record: PayrollRecord): void {
    if (confirm('Are you sure you want to delete this payroll record?')) {
      // Note: You'll need to add a delete method to the PayrollService
      const currentRecords = this.payrollRecordsSubject.value;
      const updatedRecords = currentRecords.filter(r => r.id !== record.id);
      this.payrollRecordsSubject.next(updatedRecords);
      alert('Payroll record deleted successfully!');
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