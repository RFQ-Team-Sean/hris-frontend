import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-payroll-audit-logs',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './payroll-audit-logs.component.html',
  styleUrls: ['./payroll-audit-logs.component.scss']
})
export class PayrollAuditLogsComponent {
  // Sample data - in a real app, this would come from an API
  auditLogs = [
    {
      id: 1,
      date: 'May 15, 2024',
      time: '10:45:23 AM',
      action: 'Payslip Generated',
      actionType: 'payslip',
      employee: 'Juan Dela Cruz',
      employeeId: 'EMP-2023-001',
      details: 'May 2024 payslip generated with net pay of ₱46,250.00',
      performedBy: 'Maria Santos',
      role: 'HR Manager',
      ipAddress: '192.168.1.105'
    },
    {
      id: 2,
      date: 'May 14, 2024',
      time: '03:22:17 PM',
      action: 'Salary Updated',
      actionType: 'salary',
      employee: 'Maria Santos',
      employeeId: 'EMP-2023-002',
      details: 'Basic salary updated from ₱48,000.00 to ₱50,000.00',
      performedBy: 'Admin User',
      role: 'System Admin',
      ipAddress: '192.168.1.100'
    },
    {
      id: 3,
      date: 'May 14, 2024',
      time: '09:15:42 AM',
      action: 'Deduction Added',
      actionType: 'deduction',
      employee: 'Pedro Reyes',
      employeeId: 'EMP-2023-003',
      details: 'Added SSS loan deduction of ₱1,200.00',
      performedBy: 'Juan Dela Cruz',
      role: 'Payroll Officer',
      ipAddress: '192.168.1.120'
    },
    {
      id: 4,
      date: 'May 13, 2024',
      time: '11:30:05 AM',
      action: 'Bonus Added',
      actionType: 'bonus',
      employee: 'All Employees',
      employeeId: 'Company-wide',
      details: 'Added performance bonus (5% of basic salary)',
      performedBy: 'System',
      role: 'Automated Process',
      ipAddress: 'System'
    }
  ];

  // Get badge color based on action type
  getBadgeColor(actionType: string): { background: string; text: string } {
    switch(actionType) {
      case 'payslip':
        return { background: '#dbeafe', text: '#1e40af' };
      case 'salary':
        return { background: '#f0fdf4', text: '#166534' };
      case 'deduction':
        return { background: '#fef2f2', text: '#991b1b' };
      case 'bonus':
        return { background: '#ecfccb', text: '#3f6212' };
      default:
        return { background: '#e5e7eb', text: '#1f2937' };
    }
  }

  // In a real app, you would have methods to:
  // - Fetch audit logs from API
  // - Handle filter changes
  // - Export logs to CSV/PDF
  // - View detailed log entries
}