import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-salary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.scss']
})
export class EmployeeSalaryComponent implements OnInit {
  employees$: Observable<any[]>;
  departments$: Observable<any[]>;

  constructor(private dummyDataService: DummyDataService) {
    this.employees$ = this.dummyDataService.getPersonnel();
    this.departments$ = this.dummyDataService.getDepartments();
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

  // In a real app, you would have methods to:
  // - Fetch employee salary data from API
  // - Handle filter changes
  // - Edit/delete salary records
  // - Add new salary records
}