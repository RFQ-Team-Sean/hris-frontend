import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-payslip-viewer',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './payslip-viewer.component.html',
  styleUrls: ['./payslip-viewer.component.scss']
})
export class PayslipViewerComponent {
  // Sample data - in a real app, this would come from an API
  payslips = [
    {
      id: 1,
      month: 'May',
      year: 2024,
      period: 'May 1 - May 31, 2024',
      status: 'Paid',
      basicSalary: 25000,
      grossPay: 28750,
      netPay: 24312.50,
      deductions: 4437.50
    },
    {
      id: 2,
      month: 'April',
      year: 2024,
      period: 'April 1 - April 30, 2024',
      status: 'Paid',
      basicSalary: 25000,
      grossPay: 27500,
      netPay: 23187.50,
      deductions: 4312.50
    },
    {
      id: 3,
      month: 'March',
      year: 2024,
      period: 'March 1 - March 31, 2024',
      status: 'Paid',
      basicSalary: 25000,
      grossPay: 26250,
      netPay: 22062.50,
      deductions: 4187.50
    }
  ];

  selectedYear: number = new Date().getFullYear();
  selectedMonth: string = '';

  // In a real app, you would have methods to:
  // - Fetch payslips from API
  // - Handle filter changes
  // - Download PDF
  // - View detailed payslip
}