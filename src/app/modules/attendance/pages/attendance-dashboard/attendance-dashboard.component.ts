import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-attendance-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './attendance-dashboard.component.html',
  styleUrls: ['./attendance-dashboard.component.scss']
})
export class AttendanceDashboardComponent {
  currentDate: string = new Date().toISOString().split('T')[0];
  
  // Sample data - in a real app, this would come from an API
  attendanceRecords = [
    {
      id: 1,
      name: 'Juan Dela Cruz',
      employeeId: 'EMP-2023-001',
      department: 'IT',
      timeIn: '08:15 AM',
      timeOut: '05:30 PM',
      hoursWorked: '8h 45m',
      status: 'Present'
    },
    {
      id: 2,
      name: 'Maria Santos',
      employeeId: 'EMP-2023-002',
      department: 'HR',
      timeIn: '09:30 AM',
      timeOut: '06:15 PM',
      hoursWorked: '7h 45m',
      status: 'Late'
    },
    {
      id: 3,
      name: 'Pedro Reyes',
      employeeId: 'EMP-2023-003',
      department: 'Finance',
      timeIn: '--:-- --',
      timeOut: '--:-- --',
      hoursWorked: '0h 0m',
      status: 'Absent'
    },
    {
      id: 4,
      name: 'Anna Lopez',
      employeeId: 'EMP-2023-004',
      department: 'Operations',
      timeIn: '--:-- --',
      timeOut: '--:-- --',
      hoursWorked: '0h 0m',
      status: 'On Leave'
    }
  ];

  // Get status color
  getStatusColor(status: string): { background: string; text: string } {
    switch(status) {
      case 'Present':
        return { background: '#d1fae5', text: '#065f46' };
      case 'Late':
        return { background: '#fef3c7', text: '#92400e' };
      case 'Absent':
        return { background: '#fee2e2', text: '#991b1b' };
      case 'On Leave':
        return { background: '#e0e7ff', text: '#4338ca' };
      default:
        return { background: '#e5e7eb', text: '#1f2937' };
    }
  }

  // In a real app, you would have methods to:
  // - Fetch attendance data from API
  // - Handle filter changes
  // - Export data to CSV/PDF
  // - View detailed attendance records
}