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
        { name: 'User Management', path: '/admin', icon: 'group' },
        { name: 'Personnel Management', path: '/personnel', icon: 'badge' },
        { name: 'Reports', path: '/reports', icon: 'bar_chart' },
        { name: 'Payroll', path: '/payroll', icon: 'attach_money' },
        { name: 'Attendance', path: '/attendance', icon: 'schedule' },
        { name: 'Leave Management', path: '/leave', icon: 'event' },
        { name: 'Recruitment', path: '/recruitment', icon: 'work' },
        { name: 'Performance', path: '/performance', icon: 'trending_up' },
        { name: 'System Admin', path: '/admin-settings', icon: 'settings' }
      ],
      'HR': [
        { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { name: 'Personnel Management', path: '/personnel', icon: 'badge' },
        { name: 'Leave Management', path: '/leave', icon: 'event' },
        { name: 'Reports', path: '/reports', icon: 'bar_chart' },
        { name: 'Recruitment', path: '/recruitment', icon: 'work' },
        { name: 'Performance', path: '/performance', icon: 'trending_up' }
      ],
      'Employee': [
        { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { name: 'My Profile', path: '/self-service/profile', icon: 'person' },
        { name: 'Self-Service', path: '/self-service', icon: 'build' },
        { name: 'Attendance', path: '/attendance', icon: 'schedule' },
        { name: 'Payslip Viewer', path: '/payslip', icon: 'attach_money' },
        { name: 'Leave Requests', path: '/leave/apply', icon: 'event' }
      ],
      'Payroll_Manager': [
        { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { name: 'Payroll', path: '/payroll', icon: 'attach_money' },
        { name: 'Payslip Viewer', path: '/payslip', icon: 'receipt' },
        { name: 'Reports', path: '/reports', icon: 'bar_chart' }
      ],
      'Recruiter': [
        { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { name: 'Recruitment', path: '/recruitment', icon: 'work' },
        { name: 'Applicant Tracker', path: '/recruitment/tracker', icon: 'assignment' },
        { name: 'Job Listings', path: '/recruitment/listings', icon: 'list' }
      ],
      'Manager': [
        { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { name: 'Team Overview', path: '/team-overview', icon: 'group' },
        { name: 'Attendance', path: '/attendance', icon: 'schedule' },
        { name: 'Reports', path: '/reports', icon: 'bar_chart' },
        { name: 'Performance', path: '/performance', icon: 'trending_up' }
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
