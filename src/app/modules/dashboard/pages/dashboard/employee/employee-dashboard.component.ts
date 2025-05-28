import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SidebarComponent } from '../../../../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { DummyDataService } from '../../../../../core/services/dummy-data.service';

interface EmployeeStats {
  totalHours: number;
  leaveBalance: number;
  upcomingEvents: number;
  pendingRequests: number;
  performance: number;
  attendanceStreak: number;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [RouterModule, SidebarComponent, CommonModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss'
})
export class EmployeeDashboardComponent implements OnInit {
  employeeStats: EmployeeStats = {
    totalHours: 0,
    leaveBalance: 0,
    upcomingEvents: 0,
    pendingRequests: 0,
    performance: 0,
    attendanceStreak: 0
  };

  recentActivities: RecentActivity[] = [];
  employeeName: string = '';
  employeeRole: string = '';
  employeeEmail: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalActivities = 0;
  totalPages = 1;

  constructor(private dummyDataService: DummyDataService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // Load employee data
    this.dummyDataService.getPersonnel().subscribe(personnel => {
      const employee = personnel[0]; // For demo, using first employee
      this.employeeName = `${employee.first_name} ${employee.last_name}`;
      this.employeeRole = employee.designation;
      this.employeeEmail = employee.email || `${employee.first_name.toLowerCase()}.${employee.last_name.toLowerCase()}@company.com`;
    });

    // Load attendance data
    this.dummyDataService.getAttendanceLogs().subscribe(logs => {
      const employeeLogs = logs.filter(log => log.personnel_id === '1'); // For demo, using first employee
      this.employeeStats.totalHours = employeeLogs.reduce((sum, log) => sum + (log.total_hours || 0), 0);
      
      // Calculate attendance streak
      let streak = 0;
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const hasAttendance = employeeLogs.some(log => 
          log.log_date.toISOString().split('T')[0] === dateStr && 
          (log.status === 'Present' || log.status === 'Late')
        );
        if (hasAttendance) streak++;
        else break;
      }
      this.employeeStats.attendanceStreak = streak;
    });

    // Load leave balance
    this.dummyDataService.getLeaveBalances().subscribe(balances => {
      const employeeBalance = balances.find(b => b.personnel_id === '1'); // For demo, using first employee
      if (employeeBalance) {
        this.employeeStats.leaveBalance = employeeBalance.total_credits - employeeBalance.used_credits;
      }
    });

    // Load leave applications
    this.dummyDataService.getLeaveApplications().subscribe(applications => {
      const employeeApplications = applications.filter(app => app.personnel_id === '1');
      this.employeeStats.pendingRequests = employeeApplications.filter(app => app.status === 'Pending').length;
      
      // Add to recent activities
      this.recentActivities = employeeApplications.map(app => ({
        id: app.id,
        type: 'leave',
        description: `Leave request for ${app.total_days} days`,
        date: app.request_date.toISOString().split('T')[0],
        status: app.status
      }));
    });

    // Load performance reviews
    this.dummyDataService.getPerformanceReviews().subscribe(reviews => {
      const employeeReview = reviews.find(review => review.personnel_id === '1');
      if (employeeReview) {
        this.employeeStats.performance = employeeReview.performance_score;
      }
    });

    // Load upcoming events (meetings, trainings, etc.)
    this.dummyDataService.getTrainingPrograms().subscribe(trainings => {
      const upcomingTrainings = trainings.filter(training => 
        new Date(training.start_date) > new Date()
      );
      this.employeeStats.upcomingEvents = upcomingTrainings.length;
      
      // Add to recent activities
      this.recentActivities = [
        ...this.recentActivities,
        ...upcomingTrainings.map(training => ({
          id: training.id,
          type: 'training',
          description: `Upcoming training: ${training.training_name}`,
          date: training.start_date.toISOString().split('T')[0],
          status: 'upcoming'
        }))
      ];
    });

    // Sort activities by date
    this.recentActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.totalActivities = this.recentActivities.length;
    this.totalPages = Math.ceil(this.totalActivities / this.itemsPerPage);
  }

  onQuickAction(action: string): void {
    switch(action) {
      case 'time_entry':
        // TODO: Navigate to time entry page
        console.log('Navigate to time entry');
        break;
      case 'leave_request':
        // TODO: Navigate to leave request page
        console.log('Navigate to leave request');
        break;
      case 'view_payslip':
        // TODO: Navigate to payslip page
        console.log('Navigate to payslip');
        break;
      case 'update_profile':
        // TODO: Navigate to profile update page
        console.log('Navigate to profile update');
        break;
    }
  }

  getStatusClass(status: string): string {
    switch(status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // TODO: Implement pagination logic
    }
  }
}
