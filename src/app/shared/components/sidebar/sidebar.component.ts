import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, RouterModule], // ✅ Import RouterModule here
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user: any;
  menuItems: { name: string; path: string; icon: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Get the logged-in user from localStorage
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    // Load menu based on user role
    this.loadMenuItems();
  }

  loadMenuItems() {
    // Define menu structure with explicit type
    const menus: { [key: string]: { name: string; path: string; icon: string }[] } = {
      'Admin': [
        { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { name: 'User Management', path: '/system-admin/user-management', icon: 'group' },
        { name: 'Personnel Management', path: '/personnel-management/personnel-dashboard', icon: 'badge' },
        { name: 'Reports', path: '/reports/report-dashboard', icon: 'bar_chart' },
        { name: 'Payroll', path: '/payroll/payroll-dashboard', icon: 'attach_money' },
        { name: 'Attendance', path: '/attendance/attendance-dashboard', icon: 'schedule' },
        { name: 'Leave Management', path: '/leave/leave-dashboard', icon: 'event' },
        { name: 'Recruitment', path: '/recruitment/recruitment-dashboard', icon: 'work' },
        { name: 'Performance', path: '/performance/kpi-dashboard', icon: 'trending_up' },
        { name: 'System Admin', path: '/admin-settings', icon: 'settings' }
      ],
      'HR': [
        { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { name: 'Personnel Management', path: '/personnel-management/personnel-dashboard', icon: 'badge' },
        { name: 'Leave Management', path: '/leave/leave-dashboard', icon: 'event' },
        { name: 'Reports', path: '/reports/report-dashboard', icon: 'bar_chart' },
        { name: 'Recruitment', path: '/recruitment/recruitment-dashboard', icon: 'work' },
        { name: 'Performance', path: '/performance/kpi-dashboard', icon: 'trending_up' }
      ],
      'Employee': [
        { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { name: 'My Profile', path: '/employee-self-service/my-profile', icon: 'person' },
        { name: 'Self-Service', path: '/employee-self-service/employee-dashboard', icon: 'build' },
        { name: 'Attendance', path: '/attendance/employee-attendance', icon: 'schedule' },
        { name: 'Payslip Viewer', path: '/payroll/payslip-generator', icon: 'attach_money' },
        { name: 'Leave Requests', path: '/leave/apply-leave', icon: 'event' }
      ],
      'Payroll_Manager': [
        { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { name: 'Payroll', path: '/payroll/payroll-dashboard', icon: 'attach_money' },
        { name: 'Payslip Viewer', path: '/payroll/payslip-generator', icon: 'receipt' },
        { name: 'Reports', path: '/reports/report-dashboard', icon: 'bar_chart' }
      ],
      'Recruiter': [
        { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { name: 'Recruitment', path: '/recruitment/recruitment-dashboard', icon: 'work' },
        { name: 'Applicant Tracker', path: '/recruitment/applicant-tracker', icon: 'assignment' },
        { name: 'Job Listings', path: '/recruitment/job-listings', icon: 'list' }
      ],
      'Manager': [
        { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { name: 'Team Overview', path: '/team-overview', icon: 'group' },
        { name: 'Attendance', path: '/attendance/attendance-dashboard', icon: 'schedule' },
        { name: 'Reports', path: '/reports/report-dashboard', icon: 'bar_chart' },
        { name: 'Performance', path: '/performance/kpi-dashboard', icon: 'trending_up' }
      ]
    };

    // Get user role and assign menu
    this.menuItems = menus[this.user?.role] || [];
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
