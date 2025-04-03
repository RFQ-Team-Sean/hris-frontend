import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-loan-deductions',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './loan-deductions.component.html',
  styleUrls: ['./loan-deductions.component.scss']
})
export class LoanDeductionsComponent {
  // Sample data - in a real app, this would come from an API
  deductions = [
    {
      id: 1,
      employee: 'Juan Dela Cruz',
      employeeId: 'EMP-2023-001',
      type: 'SSS Loan',
      amount: 1200,
      startDate: '2024-05-01',
      endDate: '2024-11-01',
      balance: 7200,
      status: 'Active'
    },
    {
      id: 2,
      employee: 'Maria Santos',
      employeeId: 'EMP-2023-002',
      type: 'Pag-IBIG Contribution',
      amount: 100,
      startDate: '2024-01-01',
      endDate: null,
      balance: null,
      status: 'Active'
    },
    {
      id: 3,
      employee: 'Pedro Reyes',
      employeeId: 'EMP-2023-003',
      type: 'Company Loan',
      amount: 2500,
      startDate: '2024-03-01',
      endDate: '2024-08-01',
      balance: 12500,
      status: 'Pending Approval'
    }
  ];

  // Format currency (Philippine Peso)
  formatCurrency(amount: number): string {
    return amount ? '₱' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '-';
  }

  // Format date
  formatDate(dateString: string | null): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // Get status color
  getStatusColor(status: string): { background: string; text: string } {
    switch(status) {
      case 'Active':
        return { background: '#d1fae5', text: '#065f46' };
      case 'Pending Approval':
        return { background: '#fef3c7', text: '#92400e' };
      case 'Completed':
        return { background: '#e5e7eb', text: '#4b5563' };
      default:
        return { background: '#e5e7eb', text: '#1f2937' };
    }
  }

  // In a real app, you would have methods to:
  // - Fetch deductions from API
  // - Handle filter changes
  // - Approve/reject pending loans
  // - Add/edit deductions
  // - Stop active deductions
}