import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-salary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.scss']
})
export class EmployeeSalaryComponent {
  // Sample data - in a real app, this would come from an API
  employees = [
    {
      id: 1,
      name: 'Juan Dela Cruz',
      employeeId: 'EMP-2023-001',
      position: 'Senior Developer',
      department: 'IT',
      basicSalary: 45000,
      allowances: 5000,
      deductions: 3750,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Maria Santos',
      employeeId: 'EMP-2023-002',
      position: 'HR Manager',
      department: 'Human Resources',
      basicSalary: 50000,
      allowances: 7500,
      deductions: 4375,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Pedro Reyes',
      employeeId: 'EMP-2023-003',
      position: 'Finance Officer',
      department: 'Finance',
      basicSalary: 40000,
      allowances: 4000,
      deductions: 3300,
      status: 'On Leave'
    }
  ];

  // Calculate net salary
  calculateNetSalary(basic: number, allowances: number, deductions: number): number {
    return basic + allowances - deductions;
  }

  // Format currency (Philippine Peso)
  formatCurrency(amount: number): string {
    return '₱' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  // In a real app, you would have methods to:
  // - Fetch employee salary data from API
  // - Handle filter changes
  // - Edit/delete salary records
  // - Add new salary records
}